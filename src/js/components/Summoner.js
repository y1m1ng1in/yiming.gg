import React from "react";
import {
  SummonerGeneralInfo, MatchListContainer
} from "./container"

const Summoner = ({ hasSearchedSummoner }) => 
  <div>
    {
      hasSearchedSummoner 
      ? <div>
          <SummonerGeneralInfo />
          <MatchListContainer />
        </div> 
      : ""
    }
  </div>

export default Summoner;
