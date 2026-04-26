import { getRecipeById, weekTemplate } from '@/lib/recipes';

export default function WeekPlanPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Weekplan</h1>
      <p className="mt-1 text-gray-600">Simpel baseline schema voor de nieuwe app.</p>

      <ul className="mt-6 space-y-3">
        {weekTemplate.map((item) => {
          const recipe = getRecipeById(item.recipeId);
          return (
            <li key={`${item.day}-${item.recipeId}`} className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">{item.day}</p>
              <p className="font-medium">{recipe?.title ?? 'Onbekend recept'}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
