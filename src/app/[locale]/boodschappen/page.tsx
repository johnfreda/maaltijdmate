import { getShoppingItemsFromWeek } from '@/lib/recipes';
import { ShoppingListClient } from '@/components/ShoppingListClient';

export default function ShoppingPage() {
  const items = getShoppingItemsFromWeek();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Boodschappen</h1>
      <p className="mt-1 text-gray-600">Automatisch opgebouwd uit je weekplan.</p>

      <div className="mt-6">
        <ShoppingListClient items={items} />
      </div>
    </div>
  );
}
