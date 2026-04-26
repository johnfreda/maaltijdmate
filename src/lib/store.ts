'use client';

import { useEffect, useState } from 'react';

export function useLocalFlag(key: string, initial = false) {
  const [value, setValue] = useState(initial);
  const storageKey = `maaltijdmate_${key}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw !== null) setValue(raw === '1');
    } catch {
      // ignore localStorage errors
    }
  }, [storageKey]);

  function update(next: boolean) {
    setValue(next);
    try {
      localStorage.setItem(storageKey, next ? '1' : '0');
    } catch {
      // ignore localStorage errors
    }
  }

  return { value, setValue: update };
}
