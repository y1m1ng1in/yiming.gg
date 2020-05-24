import React from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const MatchGraphs = ({ data }) => {
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

  return (
    <div className="match-graphs">
      <BarChart teamRed={teamData[200].damage} teamBlue={teamData[100].damage} />
      <PieChart teamRed={teamData[200].damage} teamBlue={teamData[100].damage} />
    </div>
  )
}

export default MatchGraphs;