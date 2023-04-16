// Import core
import { combineReducers } from "redux";
import { USER_NAMESPACE, TODO_NAMESPACE } from "./namespaces";
import userReducer from "./user/userReducer";
import todoReducer from "./todo/todoReducer";

// Import customs

const version = 1;

// combine  all reducers
export default combineReducers({
  version: (state = version) => state,
  [USER_NAMESPACE]: userReducer,
  [TODO_NAMESPACE]: todoReducer,
});

