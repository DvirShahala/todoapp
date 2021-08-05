//import { IToDo } from "../../models/inerfaces";
import * as actionTypes from "./actionTypes";

export const setToDos = (todo: string) => {
  return {
    type: actionTypes.ADD_TODO,
    payload: todo,
  };
};

export const clickComplete = (index: number) => {
  return {
    type: actionTypes.CLICK_COMPLETE,
    payload: index,
  };
};
