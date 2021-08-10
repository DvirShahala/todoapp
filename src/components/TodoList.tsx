import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IToDo } from "../models/inerfaces";
import {
  clickComplete,
  clickDelete,
  endLoading,
  loadToDo,
  startLoading,
} from "../store/actions/actionCreators";
import AddToDo from "./AddToDo";
import { Button, LinearProgress, makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getLoading, getNextId, getTodos } from "../store/selectors/selectors";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

const api = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
});

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  pointer: {
    cursor: "pointer",
  },
  complete: {
    backgroundColor: "#72d37d",
  },
  apibuttons: {
    justifyContent: "center",
    marginTop: "5%",
  },
  buttons: {
    border: "1px solid black",
  },
  loaded: {
    marginTop: "10%",
  },
}));

const TodoList: React.FC = () => {
  const classes = useStyles();

  const todos = useSelector(getTodos);
  let nextId = useSelector(getNextId);
  const isLoading = useSelector(getLoading);

  const dispatch = useDispatch();

  const handleCompleteClick = (id: number) => {
    dispatch(clickComplete(id));
  };

  const handleDelClick = (id: number) => {
    dispatch(clickDelete(id));
  };

  const loadApiData = () => (dispatch: Function, getState: Function) => {
    dispatch(startLoading());
    try {
      // Fake delay for loaded
      setTimeout(async function () {
        const { data } = await api.get("/todos", {
          params: {
            _limit: 7,
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
        dispatch(endLoading());
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const linearLoaded = () => {
    if (isLoading) {
      return <LinearProgress color="secondary" className={classes.loaded} />;
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
                <TableCell
                  component="th"
                  scope="row"
                  className={toDo.ifComplete ? classes.complete : ""}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className={toDo.ifComplete ? classes.complete : ""}
                >
                  {toDo.name}
                </TableCell>
                <TableCell
                  className={`${classes.pointer} ${
                    toDo.ifComplete ? classes.complete : ""
                  }`}
                  component="th"
                  scope="row"
                  onClick={() => handleCompleteClick(toDo.id)}
                >
                  {toDo.ifComplete ? "YES" : "NO"}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className={toDo.ifComplete ? classes.complete : ""}
                >
                  <Button
                    className={classes.buttons}
                    color="secondary"
                    variant="contained"
                    onClick={() => handleDelClick(toDo.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {linearLoaded()}

      <AddToDo />
      <Button
        className={classes.apibuttons}
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
