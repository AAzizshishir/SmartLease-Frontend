# SmartLease — Frontend

A modern property management web application built with Next.js 15, TypeScript, and Shadcn UI.

## Live App

[https://smartlease-frontend.vercel.app](https://smartlease-frontend.vercel.app)

## Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS + Shadcn UI
- **Data Fetching** — TanStack Query v5 + Axios
- **Forms** — TanStack Form + Zod validation
- **Auth** — Better Auth client
- **Fonts** — Inter + DM Sans

## Features

- Role-based dashboards — Admin, Landlord, Tenant
- Server-side rendering with TanStack Query prefetch + hydration
- Property & unit management with image upload
- Lease application flow with status tracking
- Stripe payment integration
- Maintenance ticket system
- Notice board with unread tracking
- Dark/light theme support
- Responsive design
- Pagination with limit selector

## Project Structure

src/
├── app/
│ ├── (public)/ # Public pages
│ ├── (auth)/ # Login, Register
│ └── (dashboard-layout)/
│ ├── @landlord/ # Landlord pages
│ ├── @tenant/ # Tenant pages
│ └── @admin/ # Admin pages
├── components/
│ ├── ui/ # Shadcn components
│ ├── shared/ # Reusable components
│ └── module/ # Feature components
├── hooks/ # TanStack Query hooks
├── services/ # API service functions
├── validations/ # Zod schemas
├── types/ # TypeScript types
└── lib/ # Axios, utils

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/AAzizshishir/SmartLease-Frontend.git
cd smartlease-frontend

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Pages

### Public

| Page        | Path          |
| ----------- | ------------- |
| Home        | `/`           |
| Units       | `/units`      |
| Unit Detail | `/units/[id]` |

### Landlord Dashboard

| Page            | Path                        |
| --------------- | --------------------------- |
| Dashboard       | `/landlord/dashboard`       |
| Properties      | `/landlord/properties`      |
| Property Detail | `/landlord/properties/[id]` |
| Applications    | `/landlord/applications`    |
| Leases          | `/landlord/leases`          |
| Payments        | `/landlord/payments`        |
| Maintenance     | `/landlord/maintenance`     |
| Notices         | `/landlord/notices`         |

### Tenant Dashboard

| Page         | Path                   |
| ------------ | ---------------------- |
| Dashboard    | `/tenant/dashboard`    |
| My Lease     | `/tenant/lease`        |
| Payments     | `/tenant/payments`     |
| Maintenance  | `/tenant/maintenance`  |
| Applications | `/tenant/applications` |

## Scripts

```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm start    # Production server
pnpm lint     # ESLint check
```

## 🎨 Design System

- **Primary color** — Orange `#f08d39`
- **Default theme** — Dark
- **Border radius** — 0.5rem
- **Fonts** — Inter (body), DM Sans (heading)
