import React, {
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { TodoList } from '../TodoList';
import { TodoFilter } from '../TodoFilter';
import {
  TodoDispatchContext,
  TodoStateContext,
} from '../../context/TodoContext';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const TodoApp: React.FC = () => {
  const dispatch = useContext(TodoDispatchContext);
  const todos = useContext(TodoStateContext);
  const { status } = useParams();
  const [todoTitle, setTodoTitle] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const itemsLeft = useMemo(() => {
    return todos.filter(todo => todo.completed === false).length;
  }, [todos]);

  const filteredTodos = useMemo(() => {
    switch (status) {
      case Status.All:
        return todos;

      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [status, todos]);

  const handleClearCompleted = useCallback(() => {
    if (todos.every(todo => todo.completed === false)) {
      return;
    }

    dispatch({ type: 'clearCompleted' });
  }, [todos]);

  const handleAddTodo = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    dispatch({ type: 'add', payload: newTodo });
    setTodoTitle('');
  }, [todoTitle]);

  const handleToggleTodos = useCallback(() => {
    dispatch({ type: 'toggleAll', payload: !isChecked });
  }, [isChecked]);

  useEffect(() => {
    if (itemsLeft !== 0 || todos.length === 0) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, [itemsLeft]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        {!!todos.length && (
          <>
            <input
              checked={isChecked}
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleToggleTodos}
            />

            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList todos={filteredTodos} />
      </section>

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {itemsLeft}
            {' '}
            items left
          </span>

          <TodoFilter />

          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        </footer>
      )}
    </div>
  );
};
