# Bio Weekplanner (MaaltijdMate pivot)

Mobile-first prototype focused on **mentale ontlasting**:
- kies aanbevolen bio/gezonde recepten
- koppel aan weekdagen
- stel aantal personen in
- krijg automatisch een gecombineerde boodschappenlijst
- vink boodschappen af
- plan boodschappenmoment
- exporteer weekmenu + boodschappenmoment als `.ics`

## Stack
- Next.js 16 + TypeScript
- Tailwind CSS
- next-intl (NL/EN)
- LocalStorage state for MVP persistence

## Routes (MVP milestone)
- `/[locale]/aanbevolen` — aanbevolen bio recepten
- `/[locale]/weekplan` — recept aan dag koppelen + personen
- `/[locale]/boodschappen` — automatische afvinkbare lijst
- `/[locale]/agenda` — boodschappenmoment + iCal export

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
