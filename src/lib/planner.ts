import { bioRecipes } from './bioRecipes';

export const weekdays = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'] as const;

export type Weekday = (typeof weekdays)[number];

export type PlannerState = {
  people: number;
  shoppingMoment: string;
  assignments: Partial<Record<Weekday, string>>;
  checkedItems: string[];
};

export const defaultPlannerState: PlannerState = {
  people: 2,
  shoppingMoment: '',
  assignments: {},
  checkedItems: [],
};

export function getRecipeById(id?: string) {
  return bioRecipes.find((r) => r.id === id);
}

export function aggregateShoppingList(state: PlannerState) {
  const map = new Map<string, { unit: string; amount: number }>();

  for (const day of weekdays) {
    const recipe = getRecipeById(state.assignments[day]);
    if (!recipe) continue;

    for (const ingredient of recipe.ingredients) {
      const key = ingredient.name;
      const current = map.get(key) ?? { unit: ingredient.unit, amount: 0 };
      current.amount += ingredient.amountPerPerson * state.people;
      map.set(key, current);
    }
  }

  return Array.from(map.entries())
    .map(([name, value]) => ({
      name,
      unit: value.unit,
      amount: Number(value.amount.toFixed(1)),
      key: `${name}-${value.unit}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function formatIcsDate(isoDate: string) {
  const d = new Date(isoDate);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const mins = String(d.getUTCMinutes()).padStart(2, '0');
  const secs = String(d.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${mins}${secs}Z`;
}

function escapeText(text: string) {
  return text.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

export function generateIcs(state: PlannerState) {
  const now = formatIcsDate(new Date().toISOString());
  const events: string[] = [];

  weekdays.forEach((day, index) => {
    const recipe = getRecipeById(state.assignments[day]);
    if (!recipe) return;

    const start = new Date();
    start.setDate(start.getDate() - start.getDay() + 1 + index);
    start.setHours(18, 0, 0, 0);
    const end = new Date(start);
    end.setHours(19, 0, 0, 0);

    events.push([
      'BEGIN:VEVENT',
      `UID:meal-${day.toLowerCase()}-${recipe.id}@maaltijdmate`,
      `DTSTAMP:${now}`,
      `DTSTART:${formatIcsDate(start.toISOString())}`,
      `DTEND:${formatIcsDate(end.toISOString())}`,
      `SUMMARY:${escapeText(`Weekmenu: ${recipe.title}`)}`,
      `DESCRIPTION:${escapeText(`${day} • ${state.people} personen`)}`,
      'END:VEVENT',
    ].join('\n'));
  });

  if (state.shoppingMoment) {
    const start = new Date(state.shoppingMoment);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    events.push([
      'BEGIN:VEVENT',
      'UID:shopping-moment@maaltijdmate',
      `DTSTAMP:${now}`,
      `DTSTART:${formatIcsDate(start.toISOString())}`,
      `DTEND:${formatIcsDate(end.toISOString())}`,
      'SUMMARY:Boodschappenmoment',
      'DESCRIPTION:Bio Weekplanner boodschappen voor de week',
      'END:VEVENT',
    ].join('\n'));
  }

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MaaltijdMate//Bio Weekplanner//NL',
    'CALSCALE:GREGORIAN',
    ...events,
    'END:VCALENDAR',
  ].join('\n');
}
