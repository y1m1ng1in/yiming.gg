import React from "react";
import { SummonerSearch } from "./container";
import '../../stylesheets/style.css';

const Header = ({ hasSummonerSearch }) => 
  <div className="header">
    <div className="logo"><a href="/">Yiming.GG</a></div>
    { hasSummonerSearch ? <SummonerSearch /> : "" }
  </div>

export default Header;