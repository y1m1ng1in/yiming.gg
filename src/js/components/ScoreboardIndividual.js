import React from "react";
import '../../stylesheets/champion_spritesheet_35.css';
import '../../stylesheets/summoner_spritesheet_35.css';
import '../../stylesheets/item_spritesheet_45.css';
import '../../stylesheets/perk_spritesheet_70.css';
import '../../stylesheets/rune_spritesheet_50.css';

const ScoreboardChampion = ({ champion }) => 
  <div className="champion-sprite-container">
    <div className={`champion-35-${champion} champion sprite`}></div>
  </div>

const ScoreboardSummonerSpells = ({ spell }) => 
  <div className="scoreboard-summoner-spells">
    <div className={`summoner-35-${spell.spellId1} sprite`}></div>
    <div className={`summoner-35-${spell.spellId2} sprite`}></div>
  </div>

const ScoreboardRunes = ({ perk0, perkSubStyle }) => 
  <div className="scoreboard-perk-runes">
    <div className={`rune-50-${perk0} sprite`}></div>
    <div className={`perk-70-${perkSubStyle} sprite`}></div>
  </div>

const ScoreboardItem = ({ item, className }) => 
  <div className={`${className}`}>
    {
      item !== 0 
      ? <div className={`item-45-${item} sprite item-sprite`}></div>
      : <div className={`empty-item sprite item-sprite`}></div>
    }
  </div>

const ScoreboardSummonerName = ({ name }) => 
    name !== undefined && name.length >= 16
    ? <div className="individual-name long-name">{name}</div>
    : <div className="individual-name">{name}</div>
  
const ScoreboardKda = ({ kills, deaths, assists }) =>
  <div className="individual-kda">{kills}/{deaths}/{assists}</div>

const ScoreboardIndividual = ({ champion, spell, summoner, items, className }) => {
  return (
    <div className={`individual ${className}`}>
      <ScoreboardChampion champion={champion} />
      <ScoreboardSummonerSpells spell={spell} />
      <ScoreboardRunes perk0={summoner.perk0} perkSubStyle={summoner.perkSubStyle} />
      <ScoreboardSummonerName name={summoner.name} />
      <ScoreboardKda kills={summoner.kills} deaths={summoner.deaths} assists={summoner.assists} />
      {
        items.map((item, i) => 
          <ScoreboardItem item={item} key={i} className={`item-index-${i}`} />)
      }
      <div className="scoreboard-individual-cs">
        {summoner.cs}<br />
        {summoner.goldEarned}g
      </div>
    </div>
  )
}

export default ScoreboardIndividual;