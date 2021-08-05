import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setToDos } from "../store/actions/actionCreators";

// interface addNewTodoProps {
//   addNewTodo: (newTodo: string) => void;
// }

const AddToDo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");

  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //addNewTodo(newTodo);
    newTodo.trim() !== "" && dispatch(setToDos(newTodo));
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
