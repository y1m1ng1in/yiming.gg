import React from "react";
import '../../stylesheets/style.css';
import '../../stylesheets/rank_spritesheet_24.css';

const SummonerGeneral = ({ name, level, icon, rankInfo }) => 
  <section className="summoner-general">
    {
      rankInfo.tier !== undefined 
        ? <div className={`rank-24-${rankInfo.tier} rank-logo`}></div>
        : <div className="rank-24-UNRANKED rank-logo"></div> 
    }
    <div className="name-level">
      <span id="summoner-name">{name}</span>
      <span id="level">Level:&nbsp;{level}</span>
      {
        rankInfo.tier !== undefined || rankInfo.rank !== undefined
          ? <span id="tier-rank">{rankInfo.tier}&nbsp;{rankInfo.rank}</span>
          : <span id="tier-rank">Unranked</span>
      }
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
