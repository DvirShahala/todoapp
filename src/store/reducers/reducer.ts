import { IToDo, ToDoState } from "../../models/inerfaces";
import * as actionTypes from "../actions/actionTypes";

const initialState: ToDoState = {
  nextId: 4,
  todos: [
    { id: 1, name: "Daily Raiden", ifComplete: true },
    { id: 2, name: "Learn React", ifComplete: false },
    { id: 3, name: "Eat lunch", ifComplete: false },
  ],
};

const todoReducer = (
  state: ToDoState = initialState,
  action: { type: string; payload: string | number }
) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      const newTodo: IToDo = {
        id: state.nextId,
        name: action.payload as string,
        ifComplete: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
        nextId: ++state.nextId as number,
      };

    case actionTypes.CLICK_COMPLETE:
      const newListTodos = [...state.todos];

      const indexToChange = newListTodos.findIndex(
        (todo) => todo.id === (action.payload as number)
      );

      newListTodos[indexToChange].ifComplete =
        !newListTodos[indexToChange].ifComplete;

      return {
        ...state,
        todos: newListTodos,
      };
  }
  return state;
};

export default todoReducer;
