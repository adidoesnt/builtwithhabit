# Built with Habit

## Overview

A booking portal for **builtwithhabit**, a platform that provides fitness and nutrition coaching.  

The platform aims to feature user authentication, a user dashboard and a bookings page complete with payment integration.

This project is currently under development.

## Tech Stack

- Bun
- SvelteKit
- TailwindCSS
- TypeScript
- Drizzle ORM
- Supabase
- Stripe
- Vercel

## Development

Configure the environment variables:

```bash
# Edit the .env file with your own values
cp .env.example .env
```

Migrate the database:

```bash
bun run db:generate
bun run db:migrate

# Or, if one liners are your thing
bun run db:push
```

Install the dependencies:

```bash
bun install
```

Run the development server:

```bash
bun run dev
```

Go to [http://localhost:5173](http://localhost:5173) to view the application.
