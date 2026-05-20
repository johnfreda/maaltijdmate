# Bio Weekplanner (MaaltijdMate pivot)

Mobile-first planner focused on **mentale ontlasting**:
- kies aanbevolen bio/gezonde recepten
- plan per week (onbeperkt jaren vooruit)
- stel aantal personen in
- krijg automatisch een gecombineerde boodschappenlijst
- vink boodschappen af
- plan boodschappenmoment per week
- sync naar agenda via iCal (week + all-weeks feed)

## Stack
- Next.js 16 + TypeScript
- Tailwind CSS
- next-intl (NL/EN)
- Supabase (auth + cloud sync)
- LocalStorage fallback

## Routes
- `/[locale]/aanbevolen` — aanbevolen bio recepten
- `/[locale]/weekplan` — recepten aan weekdagen koppelen + weeknavigatie
- `/[locale]/boodschappen` — automatische afvinkbare lijst per week
- `/[locale]/agenda` — boodschappenmoment + iCal links/exports
- `/api/ical` — local encoded feed
- `/api/ical/feed/[token]` — stabiele persoonlijke feed (server sync)

## Environment
Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## DB schema
Run `supabase/schema.sql` in your Supabase SQL editor.

## Run
```bash
npm install
npm run dev
npm run build
```

## Not in MVP
- supermarktbestellingen
- prijsvergelijking
- voorraadkast complexiteit
- voedingswaarden
- native app
- AI-chat interface
