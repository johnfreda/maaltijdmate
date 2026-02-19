'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = locale === 'nl' ? 'en' : 'nl';

  return (
    <button
      onClick={() => router.replace(pathname, { locale: switchTo })}
      className="p-2 rounded-xl hover:bg-gray-100 transition-premium group"
      title={`Switch to ${switchTo === 'en' ? 'English' : 'Nederlands'}`}
    >
      <span className="text-2xl group-hover:scale-110 transition-transform block">
        {switchTo === 'en' ? '🇬🇧' : '🇳🇱'}
      </span>
    </button>
  );
}