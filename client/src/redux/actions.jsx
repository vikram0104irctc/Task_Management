export const LOGIN_TRACKER = "LOGIN_TRACKER";
export const DATA = "DATA";
export const DETAIL_ITEM = "DETAIL_ITEM";

export const loginTracker = (payload) => {
  return {
    type: LOGIN_TRACKER,
    payload,
  };
};

export const dataRefresher = (payload) => {
  return {
    type: DATA,
    payload,
  };
};

export const detailItem = (payload) => {
  return {
    type: DETAIL_ITEM,
    payload,
  };
};
