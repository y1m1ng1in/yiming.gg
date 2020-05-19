import React from "react";
import '../../stylesheets/champion_spritesheet.css';

const MatchDetail = ({ matchData }) => 
  <div>
    champion id: {matchData.summonerStat.championId}<br />
    {matchData.summonerStat.kills}/
    {matchData.summonerStat.deaths}/
    {matchData.summonerStat.assists}
    <div className="champion-266"></div>
  </div>

export default MatchDetail;
