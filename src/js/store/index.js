import { createStore, combineReducers } from 'redux';
import { 
  indexOfMatchListSelected, constantKeyReducers, hasSearchedSummoner,
  startIndex, endIndex, matchList, matchStats
} from "./reducers";

const storeFactory = (initialState={}) => 
  createStore(
    combineReducers({ 
      indexOfMatchListSelected, 
      hasSearchedSummoner, 
      startIndex,
      endIndex,
      matchList, 
      matchStats,
      ...constantKeyReducers
    }), 
    initialState
  );

export default storeFactory;