'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Home, Leaf, CalendarDays, ShoppingCart, CalendarClock } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, labelKey: 'home' },
  { href: '/aanbevolen', icon: Leaf, labelKey: 'recommended' },
  { href: '/weekplan', icon: CalendarDays, labelKey: 'weekPlan' },
  { href: '/boodschappen', icon: ShoppingCart, labelKey: 'shoppingList' },
  { href: '/agenda', icon: CalendarClock, labelKey: 'agenda' },
] as const;

export function BottomNav() {
  const t = useTranslations('common');
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-xl items-center justify-between px-2 py-2">
        {navItems.map(({ href, icon: Icon, labelKey }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1">
              <Icon size={18} className={isActive ? 'text-emerald-700' : 'text-gray-500'} />
              <span className={`text-[11px] ${isActive ? 'text-emerald-700' : 'text-gray-500'}`}>{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
