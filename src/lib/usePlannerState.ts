'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  addWeeks,
  aggregateShoppingList,
  defaultPlannerState,
  type PlannerState,
} from './planner';

const STORAGE_KEY = 'bio-weekplanner-state-v2';

export function usePlannerState() {
  const [state, setState] = useState<PlannerState>(defaultPlannerState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState({ ...defaultPlannerState, ...JSON.parse(raw) });
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsReady(true);
    }
  }, []);

  function update(next: PlannerState) {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function patch(partial: Partial<PlannerState>) {
    update({ ...state, ...partial });
  }

  const selectedWeekKey = state.currentWeekKey;
  const weekAssignments = state.assignmentsByWeek[selectedWeekKey] ?? {};
  const checkedItems = state.checkedItemsByWeek[selectedWeekKey] ?? [];
  const shoppingMoment = state.shoppingMomentByWeek[selectedWeekKey] ?? '';

  function setCurrentWeekKey(weekKey: string) {
    patch({ currentWeekKey: weekKey });
  }

  function stepWeek(delta: number) {
    patch({ currentWeekKey: addWeeks(selectedWeekKey, delta) });
  }

  function setPeople(people: number) {
    patch({ people: Math.max(1, people) });
  }

  function setAssignment(day: keyof typeof weekAssignments | string, recipeId?: string) {
    const nextWeekAssignments = {
      ...weekAssignments,
      [day]: recipeId || undefined,
    };

    patch({
      assignmentsByWeek: {
        ...state.assignmentsByWeek,
        [selectedWeekKey]: nextWeekAssignments,
      },
    });
  }

  function setAssignments(assignments: Record<string, string | undefined>) {
    patch({
      assignmentsByWeek: {
        ...state.assignmentsByWeek,
        [selectedWeekKey]: assignments,
      },
    });
  }

  function clearSelectedWeek() {
    patch({
      assignmentsByWeek: {
        ...state.assignmentsByWeek,
        [selectedWeekKey]: {},
      },
      checkedItemsByWeek: {
        ...state.checkedItemsByWeek,
        [selectedWeekKey]: [],
      },
      shoppingMomentByWeek: {
        ...state.shoppingMomentByWeek,
        [selectedWeekKey]: '',
      },
    });
  }

  function setShoppingMoment(value: string) {
    patch({
      shoppingMomentByWeek: {
        ...state.shoppingMomentByWeek,
        [selectedWeekKey]: value,
      },
    });
  }

  function toggleCheckedItem(itemKey: string, isChecked: boolean) {
    const next = isChecked
      ? [...checkedItems, itemKey]
      : checkedItems.filter((k) => k !== itemKey);

    patch({
      checkedItemsByWeek: {
        ...state.checkedItemsByWeek,
        [selectedWeekKey]: next,
      },
    });
  }

  function resetCheckedItems() {
    patch({
      checkedItemsByWeek: {
        ...state.checkedItemsByWeek,
        [selectedWeekKey]: [],
      },
    });
  }

  const shoppingList = useMemo(() => aggregateShoppingList(state, selectedWeekKey), [state, selectedWeekKey]);

  return {
    state,
    isReady,
    patch,
    update,
    selectedWeekKey,
    weekAssignments,
    checkedItems,
    shoppingMoment,
    shoppingList,
    setCurrentWeekKey,
    stepWeek,
    setPeople,
    setAssignment,
    setAssignments,
    clearSelectedWeek,
    setShoppingMoment,
    toggleCheckedItem,
    resetCheckedItems,
  };
}
