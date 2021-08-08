import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addToDos } from "../store/actions/actionCreators";

const AddToDo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");

  const dispatch = useDispatch();

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
      <form>
        <input type="text" value={newTodo} onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          Add To Do
        </button>
      </form>
    </>
  );
};

export default AddToDo;
