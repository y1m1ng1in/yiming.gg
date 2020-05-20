import React from "react";
import '../../stylesheets/champion_spritesheet_50.css';
import '../../stylesheets/summoner_spritesheet_65.css';
import '../../stylesheets/item_spritesheet_65.css';

const ScoreboardIndividual = ({ champion, spell, summoner, items }) => {
  return (
    <div className="indivdual">
      <div className={`champion-50-${champion} sprite`}></div>
      <div className={`summoner-60-${spell.spellId1} sprite`}></div>
      <div className={`summoner-60-${spell.spellId2} sprite`}></div>
      <div className="scoreboard-individual-info">
        {summoner.name} <br />
        {summoner.kills}/{summoner.deaths}/{summoner.assists}
      </div>
      {
        items.map((item, i) => 
          <div key={i} className={`item-65-${item} sprite`}></div>
        )
      }
      <div className="scoreboard-individual-cs">
        {summoner.cs}
      </div>
    </div>
  )
}

export default ScoreboardIndividual;