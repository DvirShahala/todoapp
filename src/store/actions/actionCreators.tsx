import { IToDo } from "../../models/inerfaces";
import * as actionTypes from "./actionTypes";

export const addToDos = (todo: string) => {
  return {
    type: actionTypes.ADD_TODO,
    payload: todo,
  };
};

export const clickComplete = (id: number) => {
  return {
    type: actionTypes.CLICK_COMPLETE,
    payload: id,
  };
};

export const clickDelete = (id: number) => {
  return {
    type: actionTypes.CLICK_DELETE,
    payload: id,
  };
};

export const loadToDo = (todoList: IToDo[]) => {
  return {
    type: actionTypes.LOAD_TODO,
    payload: todoList,
  };
};
