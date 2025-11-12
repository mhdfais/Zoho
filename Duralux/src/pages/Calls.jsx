import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { BsTelephoneFill } from "react-icons/bs";
import { getCalls } from "../services/zohoCrmService";

const Calls = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        const res = await getCalls();
        setCalls(res.data || []);
      } catch (error) {
        console.error("Error fetching calls", error);
        toast.error("Failed to load calls");
      } finally {
        setLoading(false);
      }
    };
    fetchCalls();
  }, []);

  // Group by Created Date
  const groupedCalls = calls.reduce((acc, call) => {
    const dateKey = new Date(call.Created_Time).toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(call);
    return acc;
  }, {});

  // Style for call types
  const getTypeStyle = (type) => {
    switch (type) {
      case "Inbound":
        return { backgroundColor: "#EAF5EA", color: "#166534" };
      case "Outbound":
        return { backgroundColor: "#E9F0FC", color: "#1E3A8A" };
      case "Missed":
        return { backgroundColor: "#FCEAEA", color: "#C82333" };
      default:
        return { backgroundColor: "#EEE", color: "#333" };
    }
  };

  return (
    <div className="container-fluid py-3 px-4" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Calls</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Add Call
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : Object.keys(groupedCalls).length === 0 ? (
        <p className="text-center text-muted mt-5">No calls available</p>
      ) : (
        Object.entries(groupedCalls).map(([date, group]) => (
          <div key={date} className="mb-5">
            <h6 className="fw-semibold mb-3">{date}</h6>
            <div
              className="px-4 rounded-3 shadow-sm"
              style={{
                backgroundColor: "white",
                border: "1px solid #E9ECEF",
              }}
            >
              {group.map((call, i) => (
                <div
                  key={call.id || i}
                  className="d-flex align-items-center justify-content-between border-bottom py-3"
                  style={{ fontSize: "13px" }}
                >
                  {/* Left Side */}
                  <div className="d-flex align-items-center gap-3">
                    {/* <BsTelephoneFill size={16} className="text-primary" /> */}
                    <div>
                      <div className="fw-semibold text-dark">
                        {call.Subject || "Untitled Call"}
                      </div>
                      <small className="text-muted">
                        {call.Call_Purpose || "General Purpose"}
                      </small>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="d-flex align-items-center gap-4">
                    <span
                      className="badge rounded-pill px-2 py-1"
                      style={{
                        ...getTypeStyle(call.Call_Type),
                        fontSize: "0.6rem",
                        fontWeight: "500",
                      }}
                    >
                      {call.Call_Type || "N/A"}
                    </span>

                    <small className="text-muted">
                      {new Date(call.Call_Start_Time).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </small>

                    <div className="d-flex gap-3">
                      <GoTrash size={18} className="" />
                      <FiEdit2 size={18} className="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Calls;
