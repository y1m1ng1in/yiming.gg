import React from "react";
import {
  SummonerSearch, SummonerData 
} from "./components/container";
import '../stylesheets/style.css';

const App = () => {
  return (
    <div className="app">
      <SummonerSearch />
      <SummonerData />
    </div>
  );
};

export default App;
