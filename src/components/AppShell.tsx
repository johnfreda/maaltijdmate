'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { CalendarDays, Leaf, ShoppingBasket, CalendarClock, Home } from 'lucide-react';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/weekplan', label: 'Weekly Plan', icon: CalendarDays },
  { href: '/aanbevolen', label: 'Recipes', icon: Leaf },
  { href: '/boodschappen', label: 'Grocery List', icon: ShoppingBasket },
  { href: '/agenda', label: 'Settings', icon: CalendarClock },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f4f4f1] text-[#1d1d1b]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
        <aside className="hidden w-64 border-r border-[#e6e5df] bg-[#f1f1ec] p-5 lg:flex lg:flex-col">
          <div>
            <p className="text-2xl font-semibold tracking-tight">Curator Kitchen</p>
            <p className="mt-1 text-sm text-[#5f655d]">Bio Weekplanner</p>
          </div>

          <nav className="mt-8 space-y-2">
            {items.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                    active ? 'bg-[#b9c8b7] text-[#1d2a1d]' : 'text-[#30322f] hover:bg-[#e8e8e2]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <Link href="/weekplan" className="block rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white">
              Create New Plan
            </Link>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#e6e5df] bg-[#f4f4f1]/90 backdrop-blur">
            <div className="mx-auto flex h-14 w-full items-center justify-between px-4 sm:px-6">
              <p className="text-lg font-semibold lg:hidden">Curator Kitchen</p>
              <p className="hidden text-lg font-semibold lg:block">Plated</p>
              <Link href="/weekplan" className="rounded-full bg-black px-4 py-1.5 text-xs font-medium text-white sm:text-sm">
                Plan week
              </Link>
            </div>
          </header>

          <main className="flex-1 pb-24 lg:pb-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
