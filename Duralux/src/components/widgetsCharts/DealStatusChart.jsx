import React, { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

const DealStatusChart = ({ isAnimationActive = true, dealStatus }) => {
    const [datas,setDatas]=useState({})
    useEffect(()=>{
        setDatas(dealStatus)
    })
  const legendItems = [
    { color: "#273D59", label: "Open", count: datas.openCount },
    { color: "#A5CE39", label: "Closed Won", count: datas.closedWonCount },
    { color: "#273D59CC", label: "Closed Lost", count: datas.closedLostCount },
  ];
  const data = [
    { name: "Open", value: datas.openCount, fill: "#273D59" },
    { name: "Closed Won", value: datas.closedWonCount, fill: "#A5CE39" },
    { name: "Closed Lost", value: datas.closedLostCount, fill: "#273D59CC" },
    //   { name: "Group D", value: 200, fill: "#FF8042" },
  ];
  return (
    <div className="bg-white shadow-sm rounded " style={{ height: "20rem" }}>
      <div
        style={{ paddingLeft: "1.5rem", marginBottom: 0 }}
        className="pt-4 fw-bold mb-2"
      >
        <p style={{ fontSize: "1.3rem", color: "black", marginBottom: 0 }}>
          Deal Status
        </p>
      </div>
      <div className="d-flex align-items-center">
        {/* <div className="p-2"> */}
        <PieChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "80vh",
            aspectRatio: 1,
            padding: "2rem",
          }}
          responsive
        >
          <Pie
            data={data}
            innerRadius="80%"
            outerRadius="100%"
            // Corner radius is the rounded edge of each pie slice
            cornerRadius="35%"
            fill="#8884d8"
            // padding angle is the gap between each pie slice
            paddingAngle={5}
            dataKey="value"
            isAnimationActive={isAnimationActive}
          />
        </PieChart>
        <div style={{ width: "100%" }}>
          <div
            className="legend-container"
            style={{ maxWidth: "250px", padding: "1.5rem" }}
          >
            <div className="card-body p-1">
              {legendItems.map((item, index) => (
                <div
                  key={index}
                  className="legend-item d-flex align-items-center"
                  style={{
                    marginBottom: index < legendItems.length - 1 ? "16px" : "0",
                  }}
                >
                  <span
                    className="color-dot rounded"
                    style={{
                      width: "22px",
                      height: "12px",
                      backgroundColor: item.color,
                      marginRight: "12px",
                      flexShrink: 0,
                    }}
                  ></span>
                  <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                    {item.label} <span>({item.count})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealStatusChart;
