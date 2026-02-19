import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getRecipe, estimateCost, recipes } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Users, Euro, ChefHat, ShoppingCart } from 'lucide-react';

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export default async function RecipePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params;
  const recipe = getRecipe(id);
  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} />;
}

function RecipeDetail({ recipe }: { recipe: NonNullable<ReturnType<typeof getRecipe>> }) {
  const t = useTranslations('common');
  const locale = useLocale();

  const title = locale === 'nl' ? recipe.title_nl : recipe.title_en;
  const desc = locale === 'nl' ? recipe.description_nl : recipe.description_en;
  const steps = locale === 'nl' ? recipe.steps_nl : recipe.steps_en;
  const cost = estimateCost(recipe);

  const difficultyLabel = t(recipe.difficulty as any);

  return (
    <div className="max-w-lg mx-auto px-4 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 pt-6 pb-4">
        <Link href="/recepten" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold flex-1">{title}</h1>
      </div>

      {/* Hero */}
      <div className="h-48 bg-gradient-to-br from-green-50 to-green-200 rounded-2xl flex items-center justify-center text-7xl mb-4">
        {recipe.emoji}
      </div>

      {/* Meta */}
      <p className="text-gray-600 text-sm mb-4">{desc}</p>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Clock size={16} className="text-green-600" />
          <span>{recipe.prep_time} {t('minutes')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Users size={16} className="text-green-600" />
          <span>{recipe.servings} {t('servings')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <ChefHat size={16} className="text-green-600" />
          <span>{difficultyLabel}</span>
        </div>
        {cost > 0 && (
          <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
            <Euro size={16} />
            <span>{cost.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {recipe.tags.length > 0 && (
        <div className="flex gap-2 mb-6">
          {recipe.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
              {t(tag as any)}
            </span>
          ))}
        </div>
      )}

      {/* Ingredients */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-base">{t('ingredients')}</h2>
          <span className="text-xs text-gray-400">{recipe.servings} {t('servings')}</span>
        </div>
        <ul className="space-y-2">
          {recipe.ingredients.map((ri, i) => {
            const name = locale === 'nl' ? ri.ingredient.name_nl : ri.ingredient.name_en;
            const notes = locale === 'nl' ? ri.notes_nl : ri.notes_en;
            return (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="font-medium text-green-700 min-w-[60px] text-right">
                  {ri.amount} {ri.unit}
                </span>
                <span className="flex-1">
                  {name}
                  {notes && <span className="text-gray-400 ml-1">({notes})</span>}
                  {ri.ingredient.lidl_price && !ri.ingredient.is_common && (
                    <span className="text-green-600 text-xs ml-1">€{ri.ingredient.lidl_price.toFixed(2)}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <h2 className="font-bold text-base mb-3">{t('steps')}</h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-gray-700 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Add to plan button */}
      <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
        <ShoppingCart size={18} />
        {t('addRecipe')} → {t('weekPlan')}
      </button>
    </div>
  );
}
