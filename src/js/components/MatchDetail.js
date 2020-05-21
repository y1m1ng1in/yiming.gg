import React from "react";
import Scoreboard from './Scoreboard'
import '../../stylesheets/champion_spritesheet.css';
import '../../stylesheets/style.css';

const MatchDetail = ({ matchData }) => {
  const scoreboardData = matchData => {
    const key = [
      'championId', 'champLevel', 'kills', 'deaths', 'assists', 'spell1Id', 
      'spell2Id', 'teamId', 'totalMinionsKilled','goldEarned'
    ];
    const itemKey = [
      'item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6'
    ];

    let summoner = {}
    key.forEach(k => summoner[k] = matchData.summonerStat[k]);
    summoner['items'] = itemKey.map(i => matchData.summonerStat[i]);

    let otherplayers = Object.keys(matchData.otherPlayerStat).map(p => {
      let player = {}
      key.forEach(k => player[k] = matchData.otherPlayerStat[p][k]);
      player['items'] = itemKey.map(i => matchData.otherPlayerStat[p][i]);
      player['name'] = matchData.otherPlayerStat[p]['summonerName'];
      return player;
    });
 
    return [summoner, ...otherplayers];
  }

  return (
    <div className="match-detail">
      <div className="match-graphs">
        champion id: {matchData.summonerStat.championId}<br />
        {matchData.summonerStat.kills}/
        {matchData.summonerStat.deaths}/
        {matchData.summonerStat.assists}
      </div>
      <Scoreboard players={scoreboardData(matchData)}/>
    </div>
  )
}
  

export default MatchDetail;
