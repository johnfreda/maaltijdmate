import { bioRecipes } from '@/lib/bioRecipes';

export default function AanbevolenPage() {
  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="text-2xl font-semibold">Wekelijkse aanbevelingen</h1>
      <p className="mt-1 text-sm text-gray-600">Rustige selectie van gezonde bio-recepten voor deze week.</p>

      <div className="mt-4 space-y-3">
        {bioRecipes.map((recipe) => (
          <article key={recipe.id} className="rounded-2xl border bg-white p-4">
            <h2 className="text-lg font-medium">{recipe.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{recipe.subtitle}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-emerald-700">
              {recipe.bioTags.map((tag) => (
                <span key={tag} className="rounded-full bg-emerald-50 px-2 py-1">
                  {tag}
                </span>
              ))}
              <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">{recipe.minutes} min</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
