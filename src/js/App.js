import React from "react";
import { SummonerData, HeaderContainer } from "./components/container";
import '../stylesheets/style.css';

const App = () => {
  return (
    <div className="app">
      <HeaderContainer />
      <SummonerData />
    </div>
  );
};

export default App;
