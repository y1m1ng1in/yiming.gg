import React from "react";

const SummonerGeneral = ({name, level, icon}) => 
  <section>
    <h3>{name}</h3>
    <p>summoner level: {level}</p>
    <p>icon Id: {icon}</p>
  </section>

SummonerGeneral.defaultProps = {
  name: "",
  level: 0,
  icon: 0
}
  
export default SummonerGeneral;
