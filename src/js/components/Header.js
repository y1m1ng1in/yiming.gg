import React from "react";
import { SummonerSearch } from "./container";
import '../../stylesheets/style.css';

const Header = ({ hasSummonerSearch }) => 
  <div className="header">
    <div className="logo">Yiming.GG</div>
    { hasSummonerSearch ? <SummonerSearch /> : "" }
  </div>

export default Header;