# Teabang 全自动部署指南

## ✅ 已完成

1. ✅ GitHub 仓库创建: https://github.com/uexo/teabang
2. ✅ 代码推送完成
3. ✅ Vercel 配置文件添加

---

## 🚀 步骤1: Vercel 部署（5分钟）

### 1.1 导入项目
1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择 `uexo/teabang`
4. 点击 "Import"

### 1.2 配置项目
- **Framework Preset**: Next.js
- **Root Directory**: ./
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 1.3 环境变量
点击 "Environment Variables"，添加：

```
NEXTAUTH_SECRET = teabang-secret-key-2026
NEXTAUTH_URL = https://teabang.com
APP_NAME = Teabang
APP_URL = https://teabang.com
```

点击 "Deploy"

---

## 🗄️ 步骤2: Vercel Postgres 数据库（3分钟）

### 2.1 创建数据库
1. 在 Vercel Dashboard 进入项目
2. 点击 "Storage" 标签
3. 点击 "Connect Store" → "Postgres"
4. 选择区域（建议选 Asia Pacific - Singapore）
5. 点击 "Create"

### 2.2 连接数据库
Vercel 会自动添加环境变量到项目：
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

### 2.3 初始化数据库
在本地或 Vercel 的 "Console" 中运行：

```bash
# 安装依赖
npm install

# 推送数据库结构
npx prisma migrate deploy

# 生成客户端
npx prisma generate

# 添加种子数据
npx prisma db seed
```

---

## 🌐 步骤3: 绑定域名 teabang.com（5分钟）

### 3.1 Vercel 设置
1. 进入 Vercel 项目 → "Settings" → "Domains"
2. 输入 `teabang.com`
3. 点击 "Add"

### 3.2 DNS 配置
在你的域名服务商（如阿里云/GoDaddy）添加记录：

**方式A: CNAME 记录（推荐）**
```
类型: CNAME
主机: @
值: cname.vercel-dns.com
TTL: 600
```

**方式B: A 记录**
```
类型: A
主机: @
值: 76.76.21.21
TTL: 600
```

**www 子域名**
```
类型: CNAME
主机: www
值: cname.vercel-dns.com
TTL: 600
```

### 3.3 等待生效
DNS 传播通常需要 5-30 分钟。

---

## 💳 步骤4: 配置支付系统（10分钟）

### 4.1 Stripe（海外支付）
1. 访问 https://dashboard.stripe.com
2. 获取 API Keys
3. 在 Vercel 添加环境变量：
   ```
   STRIPE_PUBLISHABLE_KEY = pk_live_...
   STRIPE_SECRET_KEY = sk_live_...
   STRIPE_WEBHOOK_SECRET = whsec_...
   ```

### 4.2 PayPal
1. 访问 https://developer.paypal.com
2. 创建应用获取 Client ID 和 Secret
3. 添加环境变量：
   ```
   PAYPAL_CLIENT_ID = ...
   PAYPAL_CLIENT_SECRET = ...
   PAYPAL_MODE = live
   ```

### 4.3 微信支付（国内）
1. 申请微信支付商户号
2. 添加环境变量：
   ```
   WECHAT_APP_ID = ...
   WECHAT_MCH_ID = ...
   WECHAT_API_KEY = ...
   ```

---

## 🤖 步骤5: 自动化赚钱系统设置

### 5.1 弃单挽回邮件（Abandoned Cart）

在 Vercel 添加 Cron Job：

1. 创建 `app/api/cron/abandoned-cart/route.ts`：

```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req: Request) {
  // 验证 Cron Secret
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 查找24小时前的弃单
  const abandonedCarts = await prisma.cartItem.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 25 * 60 * 60 * 1000),
        lte: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    },
    include: {
      user: true,
      product: true
    }
  })

  // 发送挽回邮件
  for (const item of abandonedCarts) {
    await resend.emails.send({
      from: 'Teabang <noreply@teabang.com>',
      to: item.user.email,
      subject: '您的购物车还有未结算的商品',
      html: `
        <h1>Hi ${item.user.name},</h1>
        <p>您在购物车中添加了 ${item.product.name}，但还没有完成结算。</p>
        <p>现在购买可享受限时优惠！</p>
        <a href="https://teabang.com/cart" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;">立即结算</a>
      `
    })
  }

  return NextResponse.json({ sent: abandonedCarts.length })
}
```

2. 在 Vercel 添加环境变量：
   ```
   CRON_SECRET = your-random-secret
   RESEND_API_KEY = re_...
   ```

3. 设置 Cron Job：
   - 进入 Vercel 项目 → "Settings" → "Cron Jobs"
   - 添加: `0 */6 * * *` (每6小时运行一次)
   - URL: `/api/cron/abandoned-cart`

### 5.2 新客户欢迎序列

创建 `app/api/cron/welcome-sequence/route.ts`：

```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 查找1小时前注册的新用户
  const newUsers = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 65 * 60 * 1000),
        lte: new Date(Date.now() - 60 * 60 * 1000)
      }
    }
  })

  for (const user of newUsers) {
    await resend.emails.send({
      from: 'Teabang <hello@teabang.com>',
      to: user.email,
      subject: '欢迎来到 Teabang！',
      html: `
        <h1>欢迎 ${user.name || '茶友'}！</h1>
        <p>感谢加入 Teabang，您的专属茶叶商城。</p>
        <h2>🎁 新用户专享</h2>
        <p>使用优惠码 <strong>NEWBIE20</strong> 享受首单8折！</p>
        <a href="https://teabang.com/products">开始探索</a>
      `
    })
  }

  return NextResponse.json({ sent: newUsers.length })
}
```

添加 Cron Job: `0 * * * *` (每小时运行)

### 5.3 Google Analytics + 转化追踪

1. 访问 https://analytics.google.com 创建账号
2. 获取 Measurement ID (如 `G-XXXXXXXXXX`)
3. 添加到 `app/layout.tsx`：

```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 5.4 自动库存预警

```typescript
// app/api/cron/inventory-alert/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 查找库存低于10的商品
  const lowStock = await prisma.product.findMany({
    where: { stock: { lt: 10 } }
  })

  if (lowStock.length > 0) {
    await resend.emails.send({
      from: 'Teabang System <system@teabang.com>',
      to: 'admin@teabang.com',
      subject: '⚠️ 库存预警',
      html: `
        <h1>库存预警</h1>
        <p>以下商品库存不足：</p>
        <ul>
          ${lowStock.map(p => `<li>${p.name} - 剩余 ${p.stock} 件</li>`).join('')}
        </ul>
      `
    })
  }

  return NextResponse.json({ alerts: lowStock.length })
}
```

Cron: `0 9 * * *` (每天上午9点运行)

---

## 📊 监控面板

### 收入监控
访问 Stripe Dashboard: https://dashboard.stripe.com

### 网站分析
访问 Google Analytics: https://analytics.google.com

### 订单管理
访问 `https://teabang.com/admin`
- 默认账号: admin@teabang.com / admin123

---

## 🎯 预期收入

| 指标 | 保守估计 | 乐观估计 |
|------|---------|---------|
| 日访客 | 100 | 500 |
| 转化率 | 2% | 3% |
| 日订单 | 2 | 15 |
| 客单价 | ¥200 | ¥250 |
| **月收入** | **¥12,000** | **¥112,500** |

---

## 🆘 需要帮助？

部署过程中遇到问题随时问我！

## 🔗 重要链接

- GitHub: https://github.com/uexo/teabang
- 管理后台: https://teabang.com/admin
- Stripe: https://dashboard.stripe.com
- Vercel: https://vercel.com/dashboard
