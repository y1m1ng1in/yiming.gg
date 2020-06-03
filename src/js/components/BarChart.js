import React from "react";
import * as d3 from "d3";

const Bar = ({ transformX, transformY, width, height, color, text }) => {
  return (
    <g transform={`translate(${transformX}, ${transformY})`}>
      <rect width={width} height={height} fill={color}></rect>
      <text x={width-20} y={height-10} fill="white" fontSize="7">{text}</text>
    </g>
  )
}

const BarComparsion = ({ transformX, transformY, width, height, color, text }) => {
  return (
    <g transform={`translate(${transformX}, ${transformY})`}>
      <rect width={width[0]} height={height / 2 - 1} fill={color[0]}></rect>
      {
        width[0] > 25 
        ? <text x={width[0]-25} y={height/2 - 1 - 5} fill="white" fontSize="8">{text[0]}</text>
        : ""
      }
      <rect y={height / 2} width={width[1]} height={height / 2 - 1} fill={color[1]}></rect>
      {
        width[1] > 25
        ? <text x={width[1]-25} y={height - 5} fill="white" fontSize="8">{text[1]}</text>
        : ""
      }
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

const BarChart = ({ teamRed, teamBlue, type }) => {
  const margin = { top: 50, right: 0, bottom: 30, left: 40 };
  const width  = 600;
  const height = 300;
  let data = teamBlue;
  let data2 = teamRed;
  const yDomain = [1, 2, 3, 4, 5];

  let x = d3.scaleLinear()
      .domain([0, d3.max([...data, ...data2], d => d[0])])
      .range([margin.left, width - margin.right - margin.left]);

  let y = d3.scaleBand()
      .domain(yDomain)
      .rangeRound([margin.top + 10, (height - margin.bottom) / 2 + 10])
      .padding(0.1);

  let ticks = d3.ticks(0, d3.max([...data, ...data2], d => d[0]), 5);

  let y2 = d3.scaleBand()
      .domain(yDomain)
      .rangeRound([
        (height - margin.bottom) / 2 + 20, 
        (height - margin.bottom) / 2 - 20 + (height - margin.bottom) / 2 
      ])
      .padding(0.1);

  let yTeam = d3.scaleBand()
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .range([margin.top, height - margin.bottom])
        .padding(0.15);
      
  let yComparsion = d3.scaleBand()
        .domain(yDomain)
        .range([margin.top, height - margin.bottom])
        .padding(0.15);


  const extract = (d, k) => d.map(i => i[k]);

  const printTeamBar = (data1, data2, yScale, color1, color2) => {
    let data = [...extract(data1, 0), ...extract(data2, 0)];
    let index = [1, 2, 3, 4, 5, 6 ,7 ,8, 9, 10]
    data = d3.zip(data, index);
    console.log(data)
    return data.map((d, i) =>
      <Bar
        key={i}
        transformX={margin.left}
        transformY={yScale(d[1])} 
        width={x(d[0]) - margin.left} 
        height={yScale.bandwidth()}
        text={d[0]}
        color={i < 5 ? color1 : color2} />)
  }
      
  const printComparsionBar = (data1, data2, yScale, color1, color2) => {
    let data = d3.zip(extract(data1, 0), extract(data2, 0), yDomain, yDomain);
    return data.map((d, i) =>
      <BarComparsion 
        key={i}
        width={[x(d[0]) - margin.left, x(d[1]) - margin.left]}
        height={yScale.bandwidth()}
        color={[color1, color2]}
        transformX={margin.left}
        transformY={yComparsion(d[2])}
        text={[d[0], d[1]]}/>)
  }


  return (
    <div className="barchart">
      <div className="barchart-container">
        <svg height="300" width="600">
          <text fill="currentColor" x={margin.left} y={margin.top} fontSize="14">
            Damage Dealt to Champions
          </text>
          <g transform="translate(0, 15)">
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
              type === "individual" 
                ? printComparsionBar(data, data2, yComparsion, "#468BFF", "#FF757B")
                : printTeamBar(data, data2, yTeam, "#468BFF", "#FF757B")
            }
          </g>
        </svg>
      </div>
    </div>
  )
}

export default BarChart;