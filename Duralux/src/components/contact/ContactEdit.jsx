import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getContactById,
  editContact,
  fetchAccounts,
} from "../../services/zohoCrmService";
import toast from "react-hot-toast";

const ContactEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Phone: "",
    Mobile: "",
    Department: "",
    Title: "",
    Lead_Source: "",
    Account_Name: "",
    Mailing_Street: "",
    Mailing_City: "",
    Mailing_State: "",
    Mailing_Zip: "",
    Mailing_Country: "",
    Other_Street: "",
    Other_City: "",
    Other_State: "",
    Other_Zip: "",
    Other_Country: "",
    Description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [currentAccountName, setCurrentAccountName] = useState("");

  // Fetch contact by ID
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await getContactById(id);
        const contact = res;

        setFormData({
          First_Name: contact.First_Name || "",
          Last_Name: contact.Last_Name || "",
          Email: contact.Email || "",
          Phone: contact.Phone || "",
          Mobile: contact.Mobile || "",
          Department: contact.Department || "",
          Title: contact.Title || "",
          Lead_Source: contact.Lead_Source || "",
          Account_Name: contact.Account_Name?.id || "",
          Mailing_Street: contact.Mailing_Street || "",
          Mailing_City: contact.Mailing_City || "",
          Mailing_State: contact.Mailing_State || "",
          Mailing_Zip: contact.Mailing_Zip || "",
          Mailing_Country: contact.Mailing_Country || "",
          Other_Street: contact.Other_Street || "",
          Other_City: contact.Other_City || "",
          Other_State: contact.Other_State || "",
          Other_Zip: contact.Other_Zip || "",
          Other_Country: contact.Other_Country || "",
          Description: contact.Description || "",
        });
         setCurrentAccountName(contact.Account_Name?.name || "");
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to load contact details.");
          console.error("Error fetching contact:", error);
        }
        setError("Failed to load contact details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountDropdown = async () => {
    if (accounts.length > 0) return;
    try {
      setAccountsLoading(true);
      const res = await fetchAccounts();
      setAccounts(res.data || []);
    } catch (error) {
      toast.error("Failed to load accounts.");
      console.error("Error fetching accounts:", error);
    } finally {
      setAccountsLoading(false);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (formData.Last_Name.trim() === "") {
        toast.error("last name is required");
        return;
      }
      await editContact(id, formData);
      toast.success("Contact updated successfully!");
      navigate("/sales/contacts");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait a few seconds.");
      } else {
        toast.error("Failed to update contact.");
        console.error("Error updating contact:", error);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center pt-4">Loading...</p>;
  if (error)
    return <div className="alert alert-danger text-center mt-4">{error}</div>;

  return (
    <div className="container pt-4">
      <h4 className="mb-4">Edit Contact</h4>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="First_Name"
                value={formData.First_Name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="Last_Name"
                value={formData.Last_Name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="number"
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input
                type="number"
                name="Mobile"
                value={formData.Mobile}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="Department"
                value={formData.Department}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Lead Source</label>
              <select
                name="Lead_Source"
                value={formData.Lead_Source}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Lead Source</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Employee Referral">Employee Referral</option>
                <option value="External Referral">External Referral</option>
                <option value="Online Store">Online Store</option>
                <option value="Partner">Partner</option>
                <option value="Public Relations">Public Relations</option>
                <option value="Trade Show">Trade Show</option>
                <option value="Web Form">Web Form</option>
                <option value="Word of mouth">Word of mouth</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Account</label>
              <select
                className="form-select"
                name="Account_Name"
                value={formData.Account_Name}
                onFocus={handleAccountDropdown}
                onChange={handleChange}
              >
                <option value="">-- Select Account --</option>
                {formData.Account_Name &&
                  accounts.length === 0 &&
                  currentAccountName && (
                    <option value={formData.Account_Name}>
                      {currentAccountName}
                    </option>
                  )}
                {accountsLoading ? (
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
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <h6 className="fw-bold text-secondary mt-2">Mailing Address</h6>
            <div className="mb-2">
              <label className="form-label">Street</label>
              <input
                type="text"
                name="Mailing_Street"
                value={formData.Mailing_Street}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="Mailing_City"
                  value={formData.Mailing_City}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-2">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="Mailing_State"
                  value={formData.Mailing_State}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  name="Mailing_Zip"
                  value={formData.Mailing_Zip}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-2">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="Mailing_Country"
                  value={formData.Mailing_Country}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <h6 className="fw-bold text-secondary mt-3">Other Address</h6>
            <div className="mb-2">
              <label className="form-label">Street</label>
              <input
                type="text"
                name="Other_Street"
                value={formData.Other_Street}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="Other_City"
                  value={formData.Other_City}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-2">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="Other_State"
                  value={formData.Other_State}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  name="Other_Zip"
                  value={formData.Other_Zip}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-2">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="Other_Country"
                  value={formData.Other_Country}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">Description</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                className="form-control"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/sales/contacts")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Updating..." : "Update Contact"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactEdit;
