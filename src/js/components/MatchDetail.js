import React from "react";
import Scoreboard from './Scoreboard'
import '../../stylesheets/champion_spritesheet.css';
import '../../stylesheets/style.css';

const MatchDetail = ({ matchData }) => {
  const scoreboardData = matchData => {
    const key = [
      'championId', 'champLevel', 'kills', 'deaths', 'assists', 'spell1Id', 
      'spell2Id', 'teamId', 'totalMinionsKilled','goldEarned','perk0', 
      'perkSubStyle', 'win', 'neutralMinionsKilled'
    ];
    const itemKey = [
      'item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6'
    ];
    const playerObj = sourceObj => {
      let obj = {};
      key.forEach(k => obj[k] = sourceObj[k]);
      obj['items'] = itemKey.map(i => sourceObj[i]);
      obj['name']  = sourceObj['summonerName'];
      obj['cs']    = obj['neutralMinionsKilled'] + obj['totalMinionsKilled'];
      return obj;
    }

    let summoner            = playerObj(matchData.summonerStat);
    let summonerTeamId      = summoner['teamId'];
    let summonerTeamPlayers = [ summoner ];
    let otherTeamPlayers    = [];
    let otherTeamId         = null;

    Object.keys(matchData.otherPlayerStat).forEach(p => {
      if(matchData.otherPlayerStat[p]['teamId'] == summonerTeamId) {
        summonerTeamPlayers.push(playerObj(matchData.otherPlayerStat[p]));
      } else {
        otherTeamPlayers.push(playerObj(matchData.otherPlayerStat[p]));
        otherTeamId = matchData.otherPlayerStat[p]['teamId'];
      }
    });
    return { 
      summonerTeamStat: matchData.teamStat[summonerTeamId],
      otherTeamStat:    matchData.teamStat[otherTeamId],
      summonerWin:      summoner['win'], 
      summonerTeam:     summonerTeamPlayers, 
      otherTeam:        otherTeamPlayers
    };
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
