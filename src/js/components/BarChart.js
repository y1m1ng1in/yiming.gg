import React from "react";
import * as d3 from "d3";

const Bar = ({ transformX, transformY, width, height, color }) => {
  return (
    <g transform={`translate(${transformX}, ${transformY})`}>
      <rect width={width} height={height-1} fill={color}></rect>
    </g>
  )
}

const DashLine = ({ transformX, transformY, height, text }) => {
  return (
    <g transform={`translate(${transformX}, ${transformY})`}>
      <line stroke="black" strokeOpacity="1" strokeDasharray="2,2" y2={height}></line>
      <text fill="currentColor" x="9" fontSize="10">{text}</text>
    </g>
  )
}

const BarChart = () => {
  const margin = { top: 20, right: 0, bottom: 30, left: 40 };
  const width  = 500;
  const height = 300;
  let data = [[4000, 1], [2000, 2], [1000, 3], [5000, 4], [14243, 5]]; // simulate damage
  let data2 = [[3424, 1], [12311, 2], [431, 3], [9883, 4], [5631, 5]];

  let x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[0])])
      .range([margin.left, width - margin.right - margin.left]);
  let y = d3.scaleBand()
      .domain(data.map(d => d[1]))
      .rangeRound([margin.top * 1.5, (height - margin.bottom) / 2]);
  let ticks = d3.ticks(0, d3.max(data, d => d[0]), 5);

  let y2 = d3.scaleBand()
      .domain(data2.map(d => d[1]))
      .rangeRound([
        (height - margin.bottom) / 2 + 15, 
        (height - margin.bottom) / 2 + 15 + (height - margin.bottom) / 2 - margin.top * 1.5
      ]);

  return (
    <div className="barchart">
      <svg height="300" width="500">
        {
          ticks.map((d, i) => 
           <DashLine 
                key={i} 
                transformX={x(d)} 
                transformY={margin.top} 
                height={height - margin.top - margin.bottom}
                text={d} />)
        }
        {
          data.map((d, i) => 
            <Bar 
              key={i} 
              width={x(d[0]) - margin.left} 
              height={y.bandwidth()} 
              transformX={margin.left} 
              transformY={y(d[1])}
              color="#468BFF"/>)
        }
        {
          data2.map((d, i) => 
          <Bar 
            key={i} 
            width={x(d[0]) - margin.left} 
            height={y2.bandwidth()} 
            transformX={margin.left} 
            transformY={y2(d[1])}
            color="#FF757B "/>)          
        }
      </svg>
    </div>
  )
}

export default BarChart;