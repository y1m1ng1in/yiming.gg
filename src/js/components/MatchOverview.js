import React, { useEffect } from "react";
import '../../stylesheets/style.css';
import '../../stylesheets/champion_spritesheet_60.css';

const printDate = timestamp => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const date   = new Date(timestamp);
  const year   = date.getFullYear();
  const month  = months[date.getMonth()];
  const day    = date.getDate();
  const now    = new Date(Date.now());

  if(now.getFullYear() === year && 
     now.getMonth() === date.getMonth() && 
     now.getDate() === day) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  } else {
    return `${month} ${day}, ${year}`;
  }
}

const MatchOverview = ({ champion, kda, matchInfo, index, outstanding, onSelect=f=>f }) => {
  useEffect(() => {
    let mql = window.matchMedia('(min-width: 768px)');
    mql.addEventListener("change", e => {
      if(e.matches) {
        document.querySelector(".match-detail").style.display = "grid";
        document.querySelector(".summoner-general").style.display = "block";
        document.querySelector(".match-list").style.display = "block";
      } else {
        document.querySelector(".match-detail").style.display = "none";
        document.querySelector(".summoner-general").style.display = "block";
        document.querySelector(".match-list").style.display = "block";
      }
    });
  })  

  const select = () => {
    console.log("selected", index);
    console.log("win?", matchInfo.win);
    onSelect(index);
    let detail       = document.querySelector(".match-detail");
    let summonerInfo = document.querySelector(".summoner-general");
    let matchList    = document.querySelector(".match-list");
    let isHidden = window.getComputedStyle(detail).getPropertyValue("display");
    if(isHidden === "none") {
      console.log(detail.style.display)
      detail.style.display = "grid";
      summonerInfo.style.display = "none";
      matchList.style.display = "none";
    } else {
      console.log(detail)
    }
  }

  return (
    <li className="match-list-item" onClick={select}>
      <div className={`champion-60-${champion} sprite`}></div>
      <div className="match-list-item-meta">
        {
          matchInfo.win 
          ? <div className="win">Victory</div> 
          : <div className="lose">Defeat</div>
        }
        <div className="meta-info">
          queueId: {matchInfo.queue} <br />
          {printDate(matchInfo.timestamp)}
        </div>
      </div>
      <div className="match-list-item-result">
        {kda.kills}/{kda.deaths}/{kda.assists}
        <div className="match-list-item-icons">
          {
            outstanding.mostKills ? <div className="most-kill"></div> : ""
          }
          {
            outstanding.mostGoldEarned ? <div className="most-gold"></div> : ""
          }
          {
            outstanding.mostDamageDealt ? <div className="most-damage-dealt"></div> : ""
          }
          {
            outstanding.mostDamageTaken ? <div className="most-damage-taken"></div> : ""
          }
          {
            outstanding.tripleKills ? <div className="triple">3</div> : ""
          }
          {
            outstanding.quadraKills ? <div className="quadra">4</div> : ""
          }
          {
            outstanding.pentaKills ? <div className="panta">5</div> : ""
          }
        </div>
      </div>
    </li>
  )
}

MatchOverview.defaultProps = {
  champion: 0,
  kda: {
    kills: 0,
    deaths: 0,
    assists: 0
  },
  matchInfo: {
    timestamp: 0,
    queue: 0
  }
}
  
export default MatchOverview;
