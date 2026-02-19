import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Share2, Copy, ShoppingCart } from 'lucide-react';

export default function ShoppingListPage() {
  const t = useTranslations('shopping');
  const tc = useTranslations('common');

  return (
    <div className="max-w-lg mx-auto px-4">
      <div className="flex items-center justify-between pt-6 pb-4">
        <h1 className="text-xl font-bold">{t('title')}</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Copy size={18} className="text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Share2 size={18} className="text-gray-500" />
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <ShoppingCart size={40} className="text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-600 mb-2">{t('empty')}</h2>
        <p className="text-sm text-gray-400 max-w-[250px]">{t('emptyHint')}</p>
      </div>
    </div>
  );
}
