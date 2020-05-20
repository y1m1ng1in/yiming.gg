import React from "react";
import { MatchListItem } from "./container";
import '../../stylesheets/style.css';

const MatchList = ({ indexRange, matchMetas, onShowMore=f=>f }) => {
  const getMoreMatches = e => {
    let dataToSend = {
      gameIds: matchMetas.matchList.map(m => m.gameId),
      summonerName: matchMetas.summonerName,
      server: matchMetas.server,
      expectedNextIndexStart: indexRange
    }; 

    fetch("/more", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      onShowMore(data.matchStats);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="match-list">
      <ul>
        {
          [...Array(indexRange).keys()].map(index => 
            <MatchListItem index={index} key={index} />
          )
        }
      </ul>
      {
        matchMetas.hasMore ?
          <div className="show-more" onClick={getMoreMatches}>
            Show More...
          </div> : ""
      }   
    </div>  
  );
}
  

export default MatchList;