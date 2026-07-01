# 多阶段构建：speedcore博客（Next.js 15 Standalone）
# 参考：https://nextjs.org/docs/app/api-reference/config/next-config-js/output

# ===== Stage 1: deps（安装依赖） =====
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 启用 pnpm（Node 20 内置 corepack）
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@9.15.3 --activate

# 仅复制清单文件，最大化利用 Docker 层缓存
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ===== Stage 2: builder（构建生产产物） =====
FROM node:20-alpine AS builder
WORKDIR /app

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@9.15.3 --activate

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_OUTPUT_STANDALONE=true

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建时所需的环境变量（NEXT_PUBLIC_* 会被内联到客户端产物）
ARG NEXT_PUBLIC_SITE_URL=https://suhe.dev
ARG NEXT_PUBLIC_SITE_NAME="speedcore"
ARG NEXT_PUBLIC_GITHUB_USERNAME=suhe
ARG NEXT_PUBLIC_GISCUS_REPO=owner/repo
ARG NEXT_PUBLIC_GISCUS_REPO_ID=
ARG NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
ARG NEXT_PUBLIC_GISCUS_CATEGORY_ID=
ARG NEXT_PUBLIC_EMAIL=suhe@example.com
ARG NEXT_PUBLIC_WECHAT_QR=/images/wechat-qr.png
ARG NEXT_PUBLIC_MUSIC_TRACKS=ambient-1.mp3,ambient-2.mp3

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
ENV NEXT_PUBLIC_GITHUB_USERNAME=$NEXT_PUBLIC_GITHUB_USERNAME
ENV NEXT_PUBLIC_GISCUS_REPO=$NEXT_PUBLIC_GISCUS_REPO
ENV NEXT_PUBLIC_GISCUS_REPO_ID=$NEXT_PUBLIC_GISCUS_REPO_ID
ENV NEXT_PUBLIC_GISCUS_CATEGORY=$NEXT_PUBLIC_GISCUS_CATEGORY
ENV NEXT_PUBLIC_GISCUS_CATEGORY_ID=$NEXT_PUBLIC_GISCUS_CATEGORY_ID
ENV NEXT_PUBLIC_EMAIL=$NEXT_PUBLIC_EMAIL
ENV NEXT_PUBLIC_WECHAT_QR=$NEXT_PUBLIC_WECHAT_QR
ENV NEXT_PUBLIC_MUSIC_TRACKS=$NEXT_PUBLIC_MUSIC_TRACKS

RUN pnpm build

# ===== Stage 3: runner（最终运行镜像） =====
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 非 root 用户运行，符合安全最佳实践
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# 复制 standalone 产物（含最小化 node_modules）
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# 复制静态资源（standalone 不包含）
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# 复制 public 目录
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# 健康检查：每 30s 探测一次根页面
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/zh', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "server.js"]
