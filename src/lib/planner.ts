import { bioRecipes } from './bioRecipes';

export const weekdays = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'] as const;

export type Weekday = (typeof weekdays)[number];

export type PlannerState = {
  people: number;
  currentWeekKey: string;
  assignmentsByWeek: Record<string, Partial<Record<Weekday, string>>>;
  shoppingMomentByWeek: Record<string, string>;
  checkedItemsByWeek: Record<string, string[]>;
};

export function getWeekKeyFromDate(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export const defaultPlannerState: PlannerState = {
  people: 2,
  currentWeekKey: getWeekKeyFromDate(new Date()),
  assignmentsByWeek: {},
  shoppingMomentByWeek: {},
  checkedItemsByWeek: {},
};

export function getRecipeById(id?: string) {
  return bioRecipes.find((r) => r.id === id);
}

function parseWeekKey(weekKey: string) {
  const [yearPart, weekPart] = weekKey.split('-W');
  return { year: Number(yearPart), week: Number(weekPart) };
}

function getMondayOfISOWeek(year: number, week: number) {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dayOfWeek = simple.getUTCDay() || 7;
  if (dayOfWeek <= 4) {
    simple.setUTCDate(simple.getUTCDate() - dayOfWeek + 1);
  } else {
    simple.setUTCDate(simple.getUTCDate() + 8 - dayOfWeek);
  }
  return simple;
}

export function getWeekLabel(weekKey: string) {
  const { year, week } = parseWeekKey(weekKey);
  return `Week ${week}, ${year}`;
}

export function addWeeks(weekKey: string, delta: number) {
  const { year, week } = parseWeekKey(weekKey);
  const monday = getMondayOfISOWeek(year, week);
  monday.setUTCDate(monday.getUTCDate() + delta * 7);
  return getWeekKeyFromDate(monday);
}

export function aggregateShoppingList(state: PlannerState, weekKey: string) {
  const assignments = state.assignmentsByWeek[weekKey] ?? {};
  const map = new Map<string, { unit: string; amount: number }>();

  for (const day of weekdays) {
    const recipe = getRecipeById(assignments[day]);
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

function generateEventsForWeek(state: PlannerState, weekKey: string) {
  const now = formatIcsDate(new Date().toISOString());
  const assignments = state.assignmentsByWeek[weekKey] ?? {};
  const events: string[] = [];

  const { year, week } = parseWeekKey(weekKey);
  const monday = getMondayOfISOWeek(year, week);

  weekdays.forEach((day, index) => {
    const recipe = getRecipeById(assignments[day]);
    if (!recipe) return;

    const start = new Date(monday);
    start.setUTCDate(monday.getUTCDate() + index);
    start.setUTCHours(17, 0, 0, 0);
    const end = new Date(start);
    end.setUTCHours(18, 0, 0, 0);

    events.push([
      'BEGIN:VEVENT',
      `UID:meal-${weekKey}-${day.toLowerCase()}-${recipe.id}@maaltijdmate`,
      `DTSTAMP:${now}`,
      `DTSTART:${formatIcsDate(start.toISOString())}`,
      `DTEND:${formatIcsDate(end.toISOString())}`,
      `SUMMARY:${escapeText(`Weekmenu: ${recipe.title}`)}`,
      `DESCRIPTION:${escapeText(`${day} • ${state.people} personen • ${weekKey}`)}`,
      'END:VEVENT',
    ].join('\n'));
  });

  const shoppingMoment = state.shoppingMomentByWeek[weekKey];
  if (shoppingMoment) {
    const start = new Date(shoppingMoment);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    events.push([
      'BEGIN:VEVENT',
      `UID:shopping-moment-${weekKey}@maaltijdmate`,
      `DTSTAMP:${now}`,
      `DTSTART:${formatIcsDate(start.toISOString())}`,
      `DTEND:${formatIcsDate(end.toISOString())}`,
      'SUMMARY:Boodschappenmoment',
      `DESCRIPTION:${escapeText(`Bio Weekplanner boodschappen • ${weekKey}`)}`,
      'END:VEVENT',
    ].join('\n'));
  }

  return events;
}

function toCalendar(events: string[]) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MaaltijdMate//Bio Weekplanner//NL',
    'CALSCALE:GREGORIAN',
    ...events,
    'END:VCALENDAR',
  ].join('\n');
}

export function generateIcsForWeek(state: PlannerState, weekKey: string) {
  return toCalendar(generateEventsForWeek(state, weekKey));
}

export function generateIcsForAll(state: PlannerState) {
  const allWeekKeys = Array.from(
    new Set([
      ...Object.keys(state.assignmentsByWeek),
      ...Object.keys(state.shoppingMomentByWeek),
    ]),
  ).sort();

  const events = allWeekKeys.flatMap((weekKey) => generateEventsForWeek(state, weekKey));
  return toCalendar(events);
}
