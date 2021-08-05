import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IToDo, ToDoState } from "../models/inerfaces";
import { clickComplete } from "../store/actions/actionCreators";
import AddToDo from "./AddToDo";
import TodoListItem from "./TodoListItem";

const initialTodos: Array<IToDo> = [
  { name: "Daily Raiden", ifComplete: true },
  { name: "Learn React", ifComplete: false },
  { name: "Eat lunch", ifComplete: false },
];

const TodoList: React.FC = () => {
  // const [toDos, setToDos] = useState<Array<IToDo>>(initialTodos);
  const todos = useSelector((state: ToDoState) => state.todos);

  const dispatch = useDispatch();

  const handleClick = (index: number) => {
    // const newToDos = [...toDos];
    // newToDos[index] = {
    //   ...newToDos[index],
    //   ifComplete: !newToDos[index].ifComplete,
    // };
    // setToDos(newToDos);
    dispatch(clickComplete(index));
    console.log("handle click");
  };

  // const addTodo = (newTodo: string) => {
  //   const newToDoToAdd = { name: newTodo, ifComplete: false };
  //   newTodo.trim() !== "" && setToDos([...toDos, newToDoToAdd]);
  // };

  return (
    <>
      <h1>To Do:</h1>
      {todos.map((toDo: IToDo, index: any) => {
        return (
          <TodoListItem
            key={index}
            todo={toDo}
            clickTodo={() => handleClick(index)}
          />
        );
      })}
      <AddToDo />
    </>
  );
};

export default TodoList;
