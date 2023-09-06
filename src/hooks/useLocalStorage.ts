import { useReducer } from 'react';

export function useLocalStorage<S, A>(
  key: string,
  initState: S,
  reducer: (state: S, action: A) => S,
): [S, (a: A) => void] {
  const [value, dispatch] = useReducer(reducer, initState, () => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return initState;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return initState;
    }
  });

  const saveValue = (action: A) => {
    dispatch(action);
  };

  localStorage.setItem(key, JSON.stringify(value));

  return [value, saveValue];
}
