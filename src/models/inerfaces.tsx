export interface IToDo {
  id: number;
  name: string;
  ifComplete: boolean;
}

export interface ToDoState {
  nextId: number;
  todos: IToDo[];
}
