import React from "react";
import { MatchListItem } from "./container"

const MatchList = ({ indexRange }) => 
  <ul>
    {
      [...Array(indexRange).keys()].map(index => 
        <MatchListItem index={index} key={index} />
      )
    }
  </ul>

export default MatchList;