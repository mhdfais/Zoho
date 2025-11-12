import React, { useEffect, useState } from "react";

const LeadConversionTable = ({ leadConversion }) => {
  const [leadData, setLeadData] = useState([]);

  useEffect(() => {
    setLeadData(leadConversion);
  }, [leadConversion]);

  const maxValue = leadData.length

  return (
    <div
      className="p-4 rounded shadow-sm bg-white mt-4"
      style={{ minHeight: "22.7rem", width:"100%  " }}
    >
      <h5 className="fw-bold mb-4">Lead Conversion</h5>

      {leadData.map((stage, index) => (
        <div key={index} className="mb-3">
          <div
            className="fw-semibold mb-1 text-muted"
            style={{ fontSize: "0.8rem" }}
          >
            {stage.stage}
          </div>

          <div
            className="d-flex align-items-center justify-content-between rounded-3"
            style={{
              background: "linear-gradient(to right, #0A2342, #93c5fd)",
              width: `${(stage.count / maxValue) * 100}%`,
              color: "#fff",
              padding: "3px 6px",
              transition: "width 0.5s ease",
              fontWeight: "500",
              fontSize: "0.8rem",
              position: "relative",
              minHeight: "18px",
            }}
          >
            {/* <span className="text-truncate">{stage.stage}</span> */}
            <span className="text-truncate" style={{ fontWeight: "400" }}>{stage.count} Lead</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadConversionTable;
