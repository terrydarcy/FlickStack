import React from "react";
import { createStore } from "redux";
import songDataReducers from "./redux/reducers";
import { Provider } from "react-redux";
import DataWrapper from "./DataWrapper";

const ReduxWrapper = () => {
  const store = createStore(
    songDataReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return (
    <Provider store={store}>
      <DataWrapper />
    </Provider>
  );
};

export default ReduxWrapper;
