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
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      <span>{switchTo === 'en' ? '🇬🇧' : '🇳🇱'}</span>
      <span className="uppercase">{switchTo}</span>
    </button>
  );
}
