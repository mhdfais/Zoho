import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  //   getDealById,
  editDeal,
  getAllAccounts,
  getAllContacts,
  getDealbyId,
} from "../../services/zohoCrmService";

const DealEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Deal_Name: "",
    Amount: "",
    Stage: "",
    Closing_Date: "",
    Type: "",
    Lead_Source: "",
    Account_Name: "",
    Contact_Name: "",
    Description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [currentAccountName, setCurrentAccountName] = useState("");
  const [currentContactName, setCurrentContactName] = useState("");

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

  // Fetch deal details by ID
  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const deal = await getDealbyId(id);

        setFormData({
          Deal_Name: deal.Deal_Name || "",
          Amount: deal.Amount || "",
          Stage: deal.Stage || "",
          Closing_Date: deal.Closing_Date || "",
          Type: deal.Type || "",
          Lead_Source: deal.Lead_Source || "",
          Account_Name: deal.Account_Name?.id || "",
          Contact_Name: deal.Contact_Name?.id || "",
          Description: deal.Description || "",
        });
        setCurrentAccountName(deal.Account_Name?.name || "");
        setCurrentContactName(deal.Contact_Name?.name || "");
        // console.log(deal)
      } catch (err) {
        toast.error("Failed to load deal details");
        console.error("Error fetching deal:", err);
        setError("Failed to load deal details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id]);

  // Lazy load accounts
  const handleAccountFocus = async () => {
    if (accounts.length > 0) return;
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

  // Lazy load contacts
  const handleContactFocus = async () => {
    if (contacts.length > 0) return;
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit updated deal
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (
        formData.Deal_Name.trim() === "" ||
        formData.Stage.trim() === "" ||
        formData.Closing_Date.trim() === "" ||
        formData.Account_Name.trim() === ""
      ) {
        toast.error(
          "Deal Name, Stage, closing date, account name are required"
        );
        return;
      }

      await editDeal(id, formData);
      toast.success("Deal updated successfully!");
      navigate("/sales/deals");
    } catch (err) {
      toast.error("Failed to update deal");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center pt-4">Loading...</p>;
  if (error)
    return <div className="alert alert-danger text-center mt-4">{error}</div>;

  return (
    <div className="container pt-4">
      <h4 className="mb-4">Edit Deal</h4>

      <form onSubmit={handleSubmit} className="row g-3">
        {/* Deal Name */}
        <div className="col-md-6">
          <label className="form-label">Deal Name *</label>
          <input
            type="text"
            name="Deal_Name"
            value={formData.Deal_Name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Amount */}
        <div className="col-md-6">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="Amount"
            value={formData.Amount}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Stage */}
        <div className="col-md-6">
          <label className="form-label">Stage *</label>
          <select
            name="Stage"
            className="form-select"
            value={formData.Stage}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Stage --</option>
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        {/* Closing Date */}
        <div className="col-md-6">
          <label className="form-label">Closing Date *</label>
          <input
            type="date"
            name="Closing_Date"
            value={formData.Closing_Date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Type */}
        <div className="col-md-6">
          <label className="form-label">Type</label>
          <select
            name="Type"
            className="form-select"
            value={formData.Type}
            onChange={handleChange}
          >
            <option value="">-- Select Type --</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Lead Source */}
        <div className="col-md-6">
          <label className="form-label">Lead Source</label>
          <select
            name="Lead_Source"
            className="form-select"
            value={formData.Lead_Source}
            onChange={handleChange}
          >
            <option value="">-- Select Lead Source --</option>
            {leadSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        {/* Account */}
        <div className="col-md-6">
          <label className="form-label">Account *</label>
          <select
            name="Account_Name"
            className="form-select"
            value={formData.Account_Name}
            onFocus={handleAccountFocus}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Account --</option>
            {formData.Account_Name &&
              accounts.length === 0 &&
              currentAccountName && (
                <option value={formData.Account_Name}>
                  {currentAccountName}
                </option>
              )}
            {loadingAccounts ? (
              <option disabled>Loading accounts...</option>
            ) : (
              accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.Account_Name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Contact */}
        <div className="col-md-6">
          <label className="form-label">Contact</label>
          <select
            name="Contact_Name"
            className="form-select"
            value={formData.Contact_Name}
            onFocus={handleContactFocus}
            onChange={handleChange}
          >
            <option value="">-- Select Contact --</option>
            {formData.Contact_Name &&
              contacts.length === 0 &&
              currentContactName && (
                <option value={formData.Contact_Name}>
                  {currentContactName}
                </option>
              )}
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

        {/* Description */}
        <div className="col-md-12">
          <label className="form-label">Description</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className="form-control"
            rows={3}
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/sales/deals")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Updating..." : "Update Deal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealEdit;
