import React from "react";
import * as d3 from "d3";


// const LabelLine = ({ p1, p2, p3 }) =>
//   <path 
//     fill="none" 
//     stroke="black" 
//     stroke-width="2" 
//     d={`M ${p1[0]},${p1[1]} L ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`}></path>

const LabelLine = ({ p1, p2}) =>
    <path 
      fill="none" 
      stroke="black" 
      stroke-width="2" 
      d={`M ${p1[0]},${p1[1]} L ${p2[0]},${p2[1]}`}></path>


const Pie = ({ data, radius, colors, translateX, translateY, title }) => {
  let pie = d3.pie()
      .value(d => d[0])
      .sort((a, b) => a[0] - b[0])(data);

  let sortedPie = pie.sort((a, b) => a.index - b.index);

  let arcs = sortedPie.map(pieEntry => 
    d3.arc()
        .innerRadius(radius - 30)
        .outerRadius(radius)
        .startAngle(pieEntry.startAngle)
        .endAngle(pieEntry.endAngle)
  );

  let points = sortedPie.map(pieEntry => {
    const halvedAngle = pieEntry.startAngle + (pieEntry.endAngle - pieEntry.startAngle) / 2;
    // const halvedAngle = (pieEntry.startAngle + pieEntry.endAngle) / 2 - Math.PI;
    const x = (radius + 10) * Math.sin(halvedAngle);
    const y = -(radius + 10) * Math.cos(halvedAngle);
    console.log(pieEntry, x, y, halvedAngle)
    return [x, y];
    // return arc.centroid();
  })

  let centroids = arcs.map(arc => arc.centroid());

  let endings = points.map(point => 
    point[1] <= 0 ? [point[0], point[1] - 15] : [point[0], point[1] + 15])

  return (
    <g transform={`translate(${translateX}, ${translateY})`}>
      <text x="-80" y="-120" fontSize="12" fill="currentColor" >{title}</text>
      <g transform="translate(10, 10)">
        {
          arcs.map((d, i) => 
            <path 
              key={i} 
              d={`${d()}`} 
              strokeWidth="2px" 
              stroke="white" 
              fill={`${colors[i]}`}></path>)
        }
        {
          centroids.map((d, i) => 
            <circle key={i} cx={d[0]} cy={d[1]} r={2}></circle>)
        }
        {
          d3
            .zip(centroids, points, endings)
            .map((d, i) => <LabelLine key={i} p1={d[0]} p2={d[1]}/>)
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
      <svg width= "400" height="300">
        <Pie 
          data={teamRed} 
          radius={65} 
          colors={redTeamColors} 
          translateX={80} 
          translateY={170} 
          title="% of Red Team Damage" />
        <Pie 
          data={teamBlue} 
          radius={65} 
          colors={blueTeamColors}
          translateX={270} 
          translateY={170} 
          title="% of Blue Team Damage" />
      </svg>
    </div>
  )
}
  

export default PieChart;
