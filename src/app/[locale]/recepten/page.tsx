import { recipes } from '@/lib/recipes';

export default function RecipesPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Recepten</h1>
      <p className="mt-1 text-gray-600">MVP seed data. Volgende stap: recepten uit Supabase.</p>

      <div className="mt-6 space-y-4">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{recipe.description}</p>
            <div className="mt-3 flex gap-2 text-xs text-gray-500">
              <span>{recipe.prepMinutes} min</span>
              <span>•</span>
              <span>{recipe.servings} porties</span>
              <span>•</span>
              <span>{recipe.tags.join(', ')}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
