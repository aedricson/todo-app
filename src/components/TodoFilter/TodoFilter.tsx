import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const TodoFilter: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => (
    classNames({ selected: isActive })
  );

  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={getLinkClass}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={getLinkClass}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={getLinkClass}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
