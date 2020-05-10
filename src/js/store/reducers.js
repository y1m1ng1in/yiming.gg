export const url = (state={}, action) => {
  if(action.type === "get_summoner_name_and_server") {
    console.log("reducer called", action);
    return {...state, url: action.url};
  } else {
    // other types of reducers
    return {...state};
  }
}