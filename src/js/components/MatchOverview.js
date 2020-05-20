import React from "react";
import '../../stylesheets/style.css';
import '../../stylesheets/champion_spritesheet_65.css';

const printDate = timestamp => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const date   = new Date(timestamp);
  const year   = date.getFullYear();
  const month  = months[date.getMonth()];
  const day    = date.getDay();
  const now    = new Date(Date.now());

  if(now.getFullYear() === year && 
     now.getMonth() === date.getMonth() && 
     now.getDay() === day) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  } else {
    return `${month} ${day}, ${year}`;
  }
}

const MatchOverview = ({ champion, kda, matchInfo, index, onSelect=f=>f }) => {
  const select = () => {
    console.log("selected", index);
    console.log("win?", matchInfo.win);
    onSelect(index);
  }

  return (
    <li className="match-list-item" onClick={select}>
      <div className={`champion-65-${champion} sprite`}></div>
      <div className="match-list-item-result">
        {matchInfo.win} <br />
        {kda.kills}/{kda.deaths}/{kda.assists}
      </div>
      <div className="match-list-item-meta">
        {printDate(matchInfo.timestamp)} <br /> 
        queueId: {matchInfo.queue}
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
