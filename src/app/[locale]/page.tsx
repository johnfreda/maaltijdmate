import { Link } from '@/i18n/navigation';

const cards = [
  {
    href: '/weekplan',
    title: 'Weekly Canvas',
    text: 'Koppel recepten aan je weekdagen met één heldere planning.',
  },
  {
    href: '/aanbevolen',
    title: 'Recipe Library',
    text: 'Ontdek aanbevolen bio recepten en plan direct door.',
  },
  {
    href: '/boodschappen',
    title: 'Distilled Groceries',
    text: 'Automatische gecombineerde lijst met afvinkfunctie.',
  },
  {
    href: '/agenda',
    title: 'iCal Sync',
    text: 'Stel een boodschappenmoment in en exporteer je agenda.',
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <h1 className="display-serif text-4xl leading-tight sm:text-6xl">Bio Weekplanner</h1>
      <p className="mt-3 max-w-3xl text-[#50564f]">
        Een rustige, functionele planningstool die kiezen, structureren en voorbereiden uit handen neemt.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-2xl border border-[#e3e2db] bg-white p-5 transition hover:border-[#c7d3bf] hover:bg-[#fbfcf7]">
            <h2 className="display-serif text-3xl">{card.title}</h2>
            <p className="mt-2 text-sm text-[#5a6059]">{card.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
