import React from "react";
import { SummonerSearch } from "./container";
import '../../stylesheets/style.css';

const Header = () => 
  <div className="header">
    <div className="logo">Yiming.GG</div>
    <SummonerSearch />
  </div>

export default Header;