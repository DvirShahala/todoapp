import axios from "axios";
import { IToDo } from "../../models/inerfaces";
import { getNextId } from "../selectors/selectors";
import { endLoading, loadToDo, startLoading } from "./actions";

const api = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
});

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
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};
