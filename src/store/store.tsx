import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import todoReducer from "./reducers/reducer";
import thunk from "redux-thunk";

const store = createStore(
  todoReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
