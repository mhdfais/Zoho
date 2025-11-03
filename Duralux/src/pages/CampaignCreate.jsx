import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createCampaign } from "../services/zohoCrmService";

const CampaignCreate = () => {
  const [formData, setFormData] = useState({
    Campaign_Name: "",
    Type: "",
    Status: "",
    Start_Date: "",
    End_Date: "",
    Budget: "",
    Expected_Revenue: "",
    Expected_Response: "",
    Num_Sent: "",
    Description: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const campaignTypes = [
    "Conference",
    "Email",
    "Telemarketing",
    "Webinar",
    "Trade Show",
    "Referral Program",
    "Public Relations",
    "Direct mail",
    "Partners",
    "Advertisement",
    "Banner Ads",
    "Other",
  ];

  const statuses = ["Planning", "Active", "Complete", "Inactive"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Campaign_Name.trim() === "" || !formData.Type.trim() === "") {
      toast.error("Campaign Name and Status are required");
      return;
    }

    try {
      setLoading(true);
      await createCampaign(formData);
      toast.success("Campaign created successfully!");
      navigate("/marketing/campaigns");
    } catch (err) {
      toast.error("Failed to create campaign");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pt-4">
      <h4>Create Campaign</h4>

      <form onSubmit={handleSubmit} className="row g-3 mt-3">
        <div className="col-md-6">
          <label className="form-label">Campaign Name *</label>
          <input
            name="Campaign_Name"
            className="form-control"
            required
            value={formData.Campaign_Name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Type</label>
          <select
            name="Type"
            className="form-select"
            value={formData.Type}
            onChange={handleChange}
          >
            <option value="">-- Select Type --</option>
            {campaignTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Status *</label>
          <select
            name="Status"
            className="form-select"
            required
            value={formData.Status}
            onChange={handleChange}
          >
            <option value="">-- Select Status --</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Budget (₹)</label>
          <input
            name="Budget"
            type="number"
            className="form-control"
            value={formData.Budget}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Expected Revenue</label>
          <input
            name="Expected_Revenue"
            type="number"
            className="form-control"
            value={formData.Expected_Revenue}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Expected Response (%)</label>
          <input
            name="Expected_Response"
            type="number"
            className="form-control"
            value={formData.Expected_Response}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Num Sent</label>
          <input
            name="Num_Sent"
            type="number"
            className="form-control"
            value={formData.Num_Sent}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input
            name="Start_Date"
            type="date"
            className="form-control"
            value={formData.Start_Date}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input
            name="End_Date"
            type="date"
            className="form-control"
            value={formData.End_Date}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">Description</label>
          <textarea
            name="Description"
            className="form-control"
            rows={3}
            value={formData.Description}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => navigate("/marketing/campaigns")}
          >
            Cancel
          </button>
          <button disabled={loading} className="btn btn-primary" type="submit">
            {loading ? "Creating..." : "Create Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignCreate;
