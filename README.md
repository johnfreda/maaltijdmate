# MaaltijdMate (Rebuild v2)

Clean MVP restart for **Maaltijd Week Studio**.

## Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- next-intl (NL/EN)
- Supabase (auth + data)

## What is in v2 now
- Home dashboard with clear modules
- Recipes page (seed data)
- Week plan page (seed template)
- Shopping list generated from week plan
- Auth baseline page (`/[locale]/auth`) with Supabase sign-in
- Supabase SQL schema in `supabase/schema.sql`

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment
Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Next milestone
- Registration + password reset
- Persist recipes/week plan in Supabase
- User onboarding
- Vercel production deploy
