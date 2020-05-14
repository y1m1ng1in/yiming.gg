import React from "react";
import {
  SummonerGeneralInfo, MatchListItem 
} from "./container"

const Summoner = ({ hasSearchedSummoner }) => 
  <div>
    {
      hasSearchedSummoner 
      ? <div>
          <SummonerGeneralInfo></SummonerGeneralInfo>
          <MatchListItem index={0}></MatchListItem>
        </div> 
      : ""
    }
  </div>

export default Summoner;
