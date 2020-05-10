import { createStore } from 'redux';
import { url } from "./reducers";

const storeFactory = () => createStore(url);

export default storeFactory;