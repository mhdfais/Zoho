import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllQuotes } from "../services/zohoCrmService";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await getAllQuotes();
        setQuotes(res.data || []);
      } catch (error) {
        console.error("Error fetching quotes", error);
        toast.error("Failed to load quotes");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Quotes</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Quote
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
      ) : quotes.length === 0 ? (
        <p className="text-center text-muted mt-5">No quotes available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Quotes</h6>
          </div>

          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Quote Name</th>
                  <th scope="col">Contact Name</th>
                  <th scope="col">Deal Name</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Quote Stage</th>
                  <th scope="col">Total</th>
                  <th scope="col">Owner</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border">
                {quotes.map((quote, i) => (
                  <tr key={quote.id || i} style={{ fontSize: "0.75rem" }}>
                    <td
                      className="fw-semibold text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {quote.Subject || "N/A"}
                    </td>

                    <td className="text-muted">
                      {quote.Contact_Name?.name || "N/A"}
                    </td>
                    <td className="text-muted">
                      {quote.Deal_Name?.name || "N/A"}
                    </td>
                    <td className="text-muted">
                      {quote.Account_Name?.name || "N/A"}
                    </td>

                    <td className="text-muted">{quote.Quote_Stage || "N/A"}</td>

                    <td className="text-muted">
                      {quote.Grand_Total
                        ? `AED ${quote.Grand_Total.toLocaleString()}`
                        : "N/A"}
                    </td>

                    <td className="text-muted">{quote.Owner?.name || "N/A"}</td>

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

export default Quotes;
