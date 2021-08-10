import { ToDoState } from "../../models/inerfaces";

export const getTodos = (state: ToDoState) => state.todos;
export const getNextId = (state: ToDoState) => state.nextId;
