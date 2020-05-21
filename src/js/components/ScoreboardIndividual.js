import React from "react";
import '../../stylesheets/champion_spritesheet_35.css';
import '../../stylesheets/summoner_spritesheet_35.css';
import '../../stylesheets/item_spritesheet_45.css';

const ScoreboardIndividual = ({ champion, spell, summoner, items }) => {
  return (
    <div className="indivdual">
      <div className={`champion-35-${champion} sprite champion`}></div>
      <div className="scoreboard-summoner-spells">
        <div className={`summoner-35-${spell.spellId1} sprite`}></div>
        <div className={`summoner-35-${spell.spellId2} sprite`}></div>
      </div>
      <div className="scoreboard-individual-info">
        {summoner.name} <br />
        {summoner.kills}/{summoner.deaths}/{summoner.assists}
      </div>
      {
        items.map((item, i) => 
          item !== 0 
          ? <div key={i} className={`item-45-${item} sprite item-sprite`}></div>
          : <div key={i} className="empty-item sprite item-sprite"></div>
        )
      }
      <div className="scoreboard-individual-cs">
        {summoner.cs}<br />
        {summoner.goldEarned}g
      </div>
    </div>
  )
}

export default ScoreboardIndividual;