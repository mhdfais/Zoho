import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllSolutions } from "../services/zohoCrmService";

const Solutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        const res = await getAllSolutions();
        setSolutions(res.data || []);
      } catch (error) {
        console.error("Error fetching solutions", error);
        toast.error("Failed to load solutions");
      } finally {
        setLoading(false);
      }
    };
    fetchSolutions();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Solutions</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Solution
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
      ) : solutions.length === 0 ? (
        <p className="text-center text-muted mt-5">No solutions available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Solutions</h6>
          </div>

          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Solution Number</th>
                  <th scope="col">Solution Title</th>
                  <th scope="col">Status</th>
                  {/* <th scope="col">Modified Time</th> */}
                  <th scope="col">Owner</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border">
                {solutions.map((solution, i) => (
                  <tr key={solution.id || i} style={{ fontSize: "0.75rem" }}>
                    <td className="text-muted">
                      {solution.Solution_Number|| "N/A"}
                    </td>
                    <td
                      className="fw-semibold text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {solution.Solution_Title || "N/A"}
                    </td>

                    <td className="text-muted">{solution.Status || "N/A"}</td>

                    {/* <td className="text-muted">
                      {solution.Created_Time
                        ? new Date(solution.Created_Time).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="text-muted">
                      {solution.Modified_Time
                        ? new Date(solution.Modified_Time).toLocaleDateString()
                        : "N/A"}
                    </td> */}

                    <td className="text-muted">{solution.Owner?.name || "N/A"}</td>

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

export default Solutions;
