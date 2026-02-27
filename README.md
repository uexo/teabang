# Teabang - Premium Tea E-commerce Platform

A modern, full-featured e-commerce platform for premium Chinese teas. Built with Next.js 14, TypeScript, Tailwind CSS, and Prisma.

![Teabang](https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200)

## Features

### Core Functionality
- 🛍️ **Product Catalog** - Browse and search premium teas by category
- 🛒 **Shopping Cart** - Add, remove, and manage cart items with Zustand state management
- 💳 **Multiple Payment Methods** - WeChat Pay, Alipay, Stripe, and PayPal support
- 🌍 **Internationalization** - Full i18n support for Chinese (中文) and English
- 📱 **Responsive Design** - Mobile-first design using Tailwind CSS
- 🔐 **User Authentication** - Secure login and registration with NextAuth.js
- 📦 **Order Management** - Track orders and view order history

### Admin Dashboard
- 📊 **Analytics Dashboard** - View sales statistics and recent orders
- 📝 **Product Management** - CRUD operations for products
- 👥 **User Management** - Manage user accounts
- 📋 **Order Management** - Process and track orders

### Technical Features
- ⚡ **Next.js 14** with App Router for optimal performance
- 🔒 **Type-safe** with TypeScript
- 🎨 **Modern UI** using shadcn/ui components
- 💾 **PostgreSQL Database** with Prisma ORM
- 🛡️ **Security** - bcrypt password hashing, secure sessions
- 📧 **Email Support** - Integration with Resend for transactional emails

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Payment**: Stripe, PayPal (WeChat Pay & Alipay ready for production)
- **Deployment**: Vercel-ready

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Payment provider accounts (Stripe/PayPal for test mode)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/teabang.git
cd teabang
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/teabang?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe (Test Mode)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# PayPal (Sandbox)
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
PAYPAL_MODE="sandbox"
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
teabang/
├── app/                    # Next.js App Router
│   ├── [locale]/          # i18n localized routes
│   │   ├── page.tsx       # Home page
│   │   ├── products/      # Product pages
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout flow
│   │   ├── account/       # User account
│   │   └── admin/         # Admin dashboard
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── product/          # Product components
│   ├── cart/             # Cart components
│   └── auth/             # Auth components
├── lib/                   # Utility libraries
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # Auth configuration
│   └── store/            # Zustand stores
├── prisma/               # Database schema
│   └── schema.prisma
├── messages/             # i18n translations
│   ├── en.json
│   └── zh.json
└── types/                # TypeScript types
```

## Payment Integration

### Stripe
- Test cards available at [Stripe Docs](https://stripe.com/docs/testing)
- Use card `4242 4242 4242 4242` for successful payments

### PayPal
- Sandbox accounts for testing
- Configure in PayPal Developer Dashboard

### WeChat Pay & Alipay
- Ready for production integration
- Requires merchant accounts for live transactions
- Sandbox mode available for development

## Database Schema

The application uses the following main entities:
- **User** - Customer accounts
- **Product** - Tea products with multilingual support
- **Category** - Product categories
- **Order** - Customer orders
- **Payment** - Payment records
- **CartItem** - Shopping cart items
- **Review** - Product reviews

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Docker

A `Dockerfile` is included for containerized deployment:

```bash
docker build -t teabang .
docker run -p 3000:3000 teabang
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email hello@teabang.com or open an issue on GitHub.

---

Built with ❤️ for tea lovers around the world 🍵
