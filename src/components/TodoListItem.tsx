import React from "react";
import { IToDo } from "../models/inerfaces";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

interface toDoListItemProps {
  todo: IToDo;
  clickCompleteTodo: () => void;
  clickDeleteTodo: () => void;
}

const useStyles = makeStyles((theme) => ({
  buttons: {
    color: theme.palette.primary.main,
  },
}));

const TodoListItem: React.FC<toDoListItemProps> = ({
  todo,
  clickCompleteTodo,
  clickDeleteTodo,
}) => {
  const classes = useStyles();

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
      <Button className={classes.buttons} onClick={clickDeleteTodo}>
        Delete
      </Button>
    </div>
  );
};

export default TodoListItem;
