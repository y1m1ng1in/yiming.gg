export const indexOfMatchListSelected = (state=0, action) => {
  console.log("in reducers getMatchDetail: ", state);
  if(action.type === "get_match_detail") {
    return action.indexOfMatchListSelected;
  } else {
    return state;
  }
}

let constantKeys = [ 
  "id", "accountId", "puuid", "name", "profileIconId", 
  "revisionDate", "summonerLevel"
];

export let constantKeyReducers = {};
constantKeys.forEach(key => constantKeyReducers[key] = (state={}) => state);

export const hasSearchedSummoner = (state=false, action) => {
  return state;
}

export const startIndex = (state=0, action) => {
  return state;
}

export const endIndex = (state=0, action) => {
  return state;
}

export const matchList = (state=[], action) => {
  return state;
}

export const matchStats = (state=[], action) => {
  return state;
}
 