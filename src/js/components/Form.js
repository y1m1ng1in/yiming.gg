import React from "react";
import '../../stylesheets/style.css';

const Form = ({onSubmit=f=>f}) => {
  const submit = e => {
    let summoner = document.getElementById("player-name").value;
    let server   = document.getElementById("server");
    
    server = server.options[server.selectedIndex].value;
    onSubmit({summoner: summoner, server: server});
    console.log(`${summoner}  ${server}`);
  }

  return (
    <form className="search-form" method="post" action="/search" onSubmit={submit}>
      <label htmlFor="player-name">Player name</label>
      <fieldset>
        <legend>Server</legend>
        <select id="server" name="server" aria-label="server">
          <option label="na" value="na" id="na"></option>
          <option label="kr" value="kr" id="kr"></option>
        </select>
      </fieldset>
      <input type="text" id="player-name" name="player-name" aria-label="player-name"></input>
      <button type="submit">Search</button>
    </form>
  )
}

export default Form;
