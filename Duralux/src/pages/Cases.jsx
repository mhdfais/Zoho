import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllCases } from "../services/zohoCrmService";

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const res = await getAllCases();
        setCases(res.data || []);
      } catch (error) {
        console.error("Error fetching cases", error);
        toast.error("Failed to load cases");
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Cases</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Case
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
      ) : cases.length === 0 ? (
        <p className="text-center text-muted mt-5">No cases available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Cases</h6>
          </div>

          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Case Number</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Case Origin</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Contact Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Owner</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border">
                {cases.map((item, i) => (
                  <tr key={item.id || i} style={{ fontSize: "0.75rem" }}>
                    <td
                      className="fw-semibold text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {item.Case_Number || "N/A"}
                    </td>
                    <td className="text-muted">{item.Subject || "N/A"}</td>
                     <td className="text-muted">{item.Priority || "N/A"}</td>
                      <td className="text-muted">{item.Case_Origin || "N/A"}</td>
                    <td className="text-muted">
                      {item.Account_Name?.name || "N/A"}
                    </td>

                    <td className="text-muted">
                      {item.Related_To?.name || "N/A"}
                    </td>

                    <td className="text-muted">{item.Status || "N/A"}</td>

                   

                    <td className="text-muted">{item.Owner?.name || "N/A"}</td>

                    <td className="text-center text-muted">
                      <div className="d-flex justify-content-center gap-4">
                        <GoTrash size={18} />
                        <FiEdit2 size={18} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Cases;
