import { Todo } from './Todo';

export type Action = { type: 'add', payload: Todo }
| { type: 'delete', payload: Todo }
| { type: 'switchStatus', payload: Todo }
| { type: 'toggleAll', payload: boolean }
| { type: 'edit', payload: { id: number, title: string } }
| { type: 'clearCompleted' };
