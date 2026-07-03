// 一键发布 content 目录变更到 git，并触发 Vercel 自动部署。
//
// 用法：
//   pnpm publish:post                 自动生成提交信息（识别新增/修改/删除）
//   pnpm publish:post "我的提交信息"   使用自定义提交信息
//   pnpm publish:post --dry-run       仅预览，不真正提交
//   pnpm publish:post --no-push       只提交不推送
//
// 仅提交 content/ 目录下的变更，提交信息默认带 [skip ci] 之外的触发部署标记。

import { execSync } from 'node:child_process'

const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const noPush = args.includes('--no-push')
const customMessage = args.find((a) => !a.startsWith('--'))

/** 运行 shell 命令，返回 trim 后的字符串输出。失败则抛出并退出。 */
function run(cmd, { silent = false } = {}) {
  if (!silent) console.log(`${COLORS.dim}$ ${cmd}${COLORS.reset}`)
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim()
  } catch (err) {
    console.error(`${COLORS.red}命令失败：${cmd}${COLORS.reset}`)
    if (err.stderr) console.error(err.stderr.toString().trim())
    process.exit(1)
  }
}

/** 检查工作区是否有 content 目录的变更（含未跟踪文件）。 */
function getContentChanges() {
  const status = run('git status --porcelain -- content/', { silent: true })
  if (!status) return []
  return status.split('\n').map((line) => {
    const raw = line.slice(0, 2) // XY 状态码
    const path = line.slice(3).trim()
    let type = 'modified'
    if (raw.includes('A') || raw[0] === '?') type = 'added'
    else if (raw.includes('D') || raw[0] === 'D') type = 'deleted'
    return { type, path }
  })
}

/** 根据变更文件自动生成中文提交信息。 */
function buildMessage(changes) {
  const added = changes.filter((c) => c.type === 'added').map((c) => c.path)
  const modified = changes.filter((c) => c.type === 'modified').map((c) => c.path)
  const deleted = changes.filter((c) => c.type === 'deleted').map((c) => c.path)

  const parts = []
  if (added.length) parts.push(`新增 ${added.length} 篇`)
  if (modified.length) parts.push(`更新 ${modified.length} 篇`)
  if (deleted.length) parts.push(`删除 ${deleted.length} 篇`)

  const summary = parts.join('、') || '更新内容'
  const detail = [...added, ...modified, ...deleted]
    .map((p) => p.replace(/^content\//, '').replace(/\.(mdx|md)$/, ''))
    .slice(0, 5)
    .join(', ')

  return `content: ${summary}（${detail}）`
}

function main() {
  console.log(`${COLORS.cyan}检查 content/ 目录变更...${COLORS.reset}\n`)

  // 前置检查：必须在 git 仓库内
  run('git rev-parse --is-inside-work-tree', { silent: true })

  const changes = getContentChanges()
  if (changes.length === 0) {
    console.log(`${COLORS.yellow}content/ 目录没有需要提交的变更。${COLORS.reset}`)
    return
  }

  const message = customMessage || buildMessage(changes)

  console.log(`${COLORS.cyan}待提交（${changes.length} 项）：${COLORS.reset}`)
  for (const c of changes) {
    const tag =
      c.type === 'added'
        ? `${COLORS.green}+ 新增${COLORS.reset}`
        : c.type === 'deleted'
          ? `${COLORS.red}- 删除${COLORS.reset}`
          : `${COLORS.yellow}~ 修改${COLORS.reset}`
    console.log(`  ${tag}  ${c.path}`)
  }
  console.log(`\n${COLORS.cyan}提交信息：${COLORS.reset}${message}\n`)

  if (dryRun) {
    console.log(`${COLORS.yellow}[dry-run] 已预览，未真正提交。${COLORS.reset}`)
    return
  }

  // 暂存 + 提交
  run('git add content/')
  run(`git commit -m "${message.replace(/"/g, '\\"')}"`)

  // 推送
  if (noPush) {
    console.log(`${COLORS.green}已提交（--no-push，未推送）。${COLORS.reset}`)
    return
  }

  // 推送到当前分支的远程上游
  const branch = run('git rev-parse --abbrev-ref HEAD', { silent: true })
  run(`git push origin ${branch}`)
  console.log(
    `${COLORS.green}✓ 已推送到 origin/${branch}，Vercel 将自动开始部署。${COLORS.reset}`,
  )
}

main()
