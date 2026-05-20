export type BioIngredient = {
  name: string;
  amountPerPerson: number;
  unit: string;
};

export type BioRecipe = {
  id: string;
  title: string;
  subtitle: string;
  minutes: number;
  bioTags: string[];
  ingredients: BioIngredient[];
};

export const bioRecipes: BioRecipe[] = [
  {
    id: 'linzen-groentestoof',
    title: 'Bio linzen-groentestoof',
    subtitle: 'Comfort food met veel vezels en seizoensgroenten.',
    minutes: 30,
    bioTags: ['Bio', 'Vezelrijk', 'Doordeweeks'],
    ingredients: [
      { name: 'Bruine linzen', amountPerPerson: 80, unit: 'g' },
      { name: 'Wortel', amountPerPerson: 1, unit: 'st' },
      { name: 'Prei', amountPerPerson: 0.5, unit: 'st' },
      { name: 'Tomatenblokjes', amountPerPerson: 200, unit: 'g' },
      { name: 'Groentebouillon', amountPerPerson: 250, unit: 'ml' },
    ],
  },
  {
    id: 'zalm-broccoli-quinoa',
    title: 'Bio zalm met broccoli & quinoa',
    subtitle: 'Eiwitrijk en licht, met snelle bereiding.',
    minutes: 25,
    bioTags: ['Bio', 'Eiwitrijk', 'Snel'],
    ingredients: [
      { name: 'Zalmfilet', amountPerPerson: 140, unit: 'g' },
      { name: 'Quinoa', amountPerPerson: 70, unit: 'g' },
      { name: 'Broccoli', amountPerPerson: 200, unit: 'g' },
      { name: 'Citroen', amountPerPerson: 0.25, unit: 'st' },
      { name: 'Olijfolie', amountPerPerson: 1, unit: 'el' },
    ],
  },
  {
    id: 'pompoen-kikkererwt-traybake',
    title: 'Pompoen-kikkererwt traybake',
    subtitle: 'Alles op één bakplaat, warm en voedzaam.',
    minutes: 35,
    bioTags: ['Bio', 'Vega', 'Mealprep'],
    ingredients: [
      { name: 'Pompoen', amountPerPerson: 250, unit: 'g' },
      { name: 'Kikkererwten', amountPerPerson: 120, unit: 'g' },
      { name: 'Rode ui', amountPerPerson: 0.5, unit: 'st' },
      { name: 'Volkoren couscous', amountPerPerson: 70, unit: 'g' },
      { name: 'Tahini', amountPerPerson: 0.5, unit: 'el' },
    ],
  },
  {
    id: 'kip-spinazie-zoeteaardappel',
    title: 'Kip, spinazie & zoete aardappel',
    subtitle: 'Gebalanceerde klassieker voor het hele gezin.',
    minutes: 28,
    bioTags: ['Bio', 'Familie', 'Balans'],
    ingredients: [
      { name: 'Kipdijfilet', amountPerPerson: 140, unit: 'g' },
      { name: 'Zoete aardappel', amountPerPerson: 250, unit: 'g' },
      { name: 'Spinazie', amountPerPerson: 100, unit: 'g' },
      { name: 'Knoflook', amountPerPerson: 0.5, unit: 'teen' },
      { name: 'Yoghurt', amountPerPerson: 50, unit: 'g' },
    ],
  },
];
