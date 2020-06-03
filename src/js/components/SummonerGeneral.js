import React from "react";
import '../../stylesheets/style.css';
import '../../stylesheets/rank_spritesheet_24.css';

const SummonerGeneral = ({ name, level, icon, rankInfo }) => 
  <section className="summoner-general">
    {/* <h3>{name}</h3>
    <p>summoner level: {level}</p>
    {
      rankInfo !== {} 
      ? <div>
          {rankInfo.tier}/{rankInfo.leaguePoints}
          <div className={`rank-24-${rankInfo.tier}`}></div>
        </div>
      : ""
    } */}
    <div className={`rank-24-${rankInfo.tier} rank-logo`}></div>
    <div className="name-level">
      <span id="summoner-name">{name}</span>
      <span id="level">Level:&nbsp;{level}</span>
      <span id="tier-rank">{rankInfo.tier}&nbsp;{rankInfo.rank}</span>
    </div>
  </section>

SummonerGeneral.defaultProps = {
  name: "",
  level: 0,
  icon: 0,
  rankInfo: {
    tier: "UNRANKED",
    rank: "",
    wins: "",
    losses: "",
    leaguePoints: ""
  }
}
  
export default SummonerGeneral;
