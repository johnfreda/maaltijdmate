import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function HomePage() {
  const t = await getTranslations('home');

  const cards = [
    { href: '/recepten', title: t('recipesTitle'), text: t('recipesText') },
    { href: '/weekplan', title: t('weekPlanTitle'), text: t('weekPlanText') },
    { href: '/boodschappen', title: t('shoppingTitle'), text: t('shoppingText') },
    { href: '/auth', title: t('authTitle'), text: t('authText') },
  ];

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="mt-2 text-gray-600">{t('subtitle')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md">
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{card.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
