export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

// In-memory store for simplicity
export const todos: ITodo[] = [];
