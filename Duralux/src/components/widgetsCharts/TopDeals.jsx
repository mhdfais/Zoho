import React, { useEffect, useState } from "react";
// import { Dropdown } from "react-bootstrap";

const TopDeals = ({ topDeals }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(topDeals);
  }, []);
  //   const deals = [
  //     {
  //       id: 1,
  //       name: topDeals.Deal_Name,
  //       //   owner: "John Doe",
  //       amount: topDeals.Amount,
  //       probability: "75%",
  //       stage: "Proposal",
  //     },
  //     {
  //       id: 2,
  //       name: "Cloud Migration Project",
  //       owner: "John Doe",
  //       amount: "$23,000",
  //       probability: "75%",
  //       stage: "Negotiation",
  //     },
  //     {
  //       id: 3,
  //       name: "Annual Maintenance Contract",
  //       owner: "John Doe",
  //       amount: "$23,000",
  //       probability: "75%",
  //       stage: "Closed Won",
  //     },
  //     {
  //       id: 4,
  //       name: "Security Audit Service",
  //       owner: "John Doe",
  //       amount: "$23,000",
  //       probability: "75%",
  //       stage: "Closed Won",
  //     },
  //     {
  //       id: 5,
  //       name: "Data Analytics Platform",
  //       owner: "John Doe",
  //       amount: "$23,000",
  //       probability: "75%",
  //       stage: "Qualification",
  //     },
  //   ];

  //   const stageColors = {
  //     Proposal: { bg: "#E3FCEC", text: "#10793f" },
  //     Negotiation: { bg: "#E3FCEC", text: "#10793f" },
  //     "Closed Won": { bg: "#E3FCEC", text: "#10793f" },
  //     Qualification: { bg: "#E3FCEC", text: "#10793f" },
  //   };

  return (
    <div
      className="bg-white rounded shadow-sm p-3"
      style={{
        border: "1px solid #f0f0f0",
        fontFamily: "Inter, sans-serif",
        height: "23rem",
        marginTop: "1.8rem",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0" style={{ color: "#2e2e2e" }}>
          Top Deals
        </h5>

        {/* <div className="d-flex align-items-center gap-2">
          <span className="text-muted small">Sort By</span>
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              size="sm"
              className="border rounded-3 px-3 py-1 fw-semibold text-secondary"
            >
              Progress
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Progress</Dropdown.Item>
              <Dropdown.Item>Amount</Dropdown.Item>
              <Dropdown.Item>Stage</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr
              className="text-muted small"
              style={{
                borderBottom: "2px solid #f2f4f7",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              <th>Deal Name</th>
              <th>Amount</th>
              <th>Stage</th>
            </tr>
          </thead>

          <tbody className="" >
            {data.map((deal) => (
              <tr
                key={deal.id}
                style={{
                  borderBottom: "1px solid #f9fafb",
                }}
              >
                {/* Deal name and owner */}
                <td >
                  <div
                    className=""
                    style={{ color: "black", fontSize: "0.8rem" }}
                  >
                    {deal.Deal_Name}
                  </div>
                  {/* <div className="text-muted small">{deal.owner}</div> */}
                </td>

                {/* Amount and probability */}
                <td >
                  <div
                    className=""
                    style={{ color: "#1f2937", fontSize: "0.8rem" }}
                  >
                    {deal.Amount}
                  </div>
                  {/* <div className="text-muted small">
                    {deal.probability} probability
                  </div> */}
                </td>

                {/* Stage */}
                <td >
                  <span
                    className="fw-bold"
                    style={{
                      display: "inline-block",
                      backgroundColor: "#D1FAE580",
                      color: "#059691",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "999px",
                      fontSize: "0.6rem",
                    }}
                  >
                    {deal.Stage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopDeals;
