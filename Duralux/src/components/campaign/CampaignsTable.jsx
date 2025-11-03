import React, { useEffect, useState } from "react";
import { FiEdit3, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  deleteCampaign,
  getAllCampaigns,
} from "../../services/zohoCrmService";

const CampaignsTable = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await getAllCampaigns();
        setCampaigns(res.data || []);
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to load campaigns.");
          console.error("Error fetching campaigns:", error);
        }
        setError(error.message || "Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Handle Edit / Delete actions
  const handleAction = async (action, campaign) => {
    if (action === "Edit") {
      navigate(`/marketing/edit-campaign/${campaign.id}`);
    } else if (action === "Delete") {
      try {
        const confirmDelete = window.confirm(
          `Are you sure you want to delete campaign "${campaign.Campaign_Name}"?`
        );
        if (!confirmDelete) return;

        await deleteCampaign(campaign.id);
        setCampaigns((prev) => prev.filter((c) => c.id !== campaign.id));
        toast.success("Campaign deleted successfully.");
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to delete campaign.");
          console.error("Error deleting campaign:", error);
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
        <p className="mt-2">Loading campaigns...</p>
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
  if (campaigns.length === 0)
    return (
      <div className="alert alert-secondary" role="alert">
        No campaigns found.
      </div>
    );

  // Table
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Campaigns</h4>
        <button
          onClick={() => navigate("/marketing/create-campaign")}
          className="btn btn-primary"
        >
          + Create Campaign
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>Campaign Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, index) => (
              <tr
                key={index}
                className="cursor-pointer"
                onClick={() => navigate(`/marketing/campaign/${c.id}`)}
              >
                <td>{c.Campaign_Name || "—"}</td>
                <td>{c.Type || "—"}</td>
                <td>{c.Status || "—"}</td>
                <td>{c.Start_Date || "—"}</td>
                <td>{c.End_Date || "—"}</td>
                <td>{c.Owner?.name || "—"}</td>
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
                            handleAction("Edit", c);
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
                            handleAction("Delete", c);
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

export default CampaignsTable;
