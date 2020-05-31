import { createStore, combineReducers } from 'redux';
import { 
  indexOfMatchListSelected, constantKeyReducers, hasSearchedSummoner,
  startIndex, endIndex, matchList, matchStats, graphDisplay
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
      graphDisplay,
      ...constantKeyReducers
    }), 
    initialState
  );

export default storeFactory;