import React, { useEffect } from "react";
import {
  faArrowLeft, faAngleDoubleUp, faAngleDoubleDown 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../stylesheets/style.css';

const GraphController = ({ display, onSelect }) => {
  const onClick = e => {
    onSelect({
      mode: e.target.dataset.mode,
      view: e.target.dataset.view
    });
  }

  const toggle = e => {
    let clicked = e.target.id;
    if(e.target.tagName === "svg") {
      clicked = e.target.parentNode.id;
    }
    if(clicked === 'down') {
      e.target.classList.add("hidden");
      document.querySelector("#up").classList.remove("hidden");
      document.querySelector(".graph-control-panel-togglable").style.height = '100%';
    } else if(clicked === "up") {
      e.target.classList.add("hidden");
      document.querySelector("#down").classList.remove("hidden");
      document.querySelector(".graph-control-panel-togglable").style.height = '35px';
    }
  }

  let mode = display.mode;
  let view = display.view;

  const item = (dataMode, dataView, label) => 
    <button 
      className={`graph-control-panel-item ${
        mode === dataMode ? "selected" : ""
      } ${view === dataView && mode === dataMode ? 'chosed': ''}`}
      data-mode={dataMode}
      data-view={dataView}
      onClick={onClick}>{label}</button>

  const elementFixed = () => 
    <div className="graph-control-panel-fixed">      
      <h3 className="graph-control-panel-item">Individual</h3>
      { item("individual", "damage", "Damage") }
      { item("individual", "gold", "Gold") }
      { item("individual", "vision", "Vision Score") }
      <h3 className="graph-control-panel-item">Team</h3>
      { item("team", "damage", "Damage") }
      { item("team", "gold", "Gold") }
      { item("team", "vision", "Vision Score") }
    </div>

  const elemetTogglable = () => 
    <div className="graph-control-panel-togglable">      
      <div className="graph-control-panel-item first-line-toggle">
        <button className="back">
          <FontAwesomeIcon icon={faArrowLeft} />&nbsp;matchlist
        </button>
        <button onClick={toggle} id="down" className="control-panel-toggle">
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </button>
        <button onClick={toggle} id="up" className="control-panel-toggle hidden">
          <FontAwesomeIcon icon={faAngleDoubleUp} />
        </button>
      </div>
      <h3 className="graph-control-panel-item">Individual</h3>
      { item("individual", "damage", "Damage") }
      { item("individual", "gold", "Gold") }
      { item("individual", "vision", "Vision Score") }
      <h3 className="graph-control-panel-item">Team</h3>
      { item("team", "damage", "Damage") }
      { item("team", "gold", "Gold") }
      { item("team", "vision", "Vision Score") }
    </div>

  return (
    <div className="graph-control-panel">
      {elementFixed()}
      {elemetTogglable()}
    </div>
  )
}
  

export default GraphController;
