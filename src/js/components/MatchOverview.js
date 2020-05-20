import React from "react";
import '../../stylesheets/style.css';

const MatchOverview = ({ champion, kda, matchInfo, index, onSelect=f=>f }) => {
  const select = () => {
    console.log("selected", index);
    onSelect(index);
  }

  return (
    <li className="match-list-item">
      <div onClick={select}>
        <p>{matchInfo.win}</p>
        <p>champion used: {champion}</p>
        <p>{kda.kills}/{kda.deaths}/{kda.assists}</p>
        <p>
          duration: {matchInfo.timestamp}  queueId: {matchInfo.queue}
        </p>
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
