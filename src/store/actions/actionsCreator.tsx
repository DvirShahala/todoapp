import axios from "axios";
import { map, Subject, switchMap, takeWhile } from "rxjs";
import { IToDo } from "../../models/inerfaces";
import { getNextId, getTodos } from "../selectors/selectors";
import {
  addToDos,
  clickComplete,
  clickDelete,
  endLoading,
  loadToDo,
  startLoading,
} from "./actions";
import { interval } from "rxjs";
const api = axios.create({
  baseURL: `http://localhost:8080/api/`,
});

const subject = new Subject();
const intervalForApi = interval(3000);

export const loadApiData = () => (dispatch: Function, getState: Function) => {
  const nextId = getNextId(getState());

  dispatch(startLoading());
  try {
    // Fake delay for loaded
    setTimeout(async function () {
      const { data } = await api.get("/todos", {
        params: {
          _limit: 7,
        },
      });

      const loadTodos: IToDo[] = data.map((todoFromApi: any, index: number) => {
        let newId = index + nextId;
        return {
          id: newId,
          name: todoFromApi.name,
          ifComplete: false,
        };
      });
      dispatch(loadToDo(loadTodos));
      dispatch(endLoading());
    }, 1500);
  } catch (error) {
    console.log(error);
  }
};

export const loadApiEverySecData =
  () => (dispatch: Function, getState: Function) => {
    dispatch(startLoading());
    subject
      .pipe(
        switchMap(() => {
          dispatch(startLoading());
          return getDataFromApi();
        }),
        map(({ data }) => {
          return data.map((todoFromApi: any, index: number) => {
            const nextId = getNextId(getState());
            let newId = index + nextId;
            return {
              id: newId,
              name: todoFromApi.name,
              ifComplete: false,
            };
          });
        }),
        map((res: any) => {
          dispatch(loadToDo(res));
          dispatch(endLoading());
        })
      )
      .subscribe();
  };

export const makeNext = () => {
  subject.next(1);
};

export const makeIterval = () => (dispatch: Function, getState: Function) => {
  intervalForApi
    .pipe(
      takeWhile(() => {
        const todoLength = getTodos(getState());
        return todoLength.length < 10;
      })
    )
    .subscribe(() => makeNext());
};

export const getDataFromApi = async () => {
  return await api.get("/todos", {
    params: {
      _limit: 2,
    },
  });
};

export const addTodoToBe =
  (todoName: string) => async (dispatch: Function, getState: Function) => {
    const nextId = getNextId(getState());
    dispatch(startLoading);

    try {
      await api.post("/todos/addTodo", {
        id: nextId,
        name: todoName,
        ifComplete: false,
      });
      dispatch(addToDos(todoName));
    } catch (error) {
      console.log(error);
    }
    dispatch(endLoading());
  };

export const deleteTodo =
  (todo: IToDo) => async (dispatch: Function, getState: Function) => {
    dispatch(startLoading);

    try {
      await api.delete("/todos/delete", {
        data: {
          id: todo.id,
          name: todo.name,
          ifComplete: todo.ifComplete,
        },
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(clickDelete(todo));
    dispatch(endLoading);
  };

export const toggleTodo =
  (todo: IToDo) => async (dispatch: Function, getState: Function) => {
    dispatch(startLoading);

    try {
      await api.put("/todos/toggleComplete", {
        id: todo.id,
        name: todo.name,
        ifComplete: todo.ifComplete,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(clickComplete(todo));
    dispatch(endLoading);
  };

export const initState =
  () => async (dispatch: Function, getState: Function) => {
    try {
      const { data } = await api.get("/todos");

      const loadTodos: IToDo[] = data.map((todoFromApi: any, index: number) => {
        return {
          id: todoFromApi.id,
          name: todoFromApi.name,
          ifComplete: todoFromApi.ifComplete,
        };
      });

      dispatch(loadToDo(loadTodos));
    } catch (error) {
      console.log(error);
    }
  };
