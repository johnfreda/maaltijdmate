'use client';

import type { Recipe } from '@/lib/recipes';

export default function RecipeDetailClient({ recipe }: { recipe: Recipe }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <h2 className="font-semibold">{recipe.title}</h2>
      <p className="text-sm text-gray-600">{recipe.description}</p>
    </div>
  );
}
