import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addToDos } from "../store/actions/actionCreators";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginRight: "20px",
    marginTop: "40px",
  },
  buttons: {
    marginTop: "49px",
    "&:hover": {
      background: theme.palette.secondary.main,
    },
  },
}));

const AddToDo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");

  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  // Use Thunk!!!
  const messageAndDispatch = () => (dispatch: Function, getState: Function) => {
    if (getState().todos.length >= 5) {
      alert("you are too busy!!!");
    }
    dispatch(addToDos(newTodo));
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    newTodo.trim() !== "" && dispatch(messageAndDispatch());
    setNewTodo("");
  };

  return (
    <>
      <form autoComplete="off">
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label="Enter New Todo"
          variant="outlined"
          value={newTodo}
          onChange={handleChange}
        />
        <Button
          className={classes.buttons}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Add To Do
        </Button>
      </form>
    </>
  );
};

export default AddToDo;
