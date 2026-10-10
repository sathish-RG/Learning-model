import { useCallback, useState } from 'react';
import { storage } from '../utils/storage';

// Which phase accordions are open, remembered per browser. Starts with `focusPhase` open.
export default function useOpenPhases(storageKey, focusPhase) {
  const [open, setOpen] = useState(() => {
    try {
      const saved = JSON.parse(storage.get(storageKey));
      if (Array.isArray(saved)) return new Set(saved);
    } catch {
      // Ignore unreadable saved state
    }
    return new Set([focusPhase]);
  });

  const toggle = useCallback(
    (phase) => {
      setOpen((prev) => {
        const next = new Set(prev);
        if (next.has(phase)) next.delete(phase);
        else next.add(phase);
        storage.set(storageKey, JSON.stringify([...next]));
        return next;
      });
    },
    [storageKey],
  );

  return { isOpen: (phase) => open.has(phase), toggle };
}
