import React from 'react';
import { Todo } from '../types/Todo';
import { Action } from '../types/Action';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initState: Todo[] = [];

export const TodoDispatchContext = React.createContext(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_action: Action) => { },
);
export const TodoStateContext = React.createContext(initState);

type Props = {
  children: React.ReactNode;
};

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [
        ...todos,
        action.payload,
      ];

    case 'delete':
      return todos.filter(todo => todo.id !== action.payload.id);

    case 'switchStatus':
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

    case 'toggleAll':
      return todos.map(todo => ({
        ...todo,
        completed: action.payload,
      }));

    case 'edit':
      return todos.map(todo => (todo.id === action.payload.id ? {
        ...todo,
        title: action.payload.title,
      } : todo));

    case 'clearCompleted':
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
}

export const TodoContext: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useLocalStorage<Todo[], Action>(
    'todos',
    initState,
    reducer,
  );

  return (
    <TodoDispatchContext.Provider value={dispatch}>
      <TodoStateContext.Provider value={todos}>
        {children}
      </TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  );
};
