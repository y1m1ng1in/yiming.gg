import React from "react";
import '../../stylesheets/champion_spritesheet.css';
import '../../stylesheets/style.css';

const MatchDetail = ({ matchData }) => 
  <div className="match-detail">
    champion id: {matchData.summonerStat.championId}<br />
    {matchData.summonerStat.kills}/
    {matchData.summonerStat.deaths}/
    {matchData.summonerStat.assists}
    <div className="champion-266"></div>
  </div>

export default MatchDetail;
