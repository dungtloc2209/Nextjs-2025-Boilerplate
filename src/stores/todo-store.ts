import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  tags: string[];
}

export interface TodoFilter {
  status: 'all' | 'active' | 'completed';
  priority: 'all' | 'low' | 'medium' | 'high';
  searchTerm: string;
}

export interface TodoStore {
  // State
  todos: Todo[];
  filter: TodoFilter;
  isLoading: boolean;

  // Actions
  addTodo: (text: string, priority?: Todo['priority']) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  addTagToTodo: (id: string, tag: string) => void;
  removeTagFromTodo: (id: string, tag: string) => void;
  updateTodoPriority: (id: string, priority: Todo['priority']) => void;

  // Filter actions
  setFilter: (filter: Partial<TodoFilter>) => void;
  clearCompleted: () => void;

  // Computed values
  filteredTodos: () => Todo[];
  stats: () => {
    total: number;
    completed: number;
    active: number;
    byPriority: Record<Todo['priority'], number>;
  };
}

export const useTodoStore = create<TodoStore>()(
  immer((set, get) => ({
    // Initial state
    todos: [
      {
        id: '1',
        text: 'Learn Zustand',
        completed: true,
        priority: 'high',
        createdAt: new Date('2024-01-01'),
        tags: ['learning', 'state-management'],
      },
      {
        id: '2',
        text: 'Understand Immer.js',
        completed: false,
        priority: 'medium',
        createdAt: new Date('2024-01-02'),
        tags: ['learning', 'immutability'],
      },
      {
        id: '3',
        text: 'Build awesome apps',
        completed: false,
        priority: 'high',
        createdAt: new Date('2024-01-03'),
        tags: ['development', 'project'],
      },
    ],
    filter: {
      status: 'all',
      priority: 'all',
      searchTerm: '',
    },
    isLoading: false,

    // Actions using Immer for immutable updates
    addTodo: (text: string, priority: Todo['priority'] = 'medium') =>
      set((state) => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          text,
          completed: false,
          priority,
          createdAt: new Date(),
          tags: [],
        };
        state.todos.push(newTodo);
      }),

    toggleTodo: (id: string) =>
      set((state) => {
        const todo = state.todos.find((t) => t.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      }),

    deleteTodo: (id: string) =>
      set((state) => {
        const index = state.todos.findIndex((t) => t.id === id);
        if (index !== -1) {
          state.todos.splice(index, 1);
        }
      }),

    editTodo: (id: string, text: string) =>
      set((state) => {
        const todo = state.todos.find((t) => t.id === id);
        if (todo) {
          todo.text = text;
        }
      }),

    addTagToTodo: (id: string, tag: string) =>
      set((state) => {
        const todo = state.todos.find((t) => t.id === id);
        if (todo && !todo.tags.includes(tag)) {
          todo.tags.push(tag);
        }
      }),

    removeTagFromTodo: (id: string, tag: string) =>
      set((state) => {
        const todo = state.todos.find((t) => t.id === id);
        if (todo) {
          const index = todo.tags.indexOf(tag);
          if (index !== -1) {
            todo.tags.splice(index, 1);
          }
        }
      }),

    updateTodoPriority: (id: string, priority: Todo['priority']) =>
      set((state) => {
        const todo = state.todos.find((t) => t.id === id);
        if (todo) {
          todo.priority = priority;
        }
      }),

    setFilter: (filter: Partial<TodoFilter>) =>
      set((state) => {
        Object.assign(state.filter, filter);
      }),

    clearCompleted: () =>
      set((state) => {
        state.todos = state.todos.filter((todo) => !todo.completed);
      }),

    // Computed values
    filteredTodos: () => {
      const { todos, filter } = get();
      return todos.filter((todo) => {
        // Filter by status
        if (filter.status === 'active' && todo.completed) return false;
        if (filter.status === 'completed' && !todo.completed) return false;

        // Filter by priority
        if (filter.priority !== 'all' && todo.priority !== filter.priority) return false;

        // Filter by search term
        if (filter.searchTerm && !todo.text.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
          return false;
        }

        return true;
      });
    },

    stats: () => {
      const { todos } = get();
      const completed = todos.filter((t) => t.completed).length;
      const active = todos.length - completed;

      const byPriority = todos.reduce(
        (acc, todo) => {
          acc[todo.priority] = (acc[todo.priority] || 0) + 1;
          return acc;
        },
        {} as Record<Todo['priority'], number>
      );

      return {
        total: todos.length,
        completed,
        active,
        byPriority: {
          low: byPriority.low || 0,
          medium: byPriority.medium || 0,
          high: byPriority.high || 0,
        },
      };
    },
  }))
);
