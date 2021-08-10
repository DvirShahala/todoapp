import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IToDo } from "../models/inerfaces";
import {
  clickComplete,
  clickDelete,
  loadToDo,
} from "../store/actions/actionCreators";
import AddToDo from "./AddToDo";
import { Button, makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getNextId, getTodos } from "../store/selectors/selectors";
import axios from "axios";

const api = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
});

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  cursor: {
    cursor: "pointer",
  },
  buttons: {
    justifyContent: "center",
    marginTop: "5%",
  },
}));

const TodoList: React.FC = () => {
  const classes = useStyles();

  const todos = useSelector(getTodos);
  let nextId = useSelector(getNextId);

  const dispatch = useDispatch();

  const handleCompleteClick = (id: number) => {
    dispatch(clickComplete(id));
  };

  const handleDelClick = (id: number) => {
    dispatch(clickDelete(id));
  };

  const loadApiData = () => async (dispatch: Function, getState: Function) => {
    try {
      const { data } = await api.get("/todos", {
        params: {
          _limit: 10,
        },
      });

      const loadTodos: IToDo[] = data.map((todoFromApi: any) => {
        return {
          id: nextId++,
          name: todoFromApi.title,
          ifComplete: false,
        };
      });

      dispatch(loadToDo(loadTodos));
    } catch (error) {
      console.log(error);
    }
  };

  const handleApiClick = async () => {
    dispatch(loadApiData());
  };

  return (
    <>
      <h1>To Do:</h1>
      {/* {todos.map((toDo: IToDo) => {
        return (
          <TodoListItem
            key={toDo.id}
            todo={toDo}
            clickCompleteTodo={() => handleCompleteClick(toDo.id)}
            clickDeleteTodo={() => handleDelClick(toDo.id)}
          />
        );
      })} */}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Complete</TableCell>
              <TableCell>Delelte Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((toDo: IToDo, index: number) => (
              <TableRow key={toDo.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {toDo.name}
                </TableCell>
                <TableCell
                  className={classes.cursor}
                  component="th"
                  scope="row"
                  onClick={() => handleCompleteClick(toDo.id)}
                >
                  {toDo.ifComplete ? "YES" : "NO"}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => handleDelClick(toDo.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddToDo />
      <Button
        className={classes.buttons}
        color="secondary"
        variant="outlined"
        onClick={() => handleApiClick()}
      >
        Load From API
      </Button>
    </>
  );
};

export default TodoList;
