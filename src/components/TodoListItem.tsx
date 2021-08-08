import React from "react";
import { IToDo } from "../models/inerfaces";

interface toDoListItemProps {
  todo: IToDo;
  clickCompleteTodo: () => void;
  clickDeleteTodo: () => void;
}

const delButton = {
  marginLeft: "10px",
  color: "#E04132",
} as React.CSSProperties;

const TodoListItem: React.FC<toDoListItemProps> = ({
  todo,
  clickCompleteTodo,
  clickDeleteTodo,
}) => {
  return (
    <div>
      <label
        style={{
          textDecoration: todo.ifComplete ? "line-through" : "none",
        }}
      >
        <input
          type="checkbox"
          checked={todo.ifComplete}
          onChange={clickCompleteTodo}
        />
        {todo.name}
      </label>
      <button style={delButton} onClick={clickDeleteTodo}>
        Delete
      </button>
    </div>
  );
};

export default TodoListItem;
