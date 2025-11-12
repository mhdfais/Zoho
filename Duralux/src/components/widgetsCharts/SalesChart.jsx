import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     // uv: 4000,
//     pv: 2400,
//     // amt: 2400,
//   },
//   {
//     name: "Page B",
//     // uv: 3000,
//     pv: 1398,
//     // amt: 2210,
//   },
//   {
//     name: "Page C",
//     // uv: 2000,
//     pv: 9800,
//     // amt: 2290,
//   },
//   {
//     name: "Page D",
//     // uv: 2780,
//     pv: 3908,
//     // amt: 2000,
//   },
//   {
//     name: "Page E",
//     // uv: 1890,
//     pv: 4800,
//     // amt: 2181,
//   },
//   {
//     name: "Page F",
//     // uv: 2390,
//     pv: 3800,
//     // amt: 2500,
//   },
//   {
//     name: "Page G",
//     // uv: 3490,
//     pv: 4300,
//     // amt: 2100,
//   },
// ];

const SalesChart = ({ salesData }) => {
  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     setData(salesStages);
  //   }, []);
  return (
    <div
      className="bg-white rounded shadow-sm"
      style={{ height: "23rem", marginTop: "1.8rem" }}
    >
      <div
        style={{ paddingLeft: "1.5rem", marginBottom: 0 }}
        className="pt-4 fw-bold mb-2"
      >
        <p style={{ fontSize: "1.3rem", color: "#40444D", marginBottom: 0 }}>
          Sales
        </p>
      </div>
      <BarChart
        style={{
          width: "100%",
          maxWidth: "800px",
          //   maxHeight: "70vh",
          aspectRatio: 1.618,
          padding: "2rem",
        }}
        // responsive
        data={salesData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="stage"
          interval={0}
          //   tickMargin={25} // extra space below chart
          tick={({ x, y, payload }) => {
            // Split by space or "/" for better wrapping
            const words = payload.value.split(/[\s/]+/);

            return (
              <g transform={`translate(${x},${y + 8})`}>
                {words.map((word, index) => (
                  <text
                    key={index}
                    x={0}
                    y={index * 14} 
                    textAnchor="middle"
                    fontSize={12}
                    fill="#333"
                  >
                    {word}
                  </text>
                ))}
              </g>
            );
          }}
        />

        {/* <YAxis width="auto" /> */}
        <Tooltip />
        {/* <Legend /> */}
        <Bar
          dataKey="count"
          fill="#0A2342"
          //   width={100}
          barSize={18}
          //   activeBar={<Rectangle stroke="blue"/>}
        />
        {/* <Bar
          dataKey="uv"
          fill="#82ca95d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        /> */}
      </BarChart>
    </div>
  );
};

export default SalesChart;
