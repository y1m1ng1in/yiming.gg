import React from "react";
import {
  SummonerSearch, SummonerData 
} from "./components/container"

const App = () => {
  return (
    <div>
      <SummonerSearch></SummonerSearch>
      <SummonerData></SummonerData>
      <div>
        data goes here...
      </div>
    </div>
  );
};

export default App;
