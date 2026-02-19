import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getRecipe, estimateCost, recipes } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Users, Euro, ChefHat, ShoppingCart, ExternalLink, Flame, Calendar, Hash } from 'lucide-react';
import RecipeDetailClient from './RecipeDetailClient';

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export default async function RecipePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params;
  const recipe = getRecipe(id);
  if (!recipe) notFound();

  return <RecipeDetailClient recipe={recipe} />;
}