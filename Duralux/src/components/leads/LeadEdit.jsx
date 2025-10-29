import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editLead, getLeadbyId } from "../../services/zohoCrmService";
import toast from "react-hot-toast";

const LeadEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Company: "",
    Email: "",
    Phone: "",
    Mobile: "",
    Fax: "",
    Website: "",
    Lead_Source: "",
    Lead_Status: "",
    Annual_Revenue: "",
    Industry: "",
    No_of_Employees: "",
    Rating: "",
    Street: "",
    City: "",
    State: "",
    Zip_Code: "",
    Country: "",
    Description: "",
    Title: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch lead by ID
  useEffect(() => {
    const fetchLead = async () => {
      try {
        const lead = await getLeadbyId(id);
        setFormData({
          First_Name: lead.First_Name || "",
          Last_Name: lead.Last_Name || "",
          Company: lead.Company || "",
          Email: lead.Email || "",
          Phone: lead.Phone || "",
          Mobile: lead.Mobile || "",
          Fax: lead.Fax || "",
          Website: lead.Website || "",
          Lead_Source: lead.Lead_Source || "",
          Lead_Status: lead.Lead_Status || "",
          Annual_Revenue: lead.Annual_Revenue || "",
          Industry: lead.Industry || "",
          No_of_Employees: lead.No_of_Employees || "",
          Rating: lead.Rating || "",
          Street: lead.Street || "",
          City: lead.City || "",
          State: lead.State || "",
          Zip_Code: lead.Zip_Code || "",
          Country: lead.Country || "",
          Description: lead.Description || "",
          Title: lead.Title || "",
        });
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to load lead details.");
          console.error("Error fetching lead:", error);
        }
        setError("Failed to load lead details.");
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (formData.Last_Name.trim() === "" || formData.Company.trim() === "") {
        toast.error("last name and company is required");
        return;
      }
      await editLead(id, formData);
      toast.success("Lead updated successfully!");
      navigate("/sales/leads");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait a few seconds.");
      } else {
        toast.error("Failed to update lead.");
        console.error("Error updating lead:", error);
      }
      setError("Failed to update lead.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center pt-4">Loading...</p>;
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  return (
    <div className="container pt-4">
      <h4 className="mb-4">Edit Lead</h4>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left column */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="First_Name"
                value={formData.First_Name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="Last_Name"
                value={formData.Last_Name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Company <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="Company"
                value={formData.Company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="number"
                className="form-control"
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input
                type="number"
                className="form-control"
                name="Mobile"
                value={formData.Mobile}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Lead Source</label>
              <select
                name="Lead_Source"
                className="form-select"
                value={formData.Lead_Source}
                onChange={handleChange}
              >
                <option value="">Select Source</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Employee Referral">Employee Referral</option>
                <option value="Online Store">Online Store</option>
                <option value="Partner">Partner</option>
                <option value="Public Relations">Public Relations</option>
                <option value="Trade Show">Trade Show</option>
                <option value="Web Research">Web Research</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Lead Status</label>
              <select
                name="Lead_Status"
                className="form-select"
                value={formData.Lead_Status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Attempted to Contact">
                  Attempted to Contact
                </option>
                <option value="Contact in Future">Contact in Future</option>
                <option value="Contacted">Contacted</option>
                <option value="Junk Lead">Junk Lead</option>
                <option value="Lost Lead">Lost Lead</option>
                <option value="Not Contacted">Not Contacted</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Industry</label>
              <input
                type="text"
                className="form-control"
                name="Industry"
                value={formData.Industry}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rating</label>
              <select
                name="Rating"
                className="form-select"
                value={formData.Rating}
                onChange={handleChange}
              >
                <option value="">Select Rating</option>
                <option value="Acquired">Acquired</option>
                <option value="Active">Active</option>
                <option value="Market Failed">Market Failed</option>
                <option value="Project Cancelled">Project Cancelled</option>
                <option value="Shut Down">Shut Down</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Annual Revenue</label>
              <input
                type="number"
                className="form-control"
                name="Annual_Revenue"
                value={formData.Annual_Revenue}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                type="text"
                className="form-control"
                name="Street"
                value={formData.Street}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="City"
                value={formData.City}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="State"
                value={formData.State}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Zip Code</label>
              <input
                type="text"
                className="form-control"
                name="Zip_Code"
                value={formData.Zip_Code}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                name="Country"
                value={formData.Country}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/sales/leads")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Updating..." : "Update Lead"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadEdit;
