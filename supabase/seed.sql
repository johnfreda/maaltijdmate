-- MaaltijdMate Seed Data: Ingredients + Recipes

-- ============================================
-- INGREDIENTS (mapped to Lidl where possible)
-- ============================================

-- Groente & Fruit
insert into ingredients (id, name_nl, name_en, category, unit, lidl_name, lidl_price, lidl_unit_size) values
  ('a0000001-0000-0000-0000-000000000001', 'Aubergine', 'Eggplant', 'produce', 'stuk', 'Aubergine', 0.99, '1 stuk'),
  ('a0000001-0000-0000-0000-000000000002', 'Tomaten (tros)', 'Tomatoes (vine)', 'produce', 'g', 'Trostomaten', 1.49, '500g'),
  ('a0000001-0000-0000-0000-000000000003', 'Komkommer', 'Cucumber', 'produce', 'stuk', 'Komkommer', 0.59, '1 stuk'),
  ('a0000001-0000-0000-0000-000000000004', 'Rode ui', 'Red onion', 'produce', 'stuk', 'Rode uien', 0.99, 'net 500g'),
  ('a0000001-0000-0000-0000-000000000005', 'Ui (geel)', 'Onion (yellow)', 'produce', 'stuk', 'Uien', 0.79, 'net 1kg'),
  ('a0000001-0000-0000-0000-000000000006', 'Knoflook', 'Garlic', 'produce', 'teen', 'Knoflook', 0.49, '3 stuks'),
  ('a0000001-0000-0000-0000-000000000007', 'Paprika rood', 'Red bell pepper', 'produce', 'stuk', 'Paprika rood', 0.79, '1 stuk'),
  ('a0000001-0000-0000-0000-000000000008', 'Spinazie', 'Spinach', 'produce', 'g', 'Verse spinazie', 0.99, '250g'),
  ('a0000001-0000-0000-0000-000000000009', 'Wortel', 'Carrot', 'produce', 'stuk', 'Wortelen', 0.69, 'bos'),
  ('a0000001-0000-0000-0000-000000000010', 'Aardappelen', 'Potatoes', 'produce', 'g', 'Kruimige aardappelen', 1.29, '2kg'),
  ('a0000001-0000-0000-0000-000000000011', 'Courgette', 'Zucchini', 'produce', 'stuk', 'Courgette', 0.79, '1 stuk'),
  ('a0000001-0000-0000-0000-000000000012', 'Citroen', 'Lemon', 'produce', 'stuk', 'Citroen', 0.39, '1 stuk'),
  ('a0000001-0000-0000-0000-000000000013', 'Avocado', 'Avocado', 'produce', 'stuk', 'Avocado', 0.89, '1 stuk'),
  ('a0000001-0000-0000-0000-000000000014', 'Broccoli', 'Broccoli', 'produce', 'stuk', 'Broccoli', 0.99, '1 stuk'),
  ('a0000001-0000-0000-0000-000000000015', 'Champignons', 'Mushrooms', 'produce', 'g', 'Champignons', 1.19, '250g'),
  ('a0000001-0000-0000-0000-000000000016', 'Sla (ijsberg)', 'Lettuce (iceberg)', 'produce', 'stuk', 'IJsbergsla', 0.79, '1 stuk'),
  ('a0000001-0000-0000-0000-000000000017', 'Peterselie (plat)', 'Parsley (flat)', 'produce', 'bos', 'Peterselie', 0.59, '1 bos'),
  ('a0000001-0000-0000-0000-000000000018', 'Koriander', 'Cilantro', 'produce', 'bos', 'Koriander', 0.59, '1 bos'),
  ('a0000001-0000-0000-0000-000000000019', 'Gember', 'Ginger', 'produce', 'stuk', 'Gember', 0.49, '1 stuk'),
  ('a0000001-0000-0000-0000-000000000020', 'Limoen', 'Lime', 'produce', 'stuk', 'Limoen', 0.29, '1 stuk');

-- Zuivel & Eieren
insert into ingredients (id, name_nl, name_en, category, unit, lidl_name, lidl_price, lidl_unit_size) values
  ('a0000002-0000-0000-0000-000000000001', 'Eieren', 'Eggs', 'dairy', 'stuk', 'Scharreleieren 10st', 1.99, '10 stuks'),
  ('a0000002-0000-0000-0000-000000000002', 'Melk', 'Milk', 'dairy', 'ml', 'Halfvolle melk', 1.09, '1l'),
  ('a0000002-0000-0000-0000-000000000003', 'Geraspte kaas', 'Shredded cheese', 'dairy', 'g', 'Geraspte jonge kaas', 1.49, '200g'),
  ('a0000002-0000-0000-0000-000000000004', 'Roomboter', 'Butter', 'dairy', 'g', 'Roomboter ongezouten', 1.79, '250g'),
  ('a0000002-0000-0000-0000-000000000005', 'Crème fraîche', 'Crème fraîche', 'dairy', 'ml', 'Crème fraîche', 0.89, '200ml'),
  ('a0000002-0000-0000-0000-000000000006', 'Feta', 'Feta cheese', 'dairy', 'g', 'Feta', 1.49, '200g'),
  ('a0000002-0000-0000-0000-000000000007', 'Yoghurt (Grieks)', 'Greek yogurt', 'dairy', 'g', 'Griekse yoghurt', 1.29, '500g'),
  ('a0000002-0000-0000-0000-000000000008', 'Parmezaanse kaas', 'Parmesan cheese', 'dairy', 'g', 'Parmigiano Reggiano', 2.49, '100g'),
  ('a0000002-0000-0000-0000-000000000009', 'Mozzarella', 'Mozzarella', 'dairy', 'g', 'Mozzarella', 0.89, '125g'),
  ('a0000002-0000-0000-0000-000000000010', 'Slagroom', 'Heavy cream', 'dairy', 'ml', 'Slagroom', 0.99, '250ml');

-- Vlees & Vis
insert into ingredients (id, name_nl, name_en, category, unit, lidl_name, lidl_price, lidl_unit_size) values
  ('a0000003-0000-0000-0000-000000000001', 'Kipfilet', 'Chicken breast', 'meat', 'g', 'Kipfilet', 4.99, '500g'),
  ('a0000003-0000-0000-0000-000000000002', 'Gehakt (half-om-half)', 'Ground beef/pork', 'meat', 'g', 'Half-om-half gehakt', 3.49, '500g'),
  ('a0000003-0000-0000-0000-000000000003', 'Spekblokjes', 'Bacon bits', 'meat', 'g', 'Spekblokjes', 1.99, '150g'),
  ('a0000003-0000-0000-0000-000000000004', 'Garnalen', 'Shrimp', 'meat', 'g', 'Garnalen', 3.99, '200g'),
  ('a0000003-0000-0000-0000-000000000005', 'Zalm', 'Salmon', 'meat', 'g', 'Zalmfilet', 4.99, '250g');

-- Voorraadkast
insert into ingredients (id, name_nl, name_en, category, unit, lidl_name, lidl_price, lidl_unit_size, is_common) values
  ('a0000004-0000-0000-0000-000000000001', 'Olijfolie', 'Olive oil', 'pantry', 'el', 'Olijfolie extra vierge', 3.49, '500ml', true),
  ('a0000004-0000-0000-0000-000000000002', 'Spaghetti', 'Spaghetti', 'pantry', 'g', 'Spaghetti', 0.69, '500g', false),
  ('a0000004-0000-0000-0000-000000000003', 'Rijst (basmati)', 'Rice (basmati)', 'pantry', 'g', 'Basmatirijst', 1.99, '1kg', false),
  ('a0000004-0000-0000-0000-000000000004', 'Penne', 'Penne', 'pantry', 'g', 'Penne', 0.69, '500g', false),
  ('a0000004-0000-0000-0000-000000000005', 'Noedels (mie)', 'Noodles (egg)', 'pantry', 'g', 'Mie noedels', 0.99, '250g', false),
  ('a0000004-0000-0000-0000-000000000006', 'Pita broodjes', 'Pita bread', 'bakery', 'stuk', 'Pita broodjes', 0.99, '6 stuks', false),
  ('a0000004-0000-0000-0000-000000000007', 'Kokosmelk', 'Coconut milk', 'canned', 'ml', 'Kokosmelk', 0.99, '400ml', false),
  ('a0000004-0000-0000-0000-000000000008', 'Tomatenblokjes (blik)', 'Diced tomatoes (can)', 'canned', 'ml', 'Tomatenblokjes', 0.59, '400g', false),
  ('a0000004-0000-0000-0000-000000000009', 'Tomatenpuree', 'Tomato paste', 'canned', 'el', 'Tomatenpuree', 0.49, '200g', true),
  ('a0000004-0000-0000-0000-000000000010', 'Hummus', 'Hummus', 'pantry', 'g', 'Hummus naturel', 1.29, '200g', false),
  ('a0000004-0000-0000-0000-000000000011', 'Tahini', 'Tahini', 'pantry', 'el', 'Tahin sesampasta', 2.49, '300g', false),
  ('a0000004-0000-0000-0000-000000000012', 'Sojasaus', 'Soy sauce', 'pantry', 'el', 'Sojasaus', 1.29, '250ml', true),
  ('a0000004-0000-0000-0000-000000000013', 'Vissaus', 'Fish sauce', 'pantry', 'el', 'Vissaus', 1.49, '200ml', true),
  ('a0000004-0000-0000-0000-000000000014', 'Pindakaas', 'Peanut butter', 'pantry', 'el', 'Pindakaas naturel', 1.79, '350g', true),
  ('a0000004-0000-0000-0000-000000000015', 'Wraps (tortilla)', 'Tortilla wraps', 'bakery', 'stuk', 'Wraps', 1.19, '6 stuks', false);

-- Kruiden & Specerijen
insert into ingredients (id, name_nl, name_en, category, unit, lidl_name, lidl_price, lidl_unit_size, is_common) values
  ('a0000005-0000-0000-0000-000000000001', 'Zout', 'Salt', 'spices', 'snuf', null, null, null, true),
  ('a0000005-0000-0000-0000-000000000002', 'Peper', 'Pepper', 'spices', 'snuf', null, null, null, true),
  ('a0000005-0000-0000-0000-000000000003', 'Komijn (gemalen)', 'Cumin (ground)', 'spices', 'tl', 'Komijn gemalen', 0.99, '40g', true),
  ('a0000005-0000-0000-0000-000000000004', 'Paprikapoeder', 'Paprika powder', 'spices', 'tl', 'Paprikapoeder', 0.79, '45g', true),
  ('a0000005-0000-0000-0000-000000000005', 'Kurkuma', 'Turmeric', 'spices', 'tl', 'Kurkuma', 0.99, '40g', true),
  ('a0000005-0000-0000-0000-000000000006', 'Chilipeper (vlokken)', 'Chili flakes', 'spices', 'tl', 'Chilivlokken', 0.99, '35g', true),
  ('a0000005-0000-0000-0000-000000000007', 'Oregano (gedroogd)', 'Oregano (dried)', 'spices', 'tl', 'Oregano', 0.79, '15g', true),
  ('a0000005-0000-0000-0000-000000000008', 'Kaneelpoeder', 'Cinnamon', 'spices', 'tl', 'Kaneel gemalen', 0.79, '35g', true);


-- ============================================
-- RECIPES
-- ============================================

-- 1. Sabich
insert into recipes (id, title_nl, title_en, description_nl, description_en, prep_time, servings, difficulty, tags, source_name, steps_nl, steps_en) values (
  'b0000001-0000-0000-0000-000000000001',
  'Sabich', 'Sabich',
  'Israelisch straateten met gebakken aubergine, hardgekookt ei, hummus en tahini in pitabrood',
  'Israeli street food with fried eggplant, hard-boiled egg, hummus and tahini in pita bread',
  35, 4, 'easy', '{"vegetarian", "budget"}', 'Traditioneel',
  '{"Snijd de aubergine in plakken van 1cm, bestrooi met zout en laat 15 minuten rusten", "Kook de eieren hard (10 minuten), schrik af en pel", "Bak de aubergineplakken goudbruin in olijfolie (3-4 min per kant)", "Snijd tomaat, komkommer en rode ui in kleine blokjes voor Israelische salade", "Meng de salade met fijngesneden peterselie, citroensap en olijfolie", "Verwarm de pitabroodjes", "Bouw de sabich: hummus in de pita, aubergine, ei in plakjes, salade, tahini erover"}',
  '{"Slice eggplant into 1cm rounds, sprinkle with salt and rest 15 minutes", "Hard-boil eggs (10 minutes), shock in cold water and peel", "Fry eggplant slices golden brown in olive oil (3-4 min per side)", "Dice tomato, cucumber and red onion for Israeli salad", "Mix salad with chopped parsley, lemon juice and olive oil", "Warm the pita breads", "Build the sabich: hummus in pita, eggplant, sliced egg, salad, drizzle tahini"}'
);

insert into recipe_ingredients (recipe_id, ingredient_id, amount, unit, notes_nl, notes_en) values
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 2, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000001', 'a0000002-0000-0000-0000-000000000001', 4, 'stuk', 'hardgekookt', 'hard-boiled'),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000002', 200, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000003', 1, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000004', 1, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000017', 1, 'bos', 'fijngesneden', 'finely chopped'),
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000012', 1, 'stuk', 'uitgeperst', 'juiced'),
  ('b0000001-0000-0000-0000-000000000001', 'a0000004-0000-0000-0000-000000000006', 4, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000001', 'a0000004-0000-0000-0000-000000000010', 150, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000001', 'a0000004-0000-0000-0000-000000000011', 3, 'el', null, null),
  ('b0000001-0000-0000-0000-000000000001', 'a0000004-0000-0000-0000-000000000001', 4, 'el', 'om in te bakken', 'for frying');

-- 2. Shakshuka
insert into recipes (id, title_nl, title_en, description_nl, description_en, prep_time, servings, difficulty, tags, source_name, steps_nl, steps_en) values (
  'b0000001-0000-0000-0000-000000000002',
  'Shakshuka', 'Shakshuka',
  'Gepocheerde eieren in kruidige tomatensaus - perfect voor lunch of avondeten',
  'Poached eggs in spicy tomato sauce - perfect for lunch or dinner',
  30, 3, 'easy', '{"vegetarian", "budget", "quick"}', 'Traditioneel',
  '{"Verhit olijfolie in een diepe koekenpan, bak de ui en paprika 5 min", "Voeg knoflook, komijn, paprikapoeder en chilivlokken toe, bak 1 min mee", "Giet de tomatenblokjes erbij, voeg tomatenpuree toe en laat 10 min inkoken", "Maak kuiltjes in de saus en breek de eieren erin", "Deksel erop, laat 5-8 min zachtjes koken tot de eieren gaar zijn", "Bestrooi met peterselie en serveer met brood"}',
  '{"Heat olive oil in a deep pan, sauté onion and pepper for 5 min", "Add garlic, cumin, paprika and chili flakes, cook 1 min", "Pour in diced tomatoes, add tomato paste and simmer 10 min", "Make wells in the sauce and crack eggs into them", "Cover and cook gently 5-8 min until eggs are set", "Sprinkle with parsley and serve with bread"}'
);

insert into recipe_ingredients (recipe_id, ingredient_id, amount, unit, notes_nl, notes_en) values
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000005', 1, 'stuk', 'gesnipperd', 'diced'),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000007', 1, 'stuk', 'in blokjes', 'diced'),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000006', 3, 'teen', 'fijngehakt', 'minced'),
  ('b0000001-0000-0000-0000-000000000002', 'a0000004-0000-0000-0000-000000000008', 400, 'ml', null, null),
  ('b0000001-0000-0000-0000-000000000002', 'a0000004-0000-0000-0000-000000000009', 1, 'el', null, null),
  ('b0000001-0000-0000-0000-000000000002', 'a0000002-0000-0000-0000-000000000001', 4, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000002', 'a0000005-0000-0000-0000-000000000003', 1, 'tl', null, null),
  ('b0000001-0000-0000-0000-000000000002', 'a0000005-0000-0000-0000-000000000004', 1, 'tl', null, null),
  ('b0000001-0000-0000-0000-000000000002', 'a0000005-0000-0000-0000-000000000006', 0.5, 'tl', null, null),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000017', 1, 'bos', null, null),
  ('b0000001-0000-0000-0000-000000000002', 'a0000004-0000-0000-0000-000000000001', 2, 'el', null, null);

-- 3. Pasta Carbonara
insert into recipes (id, title_nl, title_en, description_nl, description_en, prep_time, servings, difficulty, tags, source_name, steps_nl, steps_en) values (
  'b0000001-0000-0000-0000-000000000003',
  'Pasta Carbonara', 'Pasta Carbonara',
  'De echte Italiaanse klassieker met spek, ei en Parmezaan - geen room!',
  'The real Italian classic with bacon, egg and Parmesan - no cream!',
  20, 4, 'medium', '{"quick"}', 'Traditioneel Italiaans',
  '{"Kook de spaghetti volgens de verpakking, bewaar 200ml pastawater", "Bak de spekblokjes knapperig uit in een droge pan", "Meng eieren, eigeel, Parmezaan en peper in een kom", "Giet de pasta af en doe terug in de pan (vuur UIT)", "Voeg het spek toe, dan het eimengsel en schep snel door", "Voeg scheutjes pastawater toe tot het romig is", "Direct serveren met extra Parmezaan en peper"}',
  '{"Cook spaghetti per package instructions, reserve 200ml pasta water", "Fry bacon bits crispy in a dry pan", "Mix eggs, egg yolk, Parmesan and pepper in a bowl", "Drain pasta and return to pan (heat OFF)", "Add bacon, then egg mixture and toss quickly", "Add splashes of pasta water until creamy", "Serve immediately with extra Parmesan and pepper"}'
);

insert into recipe_ingredients (recipe_id, ingredient_id, amount, unit, notes_nl, notes_en) values
  ('b0000001-0000-0000-0000-000000000003', 'a0000004-0000-0000-0000-000000000002', 400, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000003', 'a0000003-0000-0000-0000-000000000003', 150, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000003', 'a0000002-0000-0000-0000-000000000001', 3, 'stuk', '+ 1 extra eigeel', '+ 1 extra yolk'),
  ('b0000001-0000-0000-0000-000000000003', 'a0000002-0000-0000-0000-000000000008', 80, 'g', 'geraspt', 'grated'),
  ('b0000001-0000-0000-0000-000000000003', 'a0000005-0000-0000-0000-000000000002', 1, 'tl', 'flink wat', 'generous amount');

-- 4. Groene Curry met Kip
insert into recipes (id, title_nl, title_en, description_nl, description_en, prep_time, servings, difficulty, tags, source_name, steps_nl, steps_en) values (
  'b0000001-0000-0000-0000-000000000004',
  'Groene Curry met Kip', 'Green Curry with Chicken',
  'Thaise groene curry met kokosmelk, kip en groenten - lekker met rijst',
  'Thai green curry with coconut milk, chicken and vegetables - great with rice',
  30, 4, 'easy', '{}', 'HelloFresh-stijl',
  '{"Zet de rijst op volgens de verpakking", "Snijd de kip in blokjes, de groenten in reepjes", "Verhit olie in een wok, bak de kip rondom bruin (5 min)", "Voeg currypasta toe en bak 1 min mee", "Giet de kokosmelk erbij, breng aan de kook", "Voeg de groenten toe en laat 8 min sudderen", "Breng op smaak met vissaus, limoen en basilicum", "Serveer over de rijst"}',
  '{"Cook rice per package instructions", "Cut chicken into cubes, vegetables into strips", "Heat oil in a wok, brown chicken all over (5 min)", "Add curry paste and cook 1 min", "Pour in coconut milk, bring to a boil", "Add vegetables and simmer 8 min", "Season with fish sauce, lime and basil", "Serve over rice"}'
);

insert into recipe_ingredients (recipe_id, ingredient_id, amount, unit, notes_nl, notes_en) values
  ('b0000001-0000-0000-0000-000000000004', 'a0000003-0000-0000-0000-000000000001', 500, 'g', 'in blokjes', 'cubed'),
  ('b0000001-0000-0000-0000-000000000004', 'a0000004-0000-0000-0000-000000000007', 400, 'ml', null, null),
  ('b0000001-0000-0000-0000-000000000004', 'a0000004-0000-0000-0000-000000000003', 300, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000007', 1, 'stuk', 'in reepjes', 'sliced'),
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000011', 1, 'stuk', 'in halve maantjes', 'half-moons'),
  ('b0000001-0000-0000-0000-000000000004', 'a0000004-0000-0000-0000-000000000013', 1, 'el', null, null),
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000020', 1, 'stuk', 'uitgeperst', 'juiced');

-- 5. Pad Thai
insert into recipes (id, title_nl, title_en, description_nl, description_en, prep_time, servings, difficulty, tags, source_name, steps_nl, steps_en) values (
  'b0000001-0000-0000-0000-000000000005',
  'Pad Thai', 'Pad Thai',
  'Thaise roerbaknoedels met garnalen, pinda en limoen',
  'Thai stir-fried noodles with shrimp, peanut and lime',
  25, 2, 'medium', '{"quick"}', 'HelloFresh-stijl',
  '{"Week de noedels in heet water volgens verpakking", "Meng sojasaus, vissaus, limoen en suiker voor de saus", "Verhit olie in een wok, bak de garnalen 2 min, haal eruit", "Klop de eieren in de wok en roerbak tot net gestold", "Voeg noedels en saus toe, bak 2 min op hoog vuur", "Doe de garnalen terug, meng door", "Serveer met pinda, limoen en koriander"}',
  '{"Soak noodles in hot water per package", "Mix soy sauce, fish sauce, lime and sugar for the sauce", "Heat oil in a wok, cook shrimp 2 min, remove", "Scramble eggs in the wok until just set", "Add noodles and sauce, stir-fry 2 min on high heat", "Return shrimp, toss through", "Serve with peanuts, lime and cilantro"}'
);

insert into recipe_ingredients (recipe_id, ingredient_id, amount, unit, notes_nl, notes_en) values
  ('b0000001-0000-0000-0000-000000000005', 'a0000004-0000-0000-0000-000000000005', 250, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000005', 'a0000003-0000-0000-0000-000000000004', 200, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000005', 'a0000002-0000-0000-0000-000000000001', 2, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000005', 'a0000004-0000-0000-0000-000000000012', 2, 'el', null, null),
  ('b0000001-0000-0000-0000-000000000005', 'a0000004-0000-0000-0000-000000000013', 1, 'el', null, null),
  ('b0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000020', 1, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000005', 'a0000004-0000-0000-0000-000000000014', 2, 'el', 'grof gehakt als topping', 'roughly chopped for topping'),
  ('b0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000018', 1, 'bos', null, null);

-- 6. Courgette-feta ovenschotel
insert into recipes (id, title_nl, title_en, description_nl, description_en, prep_time, servings, difficulty, tags, source_name, steps_nl, steps_en) values (
  'b0000001-0000-0000-0000-000000000006',
  'Courgette-Feta Ovenschotel', 'Zucchini Feta Bake',
  'Simpele maar heerlijke ovenschotel met courgette, feta en tomaat',
  'Simple but delicious oven bake with zucchini, feta and tomato',
  40, 4, 'easy', '{"vegetarian", "budget"}', 'HelloFresh-stijl',
  '{"Verwarm de oven voor op 200 graden", "Snijd courgettes in plakken, tomaten in parten", "Leg alles dakpansgewijs in een ovenschaal", "Verkruimel de feta erover, besprenkel met olijfolie", "Bestrooi met oregano, zout en peper", "Bak 25-30 minuten tot goudbruin en zacht"}',
  '{"Preheat oven to 200C / 400F", "Slice zucchini into rounds, tomatoes into wedges", "Layer everything shingled in a baking dish", "Crumble feta on top, drizzle with olive oil", "Sprinkle with oregano, salt and pepper", "Bake 25-30 minutes until golden and tender"}'
);

insert into recipe_ingredients (recipe_id, ingredient_id, amount, unit, notes_nl, notes_en) values
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000011', 3, 'stuk', 'in plakken', 'sliced'),
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000002', 300, 'g', 'in parten', 'wedged'),
  ('b0000001-0000-0000-0000-000000000006', 'a0000002-0000-0000-0000-000000000006', 200, 'g', 'verkruimeld', 'crumbled'),
  ('b0000001-0000-0000-0000-000000000006', 'a0000004-0000-0000-0000-000000000001', 3, 'el', null, null),
  ('b0000001-0000-0000-0000-000000000006', 'a0000005-0000-0000-0000-000000000007', 1, 'tl', null, null),
  ('b0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000006', 2, 'teen', 'fijngesneden', 'sliced');

-- 7. Wraps met Kip en Avocado
insert into recipes (id, title_nl, title_en, description_nl, description_en, prep_time, servings, difficulty, tags, source_name, steps_nl, steps_en) values (
  'b0000001-0000-0000-0000-000000000007',
  'Wraps met Kip en Avocado', 'Chicken Avocado Wraps',
  'Snelle doordeweekse wraps met gekruide kip, avocado en frisse salade',
  'Quick weeknight wraps with spiced chicken, avocado and fresh salad',
  20, 4, 'easy', '{"quick"}', 'HelloFresh-stijl',
  '{"Snijd de kipfilet in reepjes, kruid met komijn, paprika, zout en peper", "Bak de kip goudbruin in olijfolie (6-8 min)", "Snijd de avocado in plakjes, de tomaat in blokjes", "Maak een snelle dressing: yoghurt, knoflook, citroensap", "Verwarm de wraps kort in een droge pan", "Beleg: dressing, kip, avocado, tomaat, sla"}',
  '{"Slice chicken into strips, season with cumin, paprika, salt and pepper", "Cook chicken golden in olive oil (6-8 min)", "Slice avocado, dice tomato", "Make quick dressing: yogurt, garlic, lemon juice", "Warm wraps briefly in a dry pan", "Assemble: dressing, chicken, avocado, tomato, lettuce"}'
);

insert into recipe_ingredients (recipe_id, ingredient_id, amount, unit, notes_nl, notes_en) values
  ('b0000001-0000-0000-0000-000000000007', 'a0000003-0000-0000-0000-000000000001', 400, 'g', 'in reepjes', 'sliced'),
  ('b0000001-0000-0000-0000-000000000007', 'a0000004-0000-0000-0000-000000000015', 4, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000013', 2, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000002', 150, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000016', 0.5, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000007', 'a0000002-0000-0000-0000-000000000007', 100, 'g', 'voor dressing', 'for dressing'),
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000006', 1, 'teen', 'geperst', 'pressed'),
  ('b0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000012', 0.5, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000007', 'a0000005-0000-0000-0000-000000000003', 1, 'tl', null, null),
  ('b0000001-0000-0000-0000-000000000007', 'a0000005-0000-0000-0000-000000000004', 1, 'tl', null, null);

-- 8. One-Pot Pasta Pomodoro
insert into recipes (id, title_nl, title_en, description_nl, description_en, prep_time, servings, difficulty, tags, source_name, steps_nl, steps_en) values (
  'b0000001-0000-0000-0000-000000000008',
  'One-Pot Pasta Pomodoro', 'One-Pot Pasta Pomodoro',
  'Alles in een pan - pasta in romige tomatensaus met verse basilicum',
  'Everything in one pot - pasta in creamy tomato sauce with fresh basil',
  25, 4, 'easy', '{"vegetarian", "quick", "budget"}', 'HelloFresh-stijl',
  '{"Fruit de ui en knoflook in olijfolie (3 min)", "Voeg tomatenblokjes, tomatenpuree en 400ml water toe", "Breng aan de kook, voeg de penne toe", "Kook 12-14 min met deksel half erop, roer regelmatig", "Voeg de spinazie toe in de laatste 2 minuten", "Roer de crème fraîche erdoor, breng op smaak", "Serveer met Parmezaan"}',
  '{"Sauté onion and garlic in olive oil (3 min)", "Add diced tomatoes, tomato paste and 400ml water", "Bring to boil, add penne", "Cook 12-14 min with lid half on, stir regularly", "Add spinach in the last 2 minutes", "Stir in crème fraîche, season to taste", "Serve with Parmesan"}'
);

insert into recipe_ingredients (recipe_id, ingredient_id, amount, unit, notes_nl, notes_en) values
  ('b0000001-0000-0000-0000-000000000008', 'a0000004-0000-0000-0000-000000000004', 400, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000008', 'a0000004-0000-0000-0000-000000000008', 400, 'ml', null, null),
  ('b0000001-0000-0000-0000-000000000008', 'a0000004-0000-0000-0000-000000000009', 2, 'el', null, null),
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000005', 1, 'stuk', null, null),
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000006', 2, 'teen', null, null),
  ('b0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000008', 150, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000008', 'a0000002-0000-0000-0000-000000000005', 100, 'ml', null, null),
  ('b0000001-0000-0000-0000-000000000008', 'a0000002-0000-0000-0000-000000000008', 40, 'g', 'geraspt, voor erbij', 'grated, for serving');

-- 9. Aardappel-Broccoli Schotel met Kaas
insert into recipes (id, title_nl, title_en, description_nl, description_en, prep_time, servings, difficulty, tags, source_name, steps_nl, steps_en) values (
  'b0000001-0000-0000-0000-000000000009',
  'Aardappel-Broccoli Schotel', 'Potato Broccoli Bake',
  'Comfortfood uit de oven: aardappel en broccoli in kaassaus',
  'Comfort food from the oven: potato and broccoli in cheese sauce',
  45, 4, 'easy', '{"vegetarian", "budget"}', 'Huisgemaakt',
  '{"Verwarm de oven voor op 200 graden", "Kook de aardappelen in plakken 8 min, voeg broccoli toe voor laatste 3 min", "Maak kaassaus: smelt boter, roer bloem erdoor, voeg melk toe al roerend", "Voeg geraspte kaas toe aan de saus en breng op smaak", "Leg aardappelen en broccoli in ovenschaal, giet kaassaus erover", "Bestrooi met extra kaas, bak 20 min tot goudbruin"}',
  '{"Preheat oven to 200C / 400F", "Boil sliced potatoes 8 min, add broccoli for last 3 min", "Make cheese sauce: melt butter, stir in flour, gradually add milk", "Add shredded cheese to sauce and season", "Layer potatoes and broccoli in baking dish, pour cheese sauce over", "Top with extra cheese, bake 20 min until golden"}'
);

insert into recipe_ingredients (recipe_id, ingredient_id, amount, unit, notes_nl, notes_en) values
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000010', 800, 'g', 'in plakken', 'sliced'),
  ('b0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000014', 1, 'stuk', 'in roosjes', 'in florets'),
  ('b0000001-0000-0000-0000-000000000009', 'a0000002-0000-0000-0000-000000000003', 150, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000009', 'a0000002-0000-0000-0000-000000000004', 30, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000009', 'a0000002-0000-0000-0000-000000000002', 300, 'ml', null, null);

-- 10. Champignon Risotto
insert into recipes (id, title_nl, title_en, description_nl, description_en, prep_time, servings, difficulty, tags, source_name, steps_nl, steps_en) values (
  'b0000001-0000-0000-0000-000000000010',
  'Champignon Risotto', 'Mushroom Risotto',
  'Romige risotto met gebakken champignons en Parmezaan',
  'Creamy risotto with sautéed mushrooms and Parmesan',
  35, 4, 'medium', '{"vegetarian"}', 'HelloFresh-stijl',
  '{"Verwarm 1L bouillon en houd warm op laag vuur", "Bak de champignons bruin in boter (5 min), haal eruit", "Fruit de ui in olijfolie, voeg de rijst toe en bak 2 min mee", "Voeg scheppen bouillon toe, steeds roerend, tot de rijst gaar is (18-20 min)", "Roer de champignons, boter en Parmezaan erdoor", "Breng op smaak met zout, peper en eventueel citroen"}',
  '{"Heat 1L stock and keep warm on low heat", "Brown mushrooms in butter (5 min), set aside", "Sauté onion in olive oil, add rice and toast 2 min", "Add ladles of stock, stirring constantly, until rice is done (18-20 min)", "Stir in mushrooms, butter and Parmesan", "Season with salt, pepper and optional lemon"}'
);

insert into recipe_ingredients (recipe_id, ingredient_id, amount, unit, notes_nl, notes_en) values
  ('b0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000015', 400, 'g', 'in plakken', 'sliced'),
  ('b0000001-0000-0000-0000-000000000010', 'a0000004-0000-0000-0000-000000000003', 320, 'g', 'risottorijst', 'risotto rice'),
  ('b0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000005', 1, 'stuk', 'fijngesnipperd', 'finely diced'),
  ('b0000001-0000-0000-0000-000000000010', 'a0000002-0000-0000-0000-000000000008', 60, 'g', 'geraspt', 'grated'),
  ('b0000001-0000-0000-0000-000000000010', 'a0000002-0000-0000-0000-000000000004', 40, 'g', null, null),
  ('b0000001-0000-0000-0000-000000000010', 'a0000004-0000-0000-0000-000000000001', 2, 'el', null, null);
