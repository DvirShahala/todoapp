import axios from "axios";
import { map, Subject, switchMap, takeWhile } from "rxjs";
import { IToDo } from "../../models/inerfaces";
import { getNextId, getTodos } from "../selectors/selectors";
import { endLoading, loadToDo, startLoading } from "./actions";
import { interval } from "rxjs";
const api = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
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
          name: todoFromApi.title,
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

// export const loadApiEverySecData =
//   () => async (dispatch: Function, getState: Function) => {
//     const nextId = getNextId(getState());

//     dispatch(startLoading());
//     try {
//       const { data } = await api.get("/todos", {
//         params: {
//           _limit: 2,
//         },
//       });
//       const loadTodos: IToDo[] = data.map((todoFromApi: any, index: number) => {
//         let newId = nextId + index;
//         return {
//           id: newId,
//           name: todoFromApi.title,
//           ifComplete: false,
//         };
//       });
//       dispatch(loadToDo(loadTodos));
//       dispatch(endLoading());
//     } catch (error) {
//       console.log(error);
//     }
//   };

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
          console.log(data);

          return data.map((todoFromApi: any, index: number) => {
            const nextId = getNextId(getState());
            let newId = index + nextId;
            return {
              id: newId,
              name: todoFromApi.title,
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
  const subscription = intervalForApi
    .pipe(
      takeWhile(() => {
        const todoLength = getTodos(getState());
        return todoLength.length < 10;
      })
      // map(() => {
      //   const todoLength = getTodos(getState());
      //   if (todoLength.length > 10) {
      //     subscription.unsubscribe();
      //   }
      //   } else {
      //     makeNext();
      //   }
      // })
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
