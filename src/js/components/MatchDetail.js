import React from "react";

const MatchDetail = ({ matchData }) => 
  <div>
    champion id: {matchData.summonerStat.championId}<br />
    {matchData.summonerStat.kills}/
    {matchData.summonerStat.deaths}/
    {matchData.summonerStat.assists}
  </div>

export default MatchDetail;
