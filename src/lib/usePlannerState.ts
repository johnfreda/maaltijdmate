'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  addWeeks,
  aggregateShoppingList,
  defaultPlannerState,
  type PlannerState,
} from './planner';
import {
  getOrCreateFeedToken,
  getSignedInUserId,
  loadRemoteWeeks,
  mergeRemoteIntoState,
  saveRemoteWeek,
} from './remotePlanner';

const STORAGE_KEY = 'bio-weekplanner-state-v2';

export function usePlannerState() {
  const [state, setState] = useState<PlannerState>(defaultPlannerState);
  const [isReady, setIsReady] = useState(false);

  const [remoteStatus, setRemoteStatus] = useState<'idle' | 'guest' | 'syncing' | 'ready' | 'error'>('idle');
  const [remoteUserId, setRemoteUserId] = useState<string | null>(null);
  const [remoteFeedToken, setRemoteFeedToken] = useState<string | null>(null);

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

  useEffect(() => {
    if (!isReady) return;

    let cancelled = false;

    async function initRemote() {
      const userId = await getSignedInUserId();
      if (!userId) {
        if (!cancelled) setRemoteStatus('guest');
        return;
      }

      if (cancelled) return;
      setRemoteStatus('syncing');
      setRemoteUserId(userId);

      const token = await getOrCreateFeedToken(userId);
      if (!cancelled) setRemoteFeedToken(token);

      const remote = await loadRemoteWeeks(userId);
      if (remote.error) {
        if (!cancelled) setRemoteStatus('error');
        return;
      }

      if (!cancelled) {
        setState((prev) => mergeRemoteIntoState(prev, remote.rows));
        setRemoteStatus('ready');
      }
    }

    initRemote();

    return () => {
      cancelled = true;
    };
  }, [isReady]);

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

  useEffect(() => {
    if (!isReady || remoteStatus !== 'ready' || !remoteUserId) return;

    const timer = setTimeout(() => {
      saveRemoteWeek({
        userId: remoteUserId,
        weekKey: selectedWeekKey,
        people: state.people,
        shoppingMoment,
        assignments: weekAssignments,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [isReady, remoteStatus, remoteUserId, selectedWeekKey, shoppingMoment, weekAssignments, state.people]);

  function setCurrentWeekKey(weekKey: string) {
    patch({ currentWeekKey: weekKey });
  }

  function stepWeek(delta: number) {
    patch({ currentWeekKey: addWeeks(selectedWeekKey, delta) });
  }

  function setPeople(people: number) {
    patch({ people: Math.max(1, people) });
  }

  function setAssignment(day: string, recipeId?: string) {
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
    remoteStatus,
    remoteFeedToken,
  };
}
