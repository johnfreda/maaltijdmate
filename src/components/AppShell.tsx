'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Bell, CalendarDays, CircleUserRound, Leaf, Search, ShoppingBasket, CalendarClock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const items = [
  { href: '/weekplan', icon: CalendarDays, key: 'weekplan' },
  { href: '/aanbevolen', icon: Leaf, key: 'recipes' },
  { href: '/boodschappen', icon: ShoppingBasket, key: 'grocery' },
  { href: '/agenda', icon: CalendarClock, key: 'settings' },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('shell');

  return (
    <div className="min-h-screen bg-[#f4f4f1] text-[#171917]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
        <aside className="hidden w-64 border-r border-[#e5e3db] bg-[#f1f0ea] p-5 lg:flex lg:flex-col">
          <div>
            <p className="text-[34px] font-semibold tracking-tight">{t('brand')}</p>
            <p className="mt-1 text-sm text-[#64685f]">{t('planBadge')}</p>
          </div>

          <Link href="/weekplan" className="mt-8 block rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white">
            {t('createPlan')}
          </Link>

          <nav className="mt-6 space-y-2">
            {items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition ${
                    active ? 'bg-[#b8c8b4] text-[#1d2c1e]' : 'text-[#2d312d] hover:bg-[#e8e7e0]'
                  }`}
                >
                  <Icon size={17} />
                  <span>{t(`nav.${item.key}`)}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto text-sm text-[#656a62]">{t('helpCenter')}</div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#e5e3db] bg-[#f4f4f1]/95 backdrop-blur">
            <div className="mx-auto flex h-14 w-full items-center justify-between gap-4 px-4 sm:px-6">
              <p className="text-lg font-semibold lg:hidden">{t('brand')}</p>
              <p className="hidden text-[30px] font-semibold leading-none lg:block">{t('product')}</p>

              <div className="hidden items-center gap-3 lg:flex">
                <div className="flex items-center gap-2 rounded-full border border-[#e1dfd6] bg-[#f7f6f2] px-3 py-1.5 text-sm text-[#646861]">
                  <Search size={14} />
                  <span>{t('searchPlaceholder')}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => router.replace(pathname, { locale: 'en' })}
                    className={`rounded-full px-2 py-0.5 font-semibold ${locale === 'en' ? 'bg-black text-white' : 'text-[#73776f]'}`}
                  >
                    EN
                  </button>
                  <span className="text-[#9ca19a]">/</span>
                  <button
                    onClick={() => router.replace(pathname, { locale: 'nl' })}
                    className={`rounded-full px-2 py-0.5 font-semibold ${locale === 'nl' ? 'bg-black text-white' : 'text-[#73776f]'}`}
                  >
                    NL
                  </button>
                </div>
                <Bell size={16} className="text-[#2b2f2c]" />
                <CircleUserRound size={18} className="text-[#2b2f2c]" />
              </div>

              <Link href="/weekplan" className="rounded-full bg-black px-4 py-1.5 text-xs font-medium text-white sm:text-sm lg:hidden">
                {t('planWeek')}
              </Link>
            </div>
          </header>

          <main className="flex-1 pb-24 lg:pb-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
