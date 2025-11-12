import React, { useState, useEffect } from "react";

const LeadSourcesChart = ({ leadSources }) => {
  const [leadData, setLeadData] = useState([]);
  useEffect(() => {
    setLeadData(leadSources);
  }, []);

  // Calculate percentage for each source
  const getPercentage = (count, total) => {
    return (count / total) * 100;
  };

  // Get max value for scaling
  const maxValue = Math.max(...leadData.map((item) => item.total));

  return (
    <div className="rounded mt-4"
      style={{
        // maxWidth: "500px",
        // margin: "0 auto",
        padding: "20px",
        backgroundColor: "white",
        // borderRadius: "20px",
        
      }}
    >
      {/* Title */}
      <h2
        style={{
          // textAlign: "center",
          color: "#2d3748",
          fontSize: "22px",
          fontWeight: "700",
          marginBottom: "15px",
        }}
      >
        Lead Sources
      </h2>

      {/* Chart Container */}
      <div
        style={{
          display: "flex",
          // justifyContent: "space-around",
          alignItems: "flex-end",
          height: "350px",
          // padding: "px",
          // backgroundColor: "white",
          // borderRadius: "15px",
          // boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {leadData.map((item, index) => {
          const filledHeight = getPercentage(item.count, item.total);

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "1",
                maxWidth: "80px",
              }}
            >
              {/* Label */}
              <div
                style={{
                  fontSize: "12px",
                  color: "#4a5568",
                  marginBottom: "15px",
                  textAlign: "center",
                  fontWeight: "500",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  wordWrap: "break-word",
                  width: "100%",
                }}
              >
                {item.source}
              </div>

              {/* Bar Container */}
              <div
                style={{
                  width: "35px",
                  height: "280px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                {/* Background Bar (Gray) */}
                <div
                  style={{
                    width: "100%",
                    height: `${(item.total / maxValue) * 100}%`,
                    backgroundColor: "#AEAEAE",
                    borderRadius: "25px",
                    position: "absolute",
                    bottom: "0",
                  }}
                ></div>

                {/* Filled Bar (Green) */}
                <div
                  style={{
                    width: "100%",
                    height: `${(item.count / maxValue) * 100}%`,
                    backgroundColor: "#A5CE39",
                    borderRadius: "25px",
                    position: "relative",
                    transition: "height 0.5s ease",
                    zIndex: "1",
                  }}
                ></div>
              </div>

              {/* Value Display (Optional) */}
              {/* <div
                style={{
                  fontSize: "11px",
                  color: "#718096",
                  marginTop: "8px",
                  fontWeight: "500",
                }}
              >
                {item.count}/{item.total}
              </div> */}
            </div>
          );
        })}
      </div>

      {/* Info Text */}
      {/* <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "13px",
          color: "#718096",
        }}
      >
        Click bars to view details
      </div> */}
    </div>
  );
};

export default LeadSourcesChart;
