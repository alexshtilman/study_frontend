import { combineReducers } from "redux";
import { SET_EMPLOYEES, SET_USER_DATA, SET_TOAST } from "./common";
const reducerEmployees = (state = [], action) => {
  return action.type === SET_EMPLOYEES ? action.payload.slice(0) : state;
};
const reducerUserData = (state = {}, action) => {
  return action.type === SET_USER_DATA ? { ...action.payload } : state;
};
const reducerToast = (state = {}, action) => {
  return action.type === SET_TOAST ? { ...action.payload } : state;
};
export default combineReducers({
  employees: reducerEmployees,
  userData: reducerUserData,
  toast: reducerToast,
});
