'use client';

import { useEffect, useMemo, useState } from 'react';
import { defaultPlannerState, type PlannerState, aggregateShoppingList } from './planner';

const STORAGE_KEY = 'bio-weekplanner-state-v1';

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
    const next = { ...state, ...partial };
    update(next);
  }

  const shoppingList = useMemo(() => aggregateShoppingList(state), [state]);

  return { state, isReady, patch, update, shoppingList };
}
