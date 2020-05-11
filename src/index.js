import React from "react";
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from "./js/App";
import storeFactory from "./js/store/";

const store = storeFactory();
console.log(store.getState());
console.log(window.__INITINAL_STATE__);

const wrapper = document.getElementById("app");
hydrate(
  <Provider store={store}>
    <App />
  </Provider>, 
  wrapper
);