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
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass border-t border-white/20 safe-area-bottom">
        <div className="flex items-center justify-around max-w-lg mx-auto px-6 py-3">
          {navItems.map(({ href, icon: Icon, labelKey }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="relative flex flex-col items-center gap-1.5 px-4 py-2 transition-premium group"
              >
                {/* Active indicator pill */}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-md" />
                )}
                
                {/* Icon with active state */}
                <div className={`p-1.5 rounded-xl transition-premium ${
                  isActive
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 group-hover:text-green-500 group-hover:bg-gray-50'
                }`}>
                  <Icon 
                    size={24} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className="transition-premium"
                  />
                </div>
                
                {/* Label */}
                <span className={`text-xs font-medium transition-premium text-premium ${
                  isActive
                    ? 'text-green-600'
                    : 'text-gray-500 group-hover:text-green-500'
                }`}>
                  {t(labelKey)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}