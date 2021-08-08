import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IToDo, ToDoState } from "../models/inerfaces";
import { clickComplete } from "../store/actions/actionCreators";
import AddToDo from "./AddToDo";
import TodoListItem from "./TodoListItem";

const TodoList: React.FC = () => {
  const todos = useSelector((state: ToDoState) => state.todos);

  const dispatch = useDispatch();

  const handleClick = (id: number) => {
    console.log(id);
    dispatch(clickComplete(id));
  };

  return (
    <>
      <h1>To Do:</h1>
      {todos.map((toDo: IToDo) => {
        return (
          <TodoListItem
            key={toDo.id}
            todo={toDo}
            clickTodo={() => handleClick(toDo.id)}
          />
        );
      })}
      <AddToDo />
    </>
  );
};

export default TodoList;
