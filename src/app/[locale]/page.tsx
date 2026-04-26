import { Link } from '@/i18n/navigation';

const cards = [
  {
    href: '/aanbevolen',
    title: 'Aanbevolen recepten',
    text: 'Wekelijks rustige selectie van bio en gezonde gerechten.',
  },
  {
    href: '/weekplan',
    title: 'Weekplanner',
    text: 'Koppel recepten aan dagen en zet direct je porties.',
  },
  {
    href: '/boodschappen',
    title: 'Boodschappenlijst',
    text: 'Automatisch gecombineerd en afvinkbaar.',
  },
  {
    href: '/agenda',
    title: 'Agenda export',
    text: 'Stel je boodschappenmoment in en download iCal.',
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="text-3xl font-semibold">Bio Weekplanner</h1>
      <p className="mt-2 text-gray-600">
        Minder mentale ruis: kiezen, plannen, boodschappen en agenda in één rustige flow.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md">
            <h2 className="text-lg font-medium">{card.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{card.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
