import { IToDo, ToDoState } from "../../models/inerfaces";
import * as actionTypes from "../actions/actionTypes";

const initialState: ToDoState = {
  todos: [
    { name: "Daily Raiden", ifComplete: true },
    { name: "Learn React", ifComplete: false },
    { name: "Eat lunch", ifComplete: false },
  ],
};

const todoReducer = (
  state: ToDoState = initialState,
  action: { type: string; payload: string | number }
) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      const newTodo: IToDo = {
        name: action.payload as string,
        ifComplete: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };

    case actionTypes.CLICK_COMPLETE:
      const newListTodos = [...state.todos];

      newListTodos[action.payload as number].ifComplete =
        !newListTodos[action.payload as number].ifComplete;
      return {
        todos: newListTodos,
      };
  }
  return state;
};

export default todoReducer;
