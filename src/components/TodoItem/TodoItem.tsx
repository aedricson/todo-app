/* eslint-disable jsx-a11y/control-has-associated-label */

import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { TodoDispatchContext } from '../../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(TodoDispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && isEditing) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleToggleTodo = () => {
    dispatch({ type: 'switchStatus', payload: todo });
  };

  const handleDeleteTodo = () => {
    dispatch({ type: 'delete', payload: todo });
  };

  const handleEdit = () => {
    const trimmedTitle = todoTitle.trim();

    if (todo.title === trimmedTitle) {
      setTodoTitle(trimmedTitle);
      setIsEditing(false);

      return;
    }

    if (trimmedTitle) {
      dispatch(
        {
          type: 'edit',
          payload: { id: todo.id, title: trimmedTitle },
        },
      );

      setTodoTitle(trimmedTitle);
      setIsEditing(false);
    } else {
      dispatch({ type: 'delete', payload: todo });
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setTodoTitle(todo.title);
      setIsEditing(false);
    } else if (event.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <li
      className={classNames(
        {
          completed: todo.completed,
          editing: isEditing,
        },
      )}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          checked={todo.completed}
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleToggleTodo}
        />

        <label>{todoTitle}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>

      <input
        type="text"
        className="edit"
        ref={titleField}
        value={todoTitle}
        onChange={handleChangeTitle}
        onBlur={handleEdit}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
