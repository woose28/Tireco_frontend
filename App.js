import React, { useState } from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/store/modules";
import TirecoContainer from "./src/container/TirecoContainer";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  
  return (
    <Provider store={store}>
      <TirecoContainer/>
    </Provider>
  );
};

export default App;
