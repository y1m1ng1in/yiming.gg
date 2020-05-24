import React from "react";

const ScoreboardTower = ({ tower }) => 
  <div className="tower-icon scoreboard-title-icon">
    tower: {tower}
  </div>

const ScoreboardDragon = ({ dragon }) => 
  <div className="dragon-icon scoreboard-title-icon">
    dragon: {dragon}
  </div>

const ScoreboardBaron = ({ baron, riftHerald }) =>
  <div className="baron-icon scoreboard-title-baron">
    rift herald/baron: {baron}/{riftHerald}
  </div>

const ScoreboardTitle = ({ win, baron, tower, dragon, riftHerald, order }) => {
  return (
    <div className={
      win ? "scoreboard-title-win scoreboard-title" : "scoreboard-title-lose scoreboard-title"
    }>
      <ScoreboardTower tower={tower} />
      <ScoreboardDragon dragon={dragon} />
      <ScoreboardBaron baron={baron} riftHerald={riftHerald} />
      <div className="scoreboard-title-champion">champion</div>
      <div className="scoreboard-title-kda">kda</div>
      <div className="scoreboard-title-item">Item</div>
      <div className="scoreboard-title-cs">cs/gold</div>
    </div>
  )
}

export default ScoreboardTitle;