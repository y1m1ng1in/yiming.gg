import { createStore } from 'redux';
import { url } from "./reducers";

const storeFactory = (initialState={}) => createStore(url, initialState);

export default storeFactory;