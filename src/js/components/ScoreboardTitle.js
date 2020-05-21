import React from "react";

const ScoreboardTitle = ({ win, baron, tower, dragon, riftHerald }) => {
  return (
    <div className={
      win ? "scoreboard-title-win scoreboard-title" : "scoreboard-title-lose scoreboard-title"
    }>
      <div className="scoreboard-title-team-stat">
        <div className="scoreboard-title-tower">
          <div className="tower-icon"></div>
          tower: {tower} 
        </div>
        <div className="scoreboard-title-dragon">
          <div className="dragon-icon"></div>
          dragon: {dragon} 
        </div>
        <div className="scoreboard-title-baron">
          <div className="baron-icon"></div>
          rift herald/baron: {baron}/{riftHerald}
        </div>
      </div>
      <div className="scoreboard-title-items">
        <div className="scoreboard-title-champion">champion</div>
        <div className="scoreboard-title-kda">kda</div>
        <div className="scoreboard-title-item">Item</div>
        <div className="scoreboard-title-cs">cs/gold</div>
      </div>
    </div>
  )
}

export default ScoreboardTitle;