import React from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { MatchGraphController } from "./container";

const MatchGraphs = ({ display, data }) => {
  const getValues = teamPlayers => {
    let result = {}
    result.damage = teamPlayers.map(
      player => [player.totalDamageDealtToChampions, player.championId]
    );
    result.gold = teamPlayers.map(
      player => [player.goldEarned, player.championId]
    );
    result.visionScore = teamPlayers.map(
      player => [player.visionScore, player.championId]
    );
    return result;
  }

  const barChartData = () => {
    let result = {}
    result[data.summonerTeamId] = getValues(data.summonerTeam);
    result[data.otherTeamId] = getValues(data.otherTeam);
    return result;
  }

  const teamData = barChartData();
  let teamBlueData = []
  let teamReadData = []
  
  if(display.view === 'damage') {
    teamReadData = teamData[200].damage
    teamBlueData = teamData[100].damage
  } else if(display.view === 'gold') {
    teamReadData = teamData[200].gold
    teamBlueData = teamData[100].gold
  } else {
    teamReadData = teamData[200].visionScore
    teamBlueData = teamData[100].visionScore
  }

  return (
    <div className="match-graphs">
      <MatchGraphController />
      <BarChart teamRed={teamReadData} teamBlue={teamBlueData} />
      <PieChart teamRed={teamReadData} teamBlue={teamBlueData} />
    </div>
  )
}

export default MatchGraphs;