import { notFound } from 'next/navigation';
import { getRecipeById, recipes } from '@/lib/recipes';

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) notFound();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <p className="mt-1 text-gray-600">{recipe.description}</p>

      <h2 className="mt-6 font-semibold">Ingrediënten</h2>
      <ul className="mt-2 list-disc pl-6 text-sm text-gray-700">
        {recipe.ingredients.map((item) => (
          <li key={`${item.name}-${item.amount}`}>
            {item.name} — {item.amount}
          </li>
        ))}
      </ul>

      <h2 className="mt-6 font-semibold">Stappen</h2>
      <ol className="mt-2 list-decimal pl-6 text-sm text-gray-700">
        {recipe.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
