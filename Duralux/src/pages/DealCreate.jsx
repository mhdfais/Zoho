import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createDeal,
  getAllAccounts,
  getAllContacts,
} from "../services/zohoCrmService";

const DealCreate = () => {
  const [formData, setFormData] = useState({
    Deal_Name: "",
    Stage: "",
    Amount: "",
    Closing_Date: "",
    Type: "",
    Lead_Source: "",
    Account_Name: "",
    Contact_Name: "",
    Description: "",
  });

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const navigate = useNavigate();

  const stages = [
    "Qualification",
    "Needs Analysis",
    "Value Proposition",
    "Identify Decision Makers",
    "Proposal/Price Quote",
    "Negotiation/Review",
    "Closed Won",
    "Closed Lost",
    "Closed Lost to Competition",
  ];

  const types = ["Existing Business", "New Business"];

  const leadSources = [
    "Web",
    "Phone Inquiry",
    "Partner Referral",
    "Purchased List",
    "Campaign",
    "Employee Referral",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAccountFocus = async () => {
    if (accounts.length > 0) return; // already loaded
    try {
      setLoadingAccounts(true);
      const res = await getAllAccounts();
      setAccounts(res.data || []);
    } catch (err) {
      toast.error("Failed to load accounts");
      console.error(err);
    } finally {
      setLoadingAccounts(false);
    }
  };

  const handleContactFocus = async () => {
    if (contacts.length > 0) return; // already loaded
    try {
      setLoadingContacts(true);
      const res = await getAllContacts();
      setContacts(res.data || []);
    } catch (err) {
      toast.error("Failed to load contacts");
      console.error(err);
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        !formData.Account_Name.trim() ||
        !formData.Deal_Name.trim() ||
        !formData.Closing_Date.trim() ||
        !formData.Stage.trim()
      ) {
        toast.error(
          "Account Name, Deal Name, Closing Date, and Stage are required"
        );
        return;
      }

      await createDeal(formData);
      toast.success("Deal created successfully!");
      navigate("/sales/deals");
    } catch (err) {
      toast.error("Failed to create deal.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pt-4">
      <h4>Create Deal</h4>
      <form onSubmit={handleSubmit} className="row g-3 mt-3">
        <div className="col-md-6">
          <label className="form-label">Deal Name *</label>
          <input
            name="Deal_Name"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Stage *</label>
          <select
            name="Stage"
            className="form-select"
            required
            onChange={handleChange}
            value={formData.Stage}
          >
            <option value="">-- Select Stage --</option>
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Amount</label>
          <input
            name="Amount"
            type="number"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Closing Date *</label>
          <input
            name="Closing_Date"
            type="date"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Type</label>
          <select
            name="Type"
            className="form-select"
            onChange={handleChange}
            value={formData.Type}
          >
            <option value="">-- Select Type --</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Lead Source</label>
          <select
            name="Lead_Source"
            className="form-select"
            onChange={handleChange}
            value={formData.Lead_Source}
          >
            <option value="">-- Select Lead Source --</option>
            {leadSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        {/* Account Dropdown */}
        <div className="col-md-4">
          <label className="form-label">Account *</label>
          <select
            name="Account_Name"
            className="form-select"
            required
            onFocus={handleAccountFocus}
            onChange={handleChange}
            value={formData.Account_Name}
          >
            <option value="">-- Select Account --</option>
            {loadingAccounts ? (
              <option disabled>Loading accounts...</option>
            ) : (
              accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.Account_Name || acc.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Contact Dropdown */}
        <div className="col-md-4">
          <label className="form-label">Contact</label>
          <select
            name="Contact_Name"
            className="form-select"
            onFocus={handleContactFocus}
            onChange={handleChange}
            value={formData.Contact_Name}
          >
            <option value="">-- Select Contact --</option>
            {loadingContacts ? (
              <option disabled>Loading contacts...</option>
            ) : (
              contacts.map((con) => (
                <option key={con.id} value={con.id}>
                  {con.Full_Name ||
                    `${con.First_Name || ""} ${con.Last_Name || ""}`}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="col-md-12">
          <label className="form-label">Description</label>
          <textarea
            name="Description"
            className="form-control"
            rows={3}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/sales/deals")}
          >
            Cancel
          </button>
          <button disabled={loading} className="btn btn-primary" type="submit">
            {loading ? "Creating..." : "Create Deal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealCreate;
