/**
 * PM2 进程守护配置
 *
 * 适用场景：
 *   - 不使用 Docker，直接在阿里云 Linux 主机上以 PM2 守护 Next.js standalone
 *   - 与 Docker 方案二选一即可（推荐优先使用 Docker）
 *
 * 使用方式：
 *   1. 先构建产物：pnpm build
 *   2. 启动：pm2 start ecosystem.config.js
 *   3. 保存进程列表：pm2 save
 *   4. 开机自启：pm2 startup
 *
 * 完整部署流程见 README.md「部署」一节
 */

/** @type {import('pm2').EcosystemConfig} */
module.exports = {
  apps: [
    {
      name: 'suhe-blog',
      script: '.next/standalone/server.js',
      instances: 'max', // 多核负载均衡（cluster 模式）
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        HOSTNAME: '0.0.0.0',
        PORT: 3000,
      },
      env_file: '.env',
      // 日志
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // 异常自动重启策略
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
      // 优雅关闭：等待 5s 让正在处理的请求完成
      kill_timeout: 5000,
      listen_timeout: 10000,
      // 文件变化时不自动重启（生产环境）
      watch: false,
    },
  ],
}
