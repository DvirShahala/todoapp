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
