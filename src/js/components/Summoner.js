import React from "react";
import {
  SummonerGeneralInfo, MatchListContainer, MatchDetailContainer
} from "./container";
import '../../stylesheets/style.css';

const Summoner = ({ hasSearchedSummoner }) => {
  if(hasSearchedSummoner) {
    return (
      <div className="summoner-overall">
        <SummonerGeneralInfo />
        <MatchListContainer />
        <MatchDetailContainer />
      </div>
    );
  } else {
    return "";
  }
}




export default Summoner;
