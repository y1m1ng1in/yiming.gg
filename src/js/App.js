import React from "react";
import { SummonerData } from "./components/container";
import Header from "./components/Header";
import '../stylesheets/style.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <SummonerData />
    </div>
  );
};

export default App;
