export interface IToDo {
  id: number;
  name: string;
  ifComplete: boolean;
}

export interface ToDoState {
  isLoading: boolean;
  nextId: number;
  todos: IToDo[];
}
