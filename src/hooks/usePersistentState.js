import { useEffect, useState } from 'react';
import { readLocalStorageJson, writeLocalStorageJson } from '../lib/hangarRuntime.js';

export function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => readLocalStorageJson(key, initialValue));

  useEffect(() => {
    writeLocalStorageJson(key, state);
  }, [key, state]);

  return [state, setState];
}

