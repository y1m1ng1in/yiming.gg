import React from "react";
import * as d3 from "d3";

const Pie = ({ data, radius, colors, translateX, translateY, title }) => {
  let pie = d3.pie()
      .value(d => d[0])
      .sort((a, b) => a[0] - b[0])(data);

  let arcs = pie.map(pieEntry => 
    d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
        .startAngle(pieEntry.startAngle)
        .endAngle(pieEntry.endAngle)
  );

  return (
    <g transform={`translate(${translateX}, ${translateY})`}>
      <text x="-80" y="-90" fontSize="12" fill="currentColor" >{title}</text>
      <g transform="translate(0, 10)">
        {
          arcs.map((d, i) => 
            <path 
              key={i} 
              d={`${d()}`} 
              strokeWidth="2px" 
              stroke="white" 
              fill={`${colors[pie[i].index]}`}></path>)
        }
      </g>
    </g>
  )
}

const PieChart = ({ teamRed, teamBlue, type }) => {
  const redTeamColors  = ['#FFD1D3', '#FF9398', '#F3464E', '#F62730', '#C70039'];
  const blueTeamColors = ['#BDD0FA', '#8AAEFE', '#4F84F9', '#0251FF', '#2601CC'];

  return (
    <div className="pie-chart">
      <svg width= "500" height="300">
        <Pie 
          data={teamRed} 
          radius={80} 
          colors={redTeamColors} 
          translateX={90} 
          translateY={180} 
          title="% of Red Team Damage" />
        <Pie 
          data={teamBlue} 
          radius={80} 
          colors={blueTeamColors} 
          translateX={290} 
          translateY={180} 
          title="% of Blue Team Damage" />
      </svg>
    </div>
  )
}
  

export default PieChart;
