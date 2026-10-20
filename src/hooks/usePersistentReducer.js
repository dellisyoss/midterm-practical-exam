import { useEffect, useReducer } from 'react';

export function usePersistentReducer(reducer, initialState, key) {
  // Lazy initializer: loads from localStorage once.
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : init;
    } catch {
      return init;
    }
  });

  // Saves after every state change.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}
