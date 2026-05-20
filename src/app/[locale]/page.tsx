import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

const cards = [
  { href: '/weekplan', key: 'weeklyCanvas' },
  { href: '/aanbevolen', key: 'recipeLibrary' },
  { href: '/boodschappen', key: 'distilledGroceries' },
  { href: '/agenda', key: 'icalSync' },
] as const;

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <h1 className="display-serif text-4xl leading-tight sm:text-6xl">{t('title')}</h1>
      <p className="mt-3 max-w-3xl text-[#50564f]">{t('subtitle')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-2xl border border-[#e3e2db] bg-white p-5 transition hover:border-[#c7d3bf] hover:bg-[#fbfcf7]">
            <h2 className="display-serif text-3xl">{t(`cards.${card.key}.title`)}</h2>
            <p className="mt-2 text-sm text-[#5a6059]">{t(`cards.${card.key}.text`)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
