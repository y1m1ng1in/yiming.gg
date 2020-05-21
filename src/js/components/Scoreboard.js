import React from "react";
import ScoreboardIndividual from './ScoreboardIndividual';

const Scoreboard = ({ players }) => {
  return (
    <section className="scoreboard">
      <div className="scoreboard-title-blue"></div>
      <div className="scoreboard-title-red"></div>
      {
        players.map((p, i) => 
          <ScoreboardIndividual 
            key={i}
            champion={p.championId} 
            spell={{ spellId1: p.spell1Id, spellId2: p.spell2Id }}
            summoner={{ 
              kills: p.kills,
              deaths: p.deaths, 
              assists: p.assists, 
              cs: p.totalMinionsKilled,
              name: p.name,
              goldEarned: p.goldEarned,
              perk0: p.perk0,
              perkSubStyle: p.perkSubStyle
            }}
            items={p.items}/>
        )
      }
    </section>
  )
}
  

export default Scoreboard;