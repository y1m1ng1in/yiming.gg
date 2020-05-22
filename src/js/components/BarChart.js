import React from "react";
import * as d3 from "d3";

const Bar = ({ transformY, width, height }) => {
  return (
    <g transform={`translate(0, ${transformY})`}>
      <rect width={width} height={height-1} fill="steelblue"></rect>
    </g>
  )
}

const BarChart = () => {
  let data = [[4000, 1], [2000, 2], [1000, 3], [5000, 4], [10000, 5]]; // simulate damage
  const range = [0, 450];
  let y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[0])])
      .range(range);

  return (
    <div className="barchart">
      <svg height="300" width="500">
        {
          data.map((d, i) => 
            <Bar key={i} width={y(d[0])} height="30" transformY={i * 30}/>)
        }
      </svg>
    </div>
  )
}

export default BarChart;