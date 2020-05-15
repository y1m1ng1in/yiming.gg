import React from "react";
import {
  SummonerGeneralInfo, MatchListContainer, MatchDetailContainer
} from "./container"

const Summoner = ({ hasSearchedSummoner }) => 
  <div>
    {
      hasSearchedSummoner 
      ? <div>
          <SummonerGeneralInfo />
          <MatchListContainer />
          <MatchDetailContainer />
        </div> 
      : ""
    }
  </div>

export default Summoner;
