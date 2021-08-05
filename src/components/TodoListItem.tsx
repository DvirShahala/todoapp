import React from "react";
import { IToDo } from "../models/inerfaces";

interface toDoListItemProps {
  todo: IToDo;
  clickTodo: () => void;
}

const TodoListItem: React.FC<toDoListItemProps> = ({ todo, clickTodo }) => {
  return (
    <div>
      <label
        style={{
          textDecoration: todo.ifComplete ? "line-through" : "none",
        }}
      >
        <input type="checkbox" checked={todo.ifComplete} onChange={clickTodo} />
        {todo.name}
      </label>
    </div>
  );
};

export default TodoListItem;
