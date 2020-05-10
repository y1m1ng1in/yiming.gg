import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./js/App";
import storeFactory from "./js/store/";

const store = storeFactory();
console.log(store.getState());

const wrapper = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  wrapper
);