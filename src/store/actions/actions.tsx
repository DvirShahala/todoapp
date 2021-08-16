import { IToDo } from "../../models/inerfaces";
import * as actionTypes from "./actionTypes";

export const addToDos = (todo: string) => {
  return {
    type: actionTypes.ADD_TODO,
    payload: todo,
  };
};

export const clickComplete = (todo: IToDo) => {
  return {
    type: actionTypes.CLICK_COMPLETE,
    payload: todo,
  };
};

export const clickDelete = (todo: IToDo) => {
  return {
    type: actionTypes.CLICK_DELETE,
    payload: todo,
  };
};

export const loadToDo = (todoList: IToDo[]) => {
  return {
    type: actionTypes.LOAD_TODO,
    payload: todoList,
  };
};

export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

export const endLoading = () => {
  return {
    type: actionTypes.END_LOADING,
  };
};
