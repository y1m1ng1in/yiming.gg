import React from "react";
import * as d3 from "d3";
import "../../stylesheets/champion_spritesheet_15.css";

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

const BarChart = ({ teamRed, teamBlue, type, view }) => {
  const margin = { top: 50, right: 30, bottom: 30, left: 5 };
  const width  = 600;
  const height = 300;
  let data = teamBlue;
  let data2 = teamRed;
  const yDomain = [1, 2, 3, 4, 5];

  let x = d3.scaleLinear()
      .domain([0, d3.max([...data, ...data2], d => d[0])])
      .range([margin.left, width - margin.right - margin.left]);

  let ticks = d3.ticks(0, d3.max([...data, ...data2], d => d[0]), 5);

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
    console.log(data1, data2)
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
    console.log(data1, data2)
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

  const printLabelSprite = (data1, data2, type) => {
    if(type === "individual") {
      return (
        <div className="barchart-label">
          {
            data1.map((d, i) => 
              <div key={i} className={`champion-label champion-label-${2 * i + 1} champion-15-${d[1]}`}></div>)
          }
          {
            data2.map((d, i) => 
              <div key={i} className={`champion-label champion-label-${2 * i + 2} champion-15-${d[1]}`}></div>)
          }
        </div>
      );
    } else {
      return (
        <div className="barchart-label">
          {
            data1.map((d, i) => 
              <div key={i} className={`champion-label champion-label-${i+1} champion-15-${d[1]}`}></div>)
          }
          {
            data2.map((d, i) => 
              <div key={i} className={`champion-label champion-label-${i+6} champion-15-${d[1]}`}></div>)
          }
        </div>
      );
    }
  }

  const getTitle = () => {
    if(view === "damage") {
      return "Damage Dealt to Champions";
    } else if(view === "gold") {
      return "Gold Coin Earned";
    } else {
      return "Vision Score";
    }
  }

  return (
    <div className="barchart">
      <div className="barchart-label">
        { printLabelSprite(data, data2, type) }
      </div>
      <div className="barchart-container">
        <svg height="300" width="600">
          <text fill="currentColor" x={margin.left} y={margin.top} fontSize="14">
            {getTitle()}
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