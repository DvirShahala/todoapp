export interface IToDo {
  name: string;
  ifComplete: boolean;
}

export interface ToDoState {
  todos: IToDo[];
}
