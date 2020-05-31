import React from "react";
import '../../stylesheets/style.css';

const GraphController = ({ display, onSelect }) => {
  const onClick = e => {
    onSelect({
      mode: e.target.dataset.mode,
      view: e.target.dataset.view
    });
  }

  let mode = display.mode;
  let view = display.view;

  return (
    <div className="graph-control-panel">
      <h3 className="graph-control-panel-item">Individual</h3>
      <button 
        className={`graph-control-panel-item ${mode === 'individual' ? "selected" : ""} ${view === 'damage' && mode === 'individual' ? 'chosed': ''}`}
        data-mode="individual"
        data-view="damage" 
        onClick={onClick}>Damage</button>
      <button 
        className={`graph-control-panel-item ${mode === 'individual' ? "selected" : ""} ${view === 'gold' && mode === 'individual' ? 'chosed': ''}`}
        data-mode="individual"
        data-view="gold"
        onClick={onClick}>Gold</button>
      <button 
        className={`graph-control-panel-item ${mode === 'individual' ? "selected" : ""} ${view === 'vision' && mode === 'individual' ? 'chosed': ''}`} 
        data-mode="individual"
        data-view="vision" 
        onClick={onClick}>Vision Score</button>

      <h3 className="graph-control-panel-item">Team</h3>
      <button 
        className={`graph-control-panel-item ${mode === 'team' ? "selected" : ""} ${view === 'damage' && mode === 'team' ? 'chosed': ''}`}
        data-mode="team"
        data-view="damage" 
        onClick={onClick}>Damage</button>
      <button 
        className={`graph-control-panel-item ${mode === 'team' ? "selected" : ""} ${view === 'gold' && mode === 'team' ? 'chosed': ''}`} 
        data-mode="team"
        data-view="gold" 
        onClick={onClick}>Gold</button>
      <button 
        className={`graph-control-panel-item ${mode === 'team' ? "selected" : ""} ${view === 'vision' && mode === 'team' ? 'chosed': ''}`} 
        data-mode="team"
        data-view="vision" 
        onClick={onClick}>Vision Score</button>
    </div>
  )
}
  

export default GraphController;
