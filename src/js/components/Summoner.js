import React from "react";
import {
  SummonerGeneralInfo, MatchListContainer, MatchDetailContainer
} from "./container";
import '../../stylesheets/style.css';

const Summoner = ({ hasSearchedSummoner, hasError, errorMessage }) => {
  if(hasSearchedSummoner) {
    return (
      <div className="summoner-overall">
        <SummonerGeneralInfo />
        <MatchListContainer />
        <MatchDetailContainer />
      </div>
    );
  } else if(hasError) {
    return (
      <div className="error-message-container">
        <div className="error-image"></div>
        <div className="error-message">
          {errorMessage.statusCode} <br />
          {errorMessage.statusMessage}          
        </div>
      </div>
    )
  } else {
    return "";
  }
}

export default Summoner;
