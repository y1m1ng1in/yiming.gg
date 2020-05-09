import React from "react";

const Form = ({onSubmit=f=>f}) => {
  const submit = e => {
    e.preventDefault();

    let summoner = document.getElementById("player-name").value;
    let server   = document.getElementById("server");
    
    server = server.options[server.selectedIndex].value;
    
    console.log(`${summoner} ${server} should generate url`);
    onSubmit({summoner: summoner, server: server});
  }

  return (
    <form onSubmit={submit}>
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
