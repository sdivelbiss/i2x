import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import initialState from "./rootReducer";
import reducerRegistry from "./reducerRegistry";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combine = (reducers) => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach((item) => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return combineReducers({ ...reducers });
};

const reducer = combine(reducerRegistry.getReducers());

export const initStore = () => {
  const middlewares = [thunk];
  const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(...middlewares))
  );

  // Replace the store's reducer when new reducer is registered/added
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combine(reducers));
  });

  return store;
};

export default initStore;
