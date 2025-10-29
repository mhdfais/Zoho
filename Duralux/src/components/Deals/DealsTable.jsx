import React, { useEffect, useState } from "react";
import { FiEdit3, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteDeal, getAllDeals } from "../../services/zohoCrmService";

const DealsTable = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all deals
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await getAllDeals();
        setDeals(res.data || []);
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to load deals.");
          console.error("Error fetching deals:", error);
        }
        setError(error.message || "Failed to load deals");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Handle Edit / Delete actions
  const handleAction = async (action, deal) => {
    if (action === "Edit") {
      navigate(`/sales/edit-deal/${deal.id}`);
    } else if (action === "Delete") {
      try {
        const confirmDelete = window.confirm(
          `Are you sure you want to delete deal "${deal.Deal_Name}"?`
        );
        if (!confirmDelete) return;

        await deleteDeal(deal.id);
        setDeals((prev) => prev.filter((d) => d.id !== deal.id));
        toast.success("Deal deleted successfully.");
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to delete deal.");
          console.error("Error deleting deal:", error);
        }
      }
    }
  };

  // Loading state
  if (loading)
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading deals...</p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  // No data
  if (deals.length === 0)
    return (
      <div className="alert alert-secondary" role="alert">
        No deals found.
      </div>
    );

  // Table
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Deals</h4>
        <button
          onClick={() => navigate("/sales/create-deal")}
          className="btn btn-primary"
        >
          + Create Deal
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>Deal Name</th>
              <th>Account Name</th>
              <th>Stage</th>
              <th>Amount</th>
              <th>Closing Date</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr
                key={index}
                className="cursor-pointer"
                onClick={() => navigate(`/sales/deal/${deal.id}`)}
              >
                <td>{deal.Deal_Name || "—"}</td>
                <td>{deal.Account_Name?.name || "—"}</td>
                <td>{deal.Stage || "—"}</td>
                <td>{deal.Amount ? `AED ${deal.Amount}` : "—"}</td>
                <td>{deal.Closing_Date || "—"}</td>
                <td>{deal.Owner?.name || "—"}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-light border"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiMoreHorizontal />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction("Edit", deal);
                          }}
                        >
                          <FiEdit3 className="me-2" /> Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center text-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction("Delete", deal);
                          }}
                        >
                          <FiTrash2 className="me-2" /> Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealsTable;
