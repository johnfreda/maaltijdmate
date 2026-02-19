// Local recipe data - will be replaced by Supabase queries later
// This mirrors the seed.sql data structure

export interface Ingredient {
  id: string;
  name_nl: string;
  name_en: string;
  category: string;
  unit: string;
  lidl_name?: string;
  lidl_price?: number;
  lidl_unit_size?: string;
  is_common?: boolean;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  amount: number;
  unit: string;
  notes_nl?: string;
  notes_en?: string;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  title_nl: string;
  title_en: string;
  description_nl: string;
  description_en: string;
  prep_time: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image_url?: string;
  emoji: string;
  source_name?: string;
  tags: string[];
  steps_nl: string[];
  steps_en: string[];
  ingredients: RecipeIngredient[];
}

// Ingredient database
const ingredients: Record<string, Ingredient> = {
  aubergine: { id: '1', name_nl: 'Aubergine', name_en: 'Eggplant', category: 'produce', unit: 'stuk', lidl_name: 'Aubergine', lidl_price: 0.99, lidl_unit_size: '1 stuk' },
  tomaten: { id: '2', name_nl: 'Tomaten (tros)', name_en: 'Tomatoes (vine)', category: 'produce', unit: 'g', lidl_name: 'Trostomaten', lidl_price: 1.49, lidl_unit_size: '500g' },
  komkommer: { id: '3', name_nl: 'Komkommer', name_en: 'Cucumber', category: 'produce', unit: 'stuk', lidl_name: 'Komkommer', lidl_price: 0.59, lidl_unit_size: '1 stuk' },
  rode_ui: { id: '4', name_nl: 'Rode ui', name_en: 'Red onion', category: 'produce', unit: 'stuk', lidl_name: 'Rode uien', lidl_price: 0.99, lidl_unit_size: 'net 500g' },
  ui: { id: '5', name_nl: 'Ui (geel)', name_en: 'Onion (yellow)', category: 'produce', unit: 'stuk', lidl_name: 'Uien', lidl_price: 0.79, lidl_unit_size: 'net 1kg' },
  knoflook: { id: '6', name_nl: 'Knoflook', name_en: 'Garlic', category: 'produce', unit: 'teen', lidl_name: 'Knoflook', lidl_price: 0.49, lidl_unit_size: '3 stuks' },
  paprika: { id: '7', name_nl: 'Paprika rood', name_en: 'Red bell pepper', category: 'produce', unit: 'stuk', lidl_name: 'Paprika rood', lidl_price: 0.79, lidl_unit_size: '1 stuk' },
  spinazie: { id: '8', name_nl: 'Spinazie', name_en: 'Spinach', category: 'produce', unit: 'g', lidl_name: 'Verse spinazie', lidl_price: 0.99, lidl_unit_size: '250g' },
  courgette: { id: '11', name_nl: 'Courgette', name_en: 'Zucchini', category: 'produce', unit: 'stuk', lidl_name: 'Courgette', lidl_price: 0.79, lidl_unit_size: '1 stuk' },
  citroen: { id: '12', name_nl: 'Citroen', name_en: 'Lemon', category: 'produce', unit: 'stuk', lidl_name: 'Citroen', lidl_price: 0.39, lidl_unit_size: '1 stuk' },
  avocado: { id: '13', name_nl: 'Avocado', name_en: 'Avocado', category: 'produce', unit: 'stuk', lidl_name: 'Avocado', lidl_price: 0.89, lidl_unit_size: '1 stuk' },
  broccoli: { id: '14', name_nl: 'Broccoli', name_en: 'Broccoli', category: 'produce', unit: 'stuk', lidl_name: 'Broccoli', lidl_price: 0.99, lidl_unit_size: '1 stuk' },
  champignons: { id: '15', name_nl: 'Champignons', name_en: 'Mushrooms', category: 'produce', unit: 'g', lidl_name: 'Champignons', lidl_price: 1.19, lidl_unit_size: '250g' },
  sla: { id: '16', name_nl: 'Sla (ijsberg)', name_en: 'Lettuce (iceberg)', category: 'produce', unit: 'stuk', lidl_name: 'IJsbergsla', lidl_price: 0.79, lidl_unit_size: '1 stuk' },
  peterselie: { id: '17', name_nl: 'Peterselie (plat)', name_en: 'Parsley (flat)', category: 'produce', unit: 'bos', lidl_name: 'Peterselie', lidl_price: 0.59, lidl_unit_size: '1 bos' },
  koriander: { id: '18', name_nl: 'Koriander', name_en: 'Cilantro', category: 'produce', unit: 'bos', lidl_name: 'Koriander', lidl_price: 0.59, lidl_unit_size: '1 bos' },
  limoen: { id: '20', name_nl: 'Limoen', name_en: 'Lime', category: 'produce', unit: 'stuk', lidl_name: 'Limoen', lidl_price: 0.29, lidl_unit_size: '1 stuk' },
  aardappelen: { id: '10', name_nl: 'Aardappelen', name_en: 'Potatoes', category: 'produce', unit: 'g', lidl_name: 'Kruimige aardappelen', lidl_price: 1.29, lidl_unit_size: '2kg' },
  eieren: { id: 'e1', name_nl: 'Eieren', name_en: 'Eggs', category: 'dairy', unit: 'stuk', lidl_name: 'Scharreleieren 10st', lidl_price: 1.99, lidl_unit_size: '10 stuks' },
  kaas: { id: 'e3', name_nl: 'Geraspte kaas', name_en: 'Shredded cheese', category: 'dairy', unit: 'g', lidl_name: 'Geraspte jonge kaas', lidl_price: 1.49, lidl_unit_size: '200g' },
  boter: { id: 'e4', name_nl: 'Roomboter', name_en: 'Butter', category: 'dairy', unit: 'g', lidl_name: 'Roomboter ongezouten', lidl_price: 1.79, lidl_unit_size: '250g' },
  creme_fraiche: { id: 'e5', name_nl: 'Crème fraîche', name_en: 'Crème fraîche', category: 'dairy', unit: 'ml', lidl_name: 'Crème fraîche', lidl_price: 0.89, lidl_unit_size: '200ml' },
  feta: { id: 'e6', name_nl: 'Feta', name_en: 'Feta cheese', category: 'dairy', unit: 'g', lidl_name: 'Feta', lidl_price: 1.49, lidl_unit_size: '200g' },
  yoghurt: { id: 'e7', name_nl: 'Yoghurt (Grieks)', name_en: 'Greek yogurt', category: 'dairy', unit: 'g', lidl_name: 'Griekse yoghurt', lidl_price: 1.29, lidl_unit_size: '500g' },
  parmezaan: { id: 'e8', name_nl: 'Parmezaanse kaas', name_en: 'Parmesan cheese', category: 'dairy', unit: 'g', lidl_name: 'Parmigiano Reggiano', lidl_price: 2.49, lidl_unit_size: '100g' },
  melk: { id: 'e2', name_nl: 'Melk', name_en: 'Milk', category: 'dairy', unit: 'ml', lidl_name: 'Halfvolle melk', lidl_price: 1.09, lidl_unit_size: '1l' },
  kipfilet: { id: 'm1', name_nl: 'Kipfilet', name_en: 'Chicken breast', category: 'meat', unit: 'g', lidl_name: 'Kipfilet', lidl_price: 4.99, lidl_unit_size: '500g' },
  gehakt: { id: 'm2', name_nl: 'Gehakt (half-om-half)', name_en: 'Ground beef/pork', category: 'meat', unit: 'g', lidl_name: 'Half-om-half gehakt', lidl_price: 3.49, lidl_unit_size: '500g' },
  spekblokjes: { id: 'm3', name_nl: 'Spekblokjes', name_en: 'Bacon bits', category: 'meat', unit: 'g', lidl_name: 'Spekblokjes', lidl_price: 1.99, lidl_unit_size: '150g' },
  garnalen: { id: 'm4', name_nl: 'Garnalen', name_en: 'Shrimp', category: 'meat', unit: 'g', lidl_name: 'Garnalen', lidl_price: 3.99, lidl_unit_size: '200g' },
  olijfolie: { id: 'p1', name_nl: 'Olijfolie', name_en: 'Olive oil', category: 'pantry', unit: 'el', lidl_name: 'Olijfolie extra vierge', lidl_price: 3.49, lidl_unit_size: '500ml', is_common: true },
  spaghetti: { id: 'p2', name_nl: 'Spaghetti', name_en: 'Spaghetti', category: 'pantry', unit: 'g', lidl_name: 'Spaghetti', lidl_price: 0.69, lidl_unit_size: '500g' },
  rijst: { id: 'p3', name_nl: 'Rijst (basmati)', name_en: 'Rice (basmati)', category: 'pantry', unit: 'g', lidl_name: 'Basmatirijst', lidl_price: 1.99, lidl_unit_size: '1kg' },
  penne: { id: 'p4', name_nl: 'Penne', name_en: 'Penne', category: 'pantry', unit: 'g', lidl_name: 'Penne', lidl_price: 0.69, lidl_unit_size: '500g' },
  noedels: { id: 'p5', name_nl: 'Noedels (mie)', name_en: 'Noodles (egg)', category: 'pantry', unit: 'g', lidl_name: 'Mie noedels', lidl_price: 0.99, lidl_unit_size: '250g' },
  pita: { id: 'p6', name_nl: 'Pita broodjes', name_en: 'Pita bread', category: 'bakery', unit: 'stuk', lidl_name: 'Pita broodjes', lidl_price: 0.99, lidl_unit_size: '6 stuks' },
  kokosmelk: { id: 'p7', name_nl: 'Kokosmelk', name_en: 'Coconut milk', category: 'canned', unit: 'ml', lidl_name: 'Kokosmelk', lidl_price: 0.99, lidl_unit_size: '400ml' },
  tomatenblokjes: { id: 'p8', name_nl: 'Tomatenblokjes (blik)', name_en: 'Diced tomatoes (can)', category: 'canned', unit: 'ml', lidl_name: 'Tomatenblokjes', lidl_price: 0.59, lidl_unit_size: '400g' },
  tomatenpuree: { id: 'p9', name_nl: 'Tomatenpuree', name_en: 'Tomato paste', category: 'canned', unit: 'el', lidl_name: 'Tomatenpuree', lidl_price: 0.49, lidl_unit_size: '200g', is_common: true },
  hummus: { id: 'p10', name_nl: 'Hummus', name_en: 'Hummus', category: 'pantry', unit: 'g', lidl_name: 'Hummus naturel', lidl_price: 1.29, lidl_unit_size: '200g' },
  tahini: { id: 'p11', name_nl: 'Tahini', name_en: 'Tahini', category: 'pantry', unit: 'el', lidl_name: 'Tahin sesampasta', lidl_price: 2.49, lidl_unit_size: '300g' },
  sojasaus: { id: 'p12', name_nl: 'Sojasaus', name_en: 'Soy sauce', category: 'pantry', unit: 'el', lidl_name: 'Sojasaus', lidl_price: 1.29, lidl_unit_size: '250ml', is_common: true },
  vissaus: { id: 'p13', name_nl: 'Vissaus', name_en: 'Fish sauce', category: 'pantry', unit: 'el', lidl_name: 'Vissaus', lidl_price: 1.49, lidl_unit_size: '200ml', is_common: true },
  pindakaas: { id: 'p14', name_nl: 'Pindakaas', name_en: 'Peanut butter', category: 'pantry', unit: 'el', lidl_name: 'Pindakaas naturel', lidl_price: 1.79, lidl_unit_size: '350g', is_common: true },
  wraps: { id: 'p15', name_nl: 'Wraps (tortilla)', name_en: 'Tortilla wraps', category: 'bakery', unit: 'stuk', lidl_name: 'Wraps', lidl_price: 1.19, lidl_unit_size: '6 stuks' },
  komijn: { id: 's3', name_nl: 'Komijn (gemalen)', name_en: 'Cumin (ground)', category: 'spices', unit: 'tl', is_common: true },
  paprikapoeder: { id: 's4', name_nl: 'Paprikapoeder', name_en: 'Paprika powder', category: 'spices', unit: 'tl', is_common: true },
  chilivlokken: { id: 's6', name_nl: 'Chilipeper (vlokken)', name_en: 'Chili flakes', category: 'spices', unit: 'tl', is_common: true },
  oregano: { id: 's7', name_nl: 'Oregano (gedroogd)', name_en: 'Oregano (dried)', category: 'spices', unit: 'tl', is_common: true },
  peper: { id: 's2', name_nl: 'Peper', name_en: 'Pepper', category: 'spices', unit: 'snuf', is_common: true },
};

export const recipes: Recipe[] = [
  {
    id: '1',
    title_nl: 'Sabich', title_en: 'Sabich',
    description_nl: 'Israelisch straateten met gebakken aubergine, hardgekookt ei, hummus en tahini in pitabrood',
    description_en: 'Israeli street food with fried eggplant, hard-boiled egg, hummus and tahini in pita bread',
    prep_time: 35, servings: 4, difficulty: 'easy', emoji: '🍆',
    tags: ['vegetarian', 'budget'], source_name: 'Traditioneel',
    steps_nl: ['Snijd de aubergine in plakken van 1cm, bestrooi met zout en laat 15 minuten rusten', 'Kook de eieren hard (10 minuten), schrik af en pel', 'Bak de aubergineplakken goudbruin in olijfolie (3-4 min per kant)', 'Snijd tomaat, komkommer en rode ui in kleine blokjes voor Israelische salade', 'Meng de salade met fijngesneden peterselie, citroensap en olijfolie', 'Verwarm de pitabroodjes', 'Bouw de sabich: hummus in de pita, aubergine, ei in plakjes, salade, tahini erover'],
    steps_en: ['Slice eggplant into 1cm rounds, sprinkle with salt and rest 15 minutes', 'Hard-boil eggs (10 minutes), shock in cold water and peel', 'Fry eggplant slices golden brown in olive oil (3-4 min per side)', 'Dice tomato, cucumber and red onion for Israeli salad', 'Mix salad with chopped parsley, lemon juice and olive oil', 'Warm the pita breads', 'Build the sabich: hummus in pita, eggplant, sliced egg, salad, drizzle tahini'],
    ingredients: [
      { ingredient: ingredients.aubergine, amount: 2, unit: 'stuk' },
      { ingredient: ingredients.eieren, amount: 4, unit: 'stuk', notes_nl: 'hardgekookt', notes_en: 'hard-boiled' },
      { ingredient: ingredients.tomaten, amount: 200, unit: 'g' },
      { ingredient: ingredients.komkommer, amount: 1, unit: 'stuk' },
      { ingredient: ingredients.rode_ui, amount: 1, unit: 'stuk' },
      { ingredient: ingredients.peterselie, amount: 1, unit: 'bos', notes_nl: 'fijngesneden', notes_en: 'finely chopped' },
      { ingredient: ingredients.citroen, amount: 1, unit: 'stuk', notes_nl: 'uitgeperst', notes_en: 'juiced' },
      { ingredient: ingredients.pita, amount: 4, unit: 'stuk' },
      { ingredient: ingredients.hummus, amount: 150, unit: 'g' },
      { ingredient: ingredients.tahini, amount: 3, unit: 'el' },
      { ingredient: ingredients.olijfolie, amount: 4, unit: 'el', notes_nl: 'om in te bakken', notes_en: 'for frying' },
    ],
  },
  {
    id: '2',
    title_nl: 'Shakshuka', title_en: 'Shakshuka',
    description_nl: 'Gepocheerde eieren in kruidige tomatensaus - perfect voor lunch of avondeten',
    description_en: 'Poached eggs in spicy tomato sauce - perfect for lunch or dinner',
    prep_time: 30, servings: 3, difficulty: 'easy', emoji: '🍳',
    tags: ['vegetarian', 'budget', 'quick'], source_name: 'Traditioneel',
    steps_nl: ['Verhit olijfolie in een diepe koekenpan, bak de ui en paprika 5 min', 'Voeg knoflook, komijn, paprikapoeder en chilivlokken toe, bak 1 min mee', 'Giet de tomatenblokjes erbij, voeg tomatenpuree toe en laat 10 min inkoken', 'Maak kuiltjes in de saus en breek de eieren erin', 'Deksel erop, laat 5-8 min zachtjes koken tot de eieren gaar zijn', 'Bestrooi met peterselie en serveer met brood'],
    steps_en: ['Heat olive oil in a deep pan, sauté onion and pepper for 5 min', 'Add garlic, cumin, paprika and chili flakes, cook 1 min', 'Pour in diced tomatoes, add tomato paste and simmer 10 min', 'Make wells in the sauce and crack eggs into them', 'Cover and cook gently 5-8 min until eggs are set', 'Sprinkle with parsley and serve with bread'],
    ingredients: [
      { ingredient: ingredients.ui, amount: 1, unit: 'stuk', notes_nl: 'gesnipperd', notes_en: 'diced' },
      { ingredient: ingredients.paprika, amount: 1, unit: 'stuk', notes_nl: 'in blokjes', notes_en: 'diced' },
      { ingredient: ingredients.knoflook, amount: 3, unit: 'teen', notes_nl: 'fijngehakt', notes_en: 'minced' },
      { ingredient: ingredients.tomatenblokjes, amount: 400, unit: 'ml' },
      { ingredient: ingredients.tomatenpuree, amount: 1, unit: 'el' },
      { ingredient: ingredients.eieren, amount: 4, unit: 'stuk' },
      { ingredient: ingredients.komijn, amount: 1, unit: 'tl' },
      { ingredient: ingredients.paprikapoeder, amount: 1, unit: 'tl' },
      { ingredient: ingredients.chilivlokken, amount: 0.5, unit: 'tl' },
      { ingredient: ingredients.peterselie, amount: 1, unit: 'bos' },
      { ingredient: ingredients.olijfolie, amount: 2, unit: 'el' },
    ],
  },
  {
    id: '3',
    title_nl: 'Pasta Carbonara', title_en: 'Pasta Carbonara',
    description_nl: 'De echte Italiaanse klassieker met spek, ei en Parmezaan - geen room!',
    description_en: 'The real Italian classic with bacon, egg and Parmesan - no cream!',
    prep_time: 20, servings: 4, difficulty: 'medium', emoji: '🍝',
    tags: ['quick'], source_name: 'Traditioneel Italiaans',
    steps_nl: ['Kook de spaghetti volgens de verpakking, bewaar 200ml pastawater', 'Bak de spekblokjes knapperig uit in een droge pan', 'Meng eieren, eigeel, Parmezaan en peper in een kom', 'Giet de pasta af en doe terug in de pan (vuur UIT)', 'Voeg het spek toe, dan het eimengsel en schep snel door', 'Voeg scheutjes pastawater toe tot het romig is', 'Direct serveren met extra Parmezaan en peper'],
    steps_en: ['Cook spaghetti per package instructions, reserve 200ml pasta water', 'Fry bacon bits crispy in a dry pan', 'Mix eggs, egg yolk, Parmesan and pepper in a bowl', 'Drain pasta and return to pan (heat OFF)', 'Add bacon, then egg mixture and toss quickly', 'Add splashes of pasta water until creamy', 'Serve immediately with extra Parmesan and pepper'],
    ingredients: [
      { ingredient: ingredients.spaghetti, amount: 400, unit: 'g' },
      { ingredient: ingredients.spekblokjes, amount: 150, unit: 'g' },
      { ingredient: ingredients.eieren, amount: 3, unit: 'stuk', notes_nl: '+ 1 extra eigeel', notes_en: '+ 1 extra yolk' },
      { ingredient: ingredients.parmezaan, amount: 80, unit: 'g', notes_nl: 'geraspt', notes_en: 'grated' },
      { ingredient: ingredients.peper, amount: 1, unit: 'tl', notes_nl: 'flink wat', notes_en: 'generous amount' },
    ],
  },
  {
    id: '4',
    title_nl: 'Groene Curry met Kip', title_en: 'Green Curry with Chicken',
    description_nl: 'Thaise groene curry met kokosmelk, kip en groenten - lekker met rijst',
    description_en: 'Thai green curry with coconut milk, chicken and vegetables - great with rice',
    prep_time: 30, servings: 4, difficulty: 'easy', emoji: '🍛',
    tags: [], source_name: 'HelloFresh-stijl',
    steps_nl: ['Zet de rijst op volgens de verpakking', 'Snijd de kip in blokjes, de groenten in reepjes', 'Verhit olie in een wok, bak de kip rondom bruin (5 min)', 'Voeg currypasta toe en bak 1 min mee', 'Giet de kokosmelk erbij, breng aan de kook', 'Voeg de groenten toe en laat 8 min sudderen', 'Breng op smaak met vissaus, limoen en basilicum', 'Serveer over de rijst'],
    steps_en: ['Cook rice per package instructions', 'Cut chicken into cubes, vegetables into strips', 'Heat oil in a wok, brown chicken all over (5 min)', 'Add curry paste and cook 1 min', 'Pour in coconut milk, bring to a boil', 'Add vegetables and simmer 8 min', 'Season with fish sauce, lime and basil', 'Serve over rice'],
    ingredients: [
      { ingredient: ingredients.kipfilet, amount: 500, unit: 'g', notes_nl: 'in blokjes', notes_en: 'cubed' },
      { ingredient: ingredients.kokosmelk, amount: 400, unit: 'ml' },
      { ingredient: ingredients.rijst, amount: 300, unit: 'g' },
      { ingredient: ingredients.paprika, amount: 1, unit: 'stuk', notes_nl: 'in reepjes', notes_en: 'sliced' },
      { ingredient: ingredients.courgette, amount: 1, unit: 'stuk', notes_nl: 'in halve maantjes', notes_en: 'half-moons' },
      { ingredient: ingredients.vissaus, amount: 1, unit: 'el' },
      { ingredient: ingredients.limoen, amount: 1, unit: 'stuk', notes_nl: 'uitgeperst', notes_en: 'juiced' },
    ],
  },
  {
    id: '5',
    title_nl: 'Pad Thai', title_en: 'Pad Thai',
    description_nl: 'Thaise roerbaknoedels met garnalen, pinda en limoen',
    description_en: 'Thai stir-fried noodles with shrimp, peanut and lime',
    prep_time: 25, servings: 2, difficulty: 'medium', emoji: '🍜',
    tags: ['quick'], source_name: 'HelloFresh-stijl',
    steps_nl: ['Week de noedels in heet water volgens verpakking', 'Meng sojasaus, vissaus, limoen en suiker voor de saus', 'Verhit olie in een wok, bak de garnalen 2 min, haal eruit', 'Klop de eieren in de wok en roerbak tot net gestold', 'Voeg noedels en saus toe, bak 2 min op hoog vuur', 'Doe de garnalen terug, meng door', 'Serveer met pinda, limoen en koriander'],
    steps_en: ['Soak noodles in hot water per package', 'Mix soy sauce, fish sauce, lime and sugar for the sauce', 'Heat oil in a wok, cook shrimp 2 min, remove', 'Scramble eggs in the wok until just set', 'Add noodles and sauce, stir-fry 2 min on high heat', 'Return shrimp, toss through', 'Serve with peanuts, lime and cilantro'],
    ingredients: [
      { ingredient: ingredients.noedels, amount: 250, unit: 'g' },
      { ingredient: ingredients.garnalen, amount: 200, unit: 'g' },
      { ingredient: ingredients.eieren, amount: 2, unit: 'stuk' },
      { ingredient: ingredients.sojasaus, amount: 2, unit: 'el' },
      { ingredient: ingredients.vissaus, amount: 1, unit: 'el' },
      { ingredient: ingredients.limoen, amount: 1, unit: 'stuk' },
      { ingredient: ingredients.pindakaas, amount: 2, unit: 'el', notes_nl: 'grof gehakt als topping', notes_en: 'roughly chopped for topping' },
      { ingredient: ingredients.koriander, amount: 1, unit: 'bos' },
    ],
  },
  {
    id: '6',
    title_nl: 'Courgette-Feta Ovenschotel', title_en: 'Zucchini Feta Bake',
    description_nl: 'Simpele maar heerlijke ovenschotel met courgette, feta en tomaat',
    description_en: 'Simple but delicious oven bake with zucchini, feta and tomato',
    prep_time: 40, servings: 4, difficulty: 'easy', emoji: '🧀',
    tags: ['vegetarian', 'budget'], source_name: 'HelloFresh-stijl',
    steps_nl: ['Verwarm de oven voor op 200 graden', 'Snijd courgettes in plakken, tomaten in parten', 'Leg alles dakpansgewijs in een ovenschaal', 'Verkruimel de feta erover, besprenkel met olijfolie', 'Bestrooi met oregano, zout en peper', 'Bak 25-30 minuten tot goudbruin en zacht'],
    steps_en: ['Preheat oven to 200C / 400F', 'Slice zucchini into rounds, tomatoes into wedges', 'Layer everything shingled in a baking dish', 'Crumble feta on top, drizzle with olive oil', 'Sprinkle with oregano, salt and pepper', 'Bake 25-30 minutes until golden and tender'],
    ingredients: [
      { ingredient: ingredients.courgette, amount: 3, unit: 'stuk', notes_nl: 'in plakken', notes_en: 'sliced' },
      { ingredient: ingredients.tomaten, amount: 300, unit: 'g', notes_nl: 'in parten', notes_en: 'wedged' },
      { ingredient: ingredients.feta, amount: 200, unit: 'g', notes_nl: 'verkruimeld', notes_en: 'crumbled' },
      { ingredient: ingredients.olijfolie, amount: 3, unit: 'el' },
      { ingredient: ingredients.oregano, amount: 1, unit: 'tl' },
      { ingredient: ingredients.knoflook, amount: 2, unit: 'teen', notes_nl: 'fijngesneden', notes_en: 'sliced' },
    ],
  },
  {
    id: '7',
    title_nl: 'Wraps met Kip en Avocado', title_en: 'Chicken Avocado Wraps',
    description_nl: 'Snelle doordeweekse wraps met gekruide kip, avocado en frisse salade',
    description_en: 'Quick weeknight wraps with spiced chicken, avocado and fresh salad',
    prep_time: 20, servings: 4, difficulty: 'easy', emoji: '🌯',
    tags: ['quick'], source_name: 'HelloFresh-stijl',
    steps_nl: ['Snijd de kipfilet in reepjes, kruid met komijn, paprika, zout en peper', 'Bak de kip goudbruin in olijfolie (6-8 min)', 'Snijd de avocado in plakjes, de tomaat in blokjes', 'Maak een snelle dressing: yoghurt, knoflook, citroensap', 'Verwarm de wraps kort in een droge pan', 'Beleg: dressing, kip, avocado, tomaat, sla'],
    steps_en: ['Slice chicken into strips, season with cumin, paprika, salt and pepper', 'Cook chicken golden in olive oil (6-8 min)', 'Slice avocado, dice tomato', 'Make quick dressing: yogurt, garlic, lemon juice', 'Warm wraps briefly in a dry pan', 'Assemble: dressing, chicken, avocado, tomato, lettuce'],
    ingredients: [
      { ingredient: ingredients.kipfilet, amount: 400, unit: 'g', notes_nl: 'in reepjes', notes_en: 'sliced' },
      { ingredient: ingredients.wraps, amount: 4, unit: 'stuk' },
      { ingredient: ingredients.avocado, amount: 2, unit: 'stuk' },
      { ingredient: ingredients.tomaten, amount: 150, unit: 'g' },
      { ingredient: ingredients.sla, amount: 0.5, unit: 'stuk' },
      { ingredient: ingredients.yoghurt, amount: 100, unit: 'g', notes_nl: 'voor dressing', notes_en: 'for dressing' },
      { ingredient: ingredients.knoflook, amount: 1, unit: 'teen', notes_nl: 'geperst', notes_en: 'pressed' },
      { ingredient: ingredients.citroen, amount: 0.5, unit: 'stuk' },
      { ingredient: ingredients.komijn, amount: 1, unit: 'tl' },
      { ingredient: ingredients.paprikapoeder, amount: 1, unit: 'tl' },
    ],
  },
  {
    id: '8',
    title_nl: 'One-Pot Pasta Pomodoro', title_en: 'One-Pot Pasta Pomodoro',
    description_nl: 'Alles in een pan - pasta in romige tomatensaus met verse spinazie',
    description_en: 'Everything in one pot - pasta in creamy tomato sauce with fresh spinach',
    prep_time: 25, servings: 4, difficulty: 'easy', emoji: '🍅',
    tags: ['vegetarian', 'quick', 'budget'], source_name: 'HelloFresh-stijl',
    steps_nl: ['Fruit de ui en knoflook in olijfolie (3 min)', 'Voeg tomatenblokjes, tomatenpuree en 400ml water toe', 'Breng aan de kook, voeg de penne toe', 'Kook 12-14 min met deksel half erop, roer regelmatig', 'Voeg de spinazie toe in de laatste 2 minuten', 'Roer de crème fraîche erdoor, breng op smaak', 'Serveer met Parmezaan'],
    steps_en: ['Sauté onion and garlic in olive oil (3 min)', 'Add diced tomatoes, tomato paste and 400ml water', 'Bring to boil, add penne', 'Cook 12-14 min with lid half on, stir regularly', 'Add spinach in the last 2 minutes', 'Stir in crème fraîche, season to taste', 'Serve with Parmesan'],
    ingredients: [
      { ingredient: ingredients.penne, amount: 400, unit: 'g' },
      { ingredient: ingredients.tomatenblokjes, amount: 400, unit: 'ml' },
      { ingredient: ingredients.tomatenpuree, amount: 2, unit: 'el' },
      { ingredient: ingredients.ui, amount: 1, unit: 'stuk' },
      { ingredient: ingredients.knoflook, amount: 2, unit: 'teen' },
      { ingredient: ingredients.spinazie, amount: 150, unit: 'g' },
      { ingredient: ingredients.creme_fraiche, amount: 100, unit: 'ml' },
      { ingredient: ingredients.parmezaan, amount: 40, unit: 'g', notes_nl: 'geraspt, voor erbij', notes_en: 'grated, for serving' },
    ],
  },
  {
    id: '9',
    title_nl: 'Aardappel-Broccoli Schotel', title_en: 'Potato Broccoli Bake',
    description_nl: 'Comfortfood uit de oven: aardappel en broccoli in kaassaus',
    description_en: 'Comfort food from the oven: potato and broccoli in cheese sauce',
    prep_time: 45, servings: 4, difficulty: 'easy', emoji: '🥔',
    tags: ['vegetarian', 'budget'], source_name: 'Huisgemaakt',
    steps_nl: ['Verwarm de oven voor op 200 graden', 'Kook de aardappelen in plakken 8 min, voeg broccoli toe voor laatste 3 min', 'Maak kaassaus: smelt boter, roer bloem erdoor, voeg melk toe al roerend', 'Voeg geraspte kaas toe aan de saus en breng op smaak', 'Leg aardappelen en broccoli in ovenschaal, giet kaassaus erover', 'Bestrooi met extra kaas, bak 20 min tot goudbruin'],
    steps_en: ['Preheat oven to 200C / 400F', 'Boil sliced potatoes 8 min, add broccoli for last 3 min', 'Make cheese sauce: melt butter, stir in flour, gradually add milk', 'Add shredded cheese to sauce and season', 'Layer potatoes and broccoli in baking dish, pour cheese sauce over', 'Top with extra cheese, bake 20 min until golden'],
    ingredients: [
      { ingredient: ingredients.aardappelen, amount: 800, unit: 'g', notes_nl: 'in plakken', notes_en: 'sliced' },
      { ingredient: ingredients.broccoli, amount: 1, unit: 'stuk', notes_nl: 'in roosjes', notes_en: 'in florets' },
      { ingredient: ingredients.kaas, amount: 150, unit: 'g' },
      { ingredient: ingredients.boter, amount: 30, unit: 'g' },
      { ingredient: ingredients.melk, amount: 300, unit: 'ml' },
    ],
  },
  {
    id: '10',
    title_nl: 'Champignon Risotto', title_en: 'Mushroom Risotto',
    description_nl: 'Romige risotto met gebakken champignons en Parmezaan',
    description_en: 'Creamy risotto with sautéed mushrooms and Parmesan',
    prep_time: 35, servings: 4, difficulty: 'medium', emoji: '🍄',
    tags: ['vegetarian'], source_name: 'HelloFresh-stijl',
    steps_nl: ['Verwarm 1L bouillon en houd warm op laag vuur', 'Bak de champignons bruin in boter (5 min), haal eruit', 'Fruit de ui in olijfolie, voeg de rijst toe en bak 2 min mee', 'Voeg scheppen bouillon toe, steeds roerend, tot de rijst gaar is (18-20 min)', 'Roer de champignons, boter en Parmezaan erdoor', 'Breng op smaak met zout, peper en eventueel citroen'],
    steps_en: ['Heat 1L stock and keep warm on low heat', 'Brown mushrooms in butter (5 min), set aside', 'Sauté onion in olive oil, add rice and toast 2 min', 'Add ladles of stock, stirring constantly, until rice is done (18-20 min)', 'Stir in mushrooms, butter and Parmesan', 'Season with salt, pepper and optional lemon'],
    ingredients: [
      { ingredient: ingredients.champignons, amount: 400, unit: 'g', notes_nl: 'in plakken', notes_en: 'sliced' },
      { ingredient: ingredients.rijst, amount: 320, unit: 'g', notes_nl: 'risottorijst', notes_en: 'risotto rice' },
      { ingredient: ingredients.ui, amount: 1, unit: 'stuk', notes_nl: 'fijngesnipperd', notes_en: 'finely diced' },
      { ingredient: ingredients.parmezaan, amount: 60, unit: 'g', notes_nl: 'geraspt', notes_en: 'grated' },
      { ingredient: ingredients.boter, amount: 40, unit: 'g' },
      { ingredient: ingredients.olijfolie, amount: 2, unit: 'el' },
    ],
  },
];

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find(r => r.id === id);
}

export function estimateCost(recipe: Recipe): number {
  return recipe.ingredients.reduce((total, ri) => {
    if (ri.ingredient.lidl_price && !ri.ingredient.is_common) {
      return total + ri.ingredient.lidl_price;
    }
    return total;
  }, 0);
}
