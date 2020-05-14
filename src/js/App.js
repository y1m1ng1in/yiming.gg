import React from "react";
import { SummonerSearch, SummonerGeneralInfo } from "./components/container"

const App = () => {
  return (
    <div>
      <SummonerSearch></SummonerSearch>
      <SummonerGeneralInfo></SummonerGeneralInfo>
      <div>
        data goes here...
      </div>
  </div>
  );
};

export default App;
