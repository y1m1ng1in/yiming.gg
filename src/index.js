import React from "react";
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from "./js/App";
import storeFactory from "./js/store/";

const store = storeFactory(window.__INITIAL_STATE__);

window.React = React;
window.store = store;

console.log(store.getState());

const wrapper = document.getElementById("app");
hydrate(
  <Provider store={store}>
    <App />
  </Provider>, 
  wrapper
);