import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { TodoContext } from './context/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

const Root = () => (
  <Router>
    <TodoContext>
      <App />
    </TodoContext>
  </Router>
);

createRoot(container).render(<Root />);
