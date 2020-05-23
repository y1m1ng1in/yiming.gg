import React from "react";
import ScoreboardIndividual from './ScoreboardIndividual';
import ScoreboardTitle from './ScoreboardTitle';

const Scoreboard = ({ players }) => {
  const makeIndividual = (player, index, className) =>
    <ScoreboardIndividual 
      className={className}
      key={index}
      champion={player.championId} 
      spell={{ 
        spellId1: player.spell1Id, 
        spellId2: player.spell2Id 
      }}
      summoner={{ 
        kills:        player.kills,
        deaths:       player.deaths, 
        assists:      player.assists, 
        cs:           player.cs,
        name:         player.name,
        goldEarned:   player.goldEarned,
        perk0:        player.perk0,
        perkSubStyle: player.perkSubStyle
      }}
      items={player.items}/>

  const makeTitle = teamStat => 
    <ScoreboardTitle 
      win={teamStat.win == "Win"}
      baron={teamStat.baronKills}
      tower={teamStat.towerKills + teamStat.inhibitorKills}
      dragon={teamStat.dragonKills}
      riftHerald={teamStat.riftHeraldKills}/>

  return (
    <section className="scoreboard">
      {
        makeTitle(players.summonerTeamStat)
      }
      {
        makeTitle(players.otherTeamStat)
      }
      {
        players.summonerTeam.map((p, i) => 
          makeIndividual(p, i, `summoner-team-${i+1} bg-team-${players.summonerTeamId}`))
      }
      {
        players.otherTeam.map((p, i) =>
          makeIndividual(p, i, `other-team-${i+1} bg-team-${players.otherTeamId}`))
      }
    </section>
  )
}
  
export default Scoreboard;