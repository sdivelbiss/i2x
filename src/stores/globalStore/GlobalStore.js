import { defineAction } from "redux-define";

import { STATUS } from "../../constants/constants";
import reducerRegistry from "../../reducers/reducerRegistry";

//= ========================================================================================================================
// NAME
export const GLOBAL_STORE_NAME = "globalStore";

//= ========================================================================================================================
// ACTION TYPES
export const SET_STATUS = defineAction("SET_STATUS", [], GLOBAL_STORE_NAME);

export const SET_RESULTS = defineAction("SET_RESULTS", [], GLOBAL_STORE_NAME);
export const SET_PHRASES = defineAction(
  "SET_PHRASES",
  ["DELETE"],
  GLOBAL_STORE_NAME
);

//= ========================================================================================================================
// INITIAL STATE
export const globalStore_initialState = {
  status: STATUS.OFFLINE,
  results: [],
  phrases: ["product", "Hi", "Hello", "My name is"]
};

//= ========================================================================================================================
// REDUCER
const globalReducer = (state = globalStore_initialState, action) => {
  switch (action.type) {
    case SET_STATUS.ACTION:
      return {
        ...state,
        status: action.payload
      };

    case SET_RESULTS.ACTION:
      return {
        ...state,
        results: [...state.results, action.payload]
      };

    case SET_PHRASES.ACTION:
      return {
        ...state,
        phrases: [...new Set([...state.phrases, action.payload])] // make it unique items
      };

    case SET_PHRASES.DELETE:
      return {
        ...state,
        phrases: state.phrases.filter((phrase) => phrase !== action.payload)
      };

    default:
      return state;
  }
};
export default globalReducer;
reducerRegistry.register(GLOBAL_STORE_NAME, globalReducer);

//= ========================================================================================================================
// SELECTORS

export const globalStore_getConnectionStatus = (state) =>
  state[GLOBAL_STORE_NAME].status;

export const globalStore_getResults = (state) =>
  state[GLOBAL_STORE_NAME].results;

export const globalStore_getPhrases = (state) =>
  state[GLOBAL_STORE_NAME].phrases;

//= ========================================================================================================================
// ACTIONS

export const globalStore_setConnectionStatus = (status) => {
  return (dispatch) => {
    dispatch({
      type: SET_STATUS.ACTION,
      payload: status
    });
  };
};

export const globalStore_setLogResults = (results = []) => {
  return (dispatch) => {
    dispatch({
      type: SET_RESULTS.ACTION,
      payload: results
    });
  };
};

export const globalStore_setPhrases = (phrase) => {
  return (dispatch) => {
    dispatch({
      type: SET_PHRASES.ACTION,
      payload: phrase
    });
  };
};

export const globalStore_deletePhrase = (phrase) => {
  return (dispatch) => {
    dispatch({
      type: SET_PHRASES.DELETE,
      payload: phrase
    });
  };
};
