'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Home, BookOpen, Calendar, ShoppingCart } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, labelKey: 'home' },
  { href: '/recepten', icon: BookOpen, labelKey: 'recipes' },
  { href: '/weekplan', icon: Calendar, labelKey: 'weekPlan' },
  { href: '/boodschappen', icon: ShoppingCart, labelKey: 'shoppingList' },
] as const;

export function BottomNav() {
  const t = useTranslations('common');
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16">
        {navItems.map(({ href, icon: Icon, labelKey }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
