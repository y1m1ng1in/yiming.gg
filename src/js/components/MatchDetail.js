import React from "react";
import Scoreboard from './Scoreboard';
import { MatchGraphContainer } from './container';
import '../../stylesheets/style.css';

const MatchDetail = ({ matchData, summonerName }) => {
  const scoreboardData = matchData => {
    const key = [
      'championId', 'champLevel', 'kills', 'deaths', 'assists', 'spell1Id', 
      'spell2Id', 'teamId', 'totalMinionsKilled','goldEarned','perk0', 'visionScore',
      'perkSubStyle', 'win', 'neutralMinionsKilled', 'totalDamageDealtToChampions'
    ];
    const itemKey = [
      'item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6'
    ];
    const playerObj = (sourceObj, summonerName=undefined) => {
      let obj = {};
      key.forEach(k => obj[k] = sourceObj[k]);
      obj['items'] = itemKey.map(i => sourceObj[i]);
      summonerName === undefined 
        ? obj['name'] = sourceObj['summonerName']
        : obj['name'] = summonerName;
      obj['cs']    = obj['neutralMinionsKilled'] + obj['totalMinionsKilled'];
      return obj;
    }

    let summoner            = playerObj(matchData.summonerStat, summonerName);
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
      otherTeam:        otherTeamPlayers,
      summonerTeamId:   summonerTeamId,
      otherTeamId:      otherTeamId
    };
  }

  const data = scoreboardData(matchData);

  return (
    <div className="match-detail">
      <MatchGraphContainer data={data} />
      <Scoreboard players={data}/>
    </div>
  )
}
  

export default MatchDetail;
