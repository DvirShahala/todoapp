import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IToDo } from "../models/inerfaces";
import AddToDo from "./AddToDo";
import { Button, LinearProgress, makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getLoading, getTodos } from "../store/selectors/selectors";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deleteTodo,
  initState,
  loadApiData,
  loadApiEverySecData,
  makeIterval,
  toggleTodo,
} from "../store/actions/actionsCreator";
import { useState } from "react";

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
    textTransform: "none",
  },
  buttonEverySec: {
    marginLeft: "5%",
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
  const dispatch = useDispatch();

  const [isInit, setIsInit] = useState(false);

  const todos = useSelector(getTodos);
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    dispatch(initState());
  }, []);

  const handleCompleteClick = (todo: IToDo) => {
    dispatch(toggleTodo(todo));
  };

  const handleDelClick = (todo: IToDo) => {
    dispatch(deleteTodo(todo));
  };

  const handleApiClick = async () => {
    dispatch(loadApiData());
  };

  const handleApiEverySecClick = () => {
    if (!isInit) {
      dispatch(loadApiEverySecData());
      setIsInit(true);
    }
    dispatch(makeIterval());
  };

  return (
    <>
      <h1>To Do:</h1>
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
                  onClick={() => handleCompleteClick(toDo)}
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
                    onClick={() => handleDelClick(toDo)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoading && (
        <LinearProgress color="primary" className={classes.loaded} />
      )}

      <AddToDo />
      <Button
        className={classes.apibuttons}
        color="primary"
        variant="outlined"
        onClick={() => handleApiClick()}
      >
        Load More Todos
      </Button>

      <Button
        className={`${classes.apibuttons} ${classes.buttonEverySec}`}
        color="primary"
        variant="outlined"
        onClick={() => handleApiEverySecClick()}
      >
        Load From Api every 2 sec
      </Button>
    </>
  );
};

export default TodoList;
