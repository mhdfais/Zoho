import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllDeals } from "../services/zohoCrmService";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const res = await getAllDeals();
        setDeals(res.data || []);
      } catch (error) {
        console.error("Error fetching deals", error);
        toast.error("Failed to load deals");
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Deals</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Deal
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
      ) : deals.length === 0 ? (
        <p className="text-center text-muted mt-5">No deals available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Deals</h6>
          </div>
          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Deal Name</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Stage</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Closing Date</th>
                  <th scope="col">Deal Owner</th>
                </tr>
              </thead>
              <tbody className="border">
                {deals.map((deal, i) => (
                  <tr key={deal.id || i} style={{ fontSize: "0.75rem" }}>
                    <td
                      className="fw-semibold text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {deal.Deal_Name || "N/A"}
                    </td>

                    <td className="text-muted text-truncate" style={{ maxWidth: "10rem" }}>
                      {deal.Account_Name?.name || "N/A"}
                    </td>

                    <td className="text-muted">{deal.Stage || "N/A"}</td>

                    <td className="text-muted">
                      {deal.Amount ? `AED ${deal.Amount.toLocaleString()}` : "N/A"}
                    </td>

                    <td className="text-muted">
                      {deal.Closing_Date
                        ? new Date(deal.Closing_Date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>

                    <td className="text-muted">
                      {deal.Owner?.name || "N/A"}
                    </td>

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

export default Deals;
