export type Ingredient = {
  name: string;
  amount: string;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  prepMinutes: number;
  servings: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
};

export const recipes: Recipe[] = [
  {
    id: 'one-pot-pasta',
    title: 'One-pot tomatenpasta',
    description: 'Snel doordeweeks gerecht met weinig afwas.',
    prepMinutes: 20,
    servings: 2,
    tags: ['snel', 'budget'],
    ingredients: [
      { name: 'Volkoren pasta', amount: '180 g' },
      { name: 'Tomatenblokjes', amount: '400 g' },
      { name: 'Ui', amount: '1 stuks' },
      { name: 'Knoflook', amount: '2 tenen' },
      { name: 'Spinazie', amount: '150 g' },
      { name: 'Parmezaan', amount: '30 g' },
    ],
    steps: [
      'Snijd ui en knoflook fijn.',
      'Bak kort aan in een pan met olijfolie.',
      'Voeg pasta, tomatenblokjes en 300 ml water toe.',
      'Laat 12-14 minuten zacht koken en roer af en toe.',
      'Roer spinazie en Parmezaan erdoor en serveer.',
    ],
  },
  {
    id: 'kip-bowl',
    title: 'Kip rijstbowl',
    description: 'Meal-prep vriendelijk met veel groenten.',
    prepMinutes: 25,
    servings: 2,
    tags: ['mealprep', 'eiwitrijk'],
    ingredients: [
      { name: 'Kipdijfilet', amount: '300 g' },
      { name: 'Zilvervliesrijst', amount: '150 g' },
      { name: 'Paprika', amount: '1 stuks' },
      { name: 'Komkommer', amount: '0.5 stuks' },
      { name: 'Sojasaus', amount: '2 el' },
      { name: 'Yoghurt', amount: '100 g' },
    ],
    steps: [
      'Kook de rijst volgens verpakking.',
      'Bak kipreepjes goudbruin en gaar met sojasaus.',
      'Snijd paprika en komkommer.',
      'Verdeel rijst, kip en groenten over kommen.',
      'Werk af met yoghurt-dressing.',
    ],
  },
  {
    id: 'vega-wraps',
    title: 'Mexicaanse vega wraps',
    description: 'Vullend, snel en makkelijk schaalbaar.',
    prepMinutes: 18,
    servings: 2,
    tags: ['vega', 'familie'],
    ingredients: [
      { name: 'Tortilla wraps', amount: '4 stuks' },
      { name: 'Kidneybonen', amount: '240 g' },
      { name: 'Mais', amount: '150 g' },
      { name: 'Passata', amount: '250 ml' },
      { name: 'Ui', amount: '1 stuks' },
      { name: 'Geraspte kaas', amount: '75 g' },
    ],
    steps: [
      'Fruit ui in een koekenpan.',
      'Voeg bonen, mais en passata toe en verwarm 8 minuten.',
      'Warm wraps kort op.',
      'Vul wraps met bonenmengsel en kaas.',
      'Vouw dicht en serveer.',
    ],
  },
];

export const weekTemplate = [
  { day: 'Maandag', recipeId: 'one-pot-pasta' },
  { day: 'Dinsdag', recipeId: 'kip-bowl' },
  { day: 'Woensdag', recipeId: 'vega-wraps' },
  { day: 'Donderdag', recipeId: 'one-pot-pasta' },
  { day: 'Vrijdag', recipeId: 'kip-bowl' },
];

export function getRecipeById(id: string) {
  return recipes.find((r) => r.id === id);
}

export function getShoppingItemsFromWeek() {
  const totals = new Map<string, string[]>();

  for (const day of weekTemplate) {
    const recipe = getRecipeById(day.recipeId);
    if (!recipe) continue;

    for (const item of recipe.ingredients) {
      const current = totals.get(item.name) ?? [];
      current.push(item.amount);
      totals.set(item.name, current);
    }
  }

  return Array.from(totals.entries()).map(([name, amounts]) => ({
    name,
    note: amounts.join(' + '),
  }));
}
