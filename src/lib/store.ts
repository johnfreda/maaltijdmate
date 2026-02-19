'use client';

import { useState, useEffect, useCallback } from 'react';
import { recipes, type Recipe, type RecipeIngredient } from './recipes';

// Types
export interface MealSlot {
  recipeId: string;
  servings: number;
}

export interface WeekPlan {
  [key: string]: MealSlot | undefined; // key: "0-lunch", "0-dinner", etc (0=monday)
}

export interface ShoppingItem {
  ingredientName_nl: string;
  ingredientName_en: string;
  totalAmount: number;
  unit: string;
  category: string;
  lidl_name?: string;
  lidl_price?: number;
  checked: boolean;
  sources: string[]; // recipe names
}

// LocalStorage helpers
function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(`maaltijdmate_${key}`);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`maaltijdmate_${key}`, JSON.stringify(value));
}

// Hooks
export function useWeekPlan() {
  const [plan, setPlan] = useState<WeekPlan>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPlan(getStored('weekplan', {}));
    setLoaded(true);
  }, []);

  const updatePlan = useCallback((newPlan: WeekPlan) => {
    setPlan(newPlan);
    setStored('weekplan', newPlan);
  }, []);

  const setMeal = useCallback((day: number, mealType: 'lunch' | 'dinner', recipeId: string, servings: number = 2) => {
    setPlan(prev => {
      const key = `${day}-${mealType}`;
      const next = { ...prev, [key]: { recipeId, servings } };
      setStored('weekplan', next);
      return next;
    });
  }, []);

  const removeMeal = useCallback((day: number, mealType: 'lunch' | 'dinner') => {
    setPlan(prev => {
      const key = `${day}-${mealType}`;
      const next = { ...prev };
      delete next[key];
      setStored('weekplan', next);
      return next;
    });
  }, []);

  const clearWeek = useCallback(() => {
    updatePlan({});
  }, [updatePlan]);

  const mealsPlanned = Object.keys(plan).filter(k => plan[k]).length;

  return { plan, loaded, setMeal, removeMeal, clearWeek, mealsPlanned };
}

export function useShoppingList() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCheckedItems(getStored('shopping_checked', {}));
    setLoaded(true);
  }, []);

  const toggleItem = useCallback((key: string) => {
    setCheckedItems(prev => {
      const next = { ...prev, [key]: !prev[key] };
      setStored('shopping_checked', next);
      return next;
    });
  }, []);

  const clearChecked = useCallback(() => {
    setCheckedItems({});
    setStored('shopping_checked', {});
  }, []);

  return { checkedItems, loaded, toggleItem, clearChecked };
}

// Generate shopping list from week plan
export function generateShoppingList(plan: WeekPlan): ShoppingItem[] {
  const itemMap = new Map<string, ShoppingItem>();

  Object.values(plan).forEach(slot => {
    if (!slot) return;
    const recipe = recipes.find(r => r.id === slot.recipeId);
    if (!recipe) return;

    const scale = slot.servings / recipe.servings;

    recipe.ingredients.forEach(ri => {
      // Skip common pantry items (salt, pepper, oil, etc)
      if (ri.ingredient.is_common) return;

      const key = ri.ingredient.name_nl;
      const existing = itemMap.get(key);

      if (existing) {
        existing.totalAmount += ri.amount * scale;
        if (!existing.sources.includes(recipe.title_nl)) {
          existing.sources.push(recipe.title_nl);
        }
      } else {
        itemMap.set(key, {
          ingredientName_nl: ri.ingredient.name_nl,
          ingredientName_en: ri.ingredient.name_en,
          totalAmount: ri.amount * scale,
          unit: ri.unit,
          category: ri.ingredient.category,
          lidl_name: ri.ingredient.lidl_name,
          lidl_price: ri.ingredient.lidl_price,
          checked: false,
          sources: [recipe.title_nl],
        });
      }
    });
  });

  // Sort by category, then by name
  const categoryOrder = ['produce', 'dairy', 'meat', 'bakery', 'pantry', 'canned', 'frozen', 'spices', 'drinks', 'other'];
  return Array.from(itemMap.values()).sort((a, b) => {
    const catDiff = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    if (catDiff !== 0) return catDiff;
    return a.ingredientName_nl.localeCompare(b.ingredientName_nl);
  });
}

// Calculate total estimated cost
export function estimateShoppingCost(items: ShoppingItem[]): number {
  return items.reduce((total, item) => {
    if (item.lidl_price) return total + item.lidl_price;
    return total;
  }, 0);
}
