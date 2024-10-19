import { DATA, DETAIL_ITEM, LOGIN_TRACKER } from "./actions";

const initstate = {
  is_login: localStorage.getItem("token") ? true : false,
  data: [],
  item: localStorage.getItem("task_details")
    ? JSON.parse(localStorage.getItem("task_details"))
    : {},
};

export function Reducer(state = initstate, action) {
  switch (action.type) {
    case LOGIN_TRACKER:
      return { ...state, is_login: action.payload };
    case DATA:
      return { ...state, data: action.payload };
    case DETAIL_ITEM:
      return { ...state, item: action.payload };
    default:
      return state;
  }
}
