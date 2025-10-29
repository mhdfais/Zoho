import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAccountById, editAccount } from "../../services/zohoCrmService";
import toast from "react-hot-toast";

const AccountEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Account_Name: "",
    Phone: "",
    Website: "",
    Account_Number: "",
    Account_Type: "",
    Industry: "",
    Employees: "",
    Annual_Revenue: "",
    Billing_Street: "",
    Billing_City: "",
    Billing_State: "",
    Billing_Code: "",
    Billing_Country: "",
    Shipping_Street: "",
    Shipping_City: "",
    Shipping_State: "",
    Shipping_Code: "",
    Shipping_Country: "",
    Description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch account by ID on mount
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccountById(id);
        // console.log(res)
        const account = res;
        setFormData({
          Account_Name: account.Account_Name || "",
          Phone: account.Phone || "",
          Website: account.Website || "",
          Account_Number: account.Account_Number || "",
          Account_Type: account.Account_Type || "",
          Industry: account.Industry || "",
          Employees: account.Employees || "",
          Annual_Revenue: account.Annual_Revenue || "",
          Billing_Street: account.Billing_Street || "",
          Billing_City: account.Billing_City || "",
          Billing_State: account.Billing_State || "",
          Billing_Code: account.Billing_Code || "",
          Billing_Country: account.Billing_Country || "",
          Shipping_Street: account.Shipping_Street || "",
          Shipping_City: account.Shipping_City || "",
          Shipping_State: account.Shipping_State || "",
          Shipping_Code: account.Shipping_Code || "",
          Shipping_Country: account.Shipping_Country || "",
          Description: account.Description || "",
        });
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to load accounts.");
          console.error("Error fetching accounts:", error);
        }
        setError("Failed to load account details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [id]);

  // Handle change
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
      if(formData.Account_Name.trim()===''){
        toast.error('account name is required')
        return
      }
      await editAccount(id, formData);
      navigate("/sales/accounts");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait a few seconds.");
      } else {
        toast.error("Failed to edit accounts.");
        console.error("Error edit accounts:", error);
      }
      setError("Failed to update account.");
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
      <h4 className="mb-4">Edit Account</h4>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left column */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Account Name</label>
              <input
                type="text"
                className="form-control"
                name="Account_Name"
                value={formData.Account_Name}
                onChange={handleChange}
                required
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
              <label className="form-label">Website</label>
              <input
                type="url"
                className="form-control"
                name="Website"
                value={formData.Website}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Account Number</label>
              <input
                type="number"
                className="form-control"
                name="Account_Number"
                value={formData.Account_Number}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Account Type</label>
              <select
                name="accountType"
                value={formData.Account_Type}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Type</option>
                <option value="Analyst">Analyst</option>
                <option value="Competitor">Competitor</option>
                <option value="Distributor">Distributor</option>
                <option value="Investor">Investor</option>
                <option value="Other">Other</option>
                <option value="Partner">Partner</option>
                <option value="Press">Press</option>
                <option value="Prospect">Prospect</option>
                <option value="Reseller">Reseller</option>
                <option value="Supplier">Supplier</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Industry</label>
              <select
                className="form-select"
                name="Industry"
                value={formData.Industry}
                onChange={handleChange}
              >
                <option value="">Select Industry</option>
                <option value="ASP">ASP (Application Service Provider)</option>
                <option value="Data/Telecom OEM">Data / Telecom OEM</option>
                <option value="ERP">ERP (Enterprise Resource Planning)</option>
                <option value="Government">Government / Industry</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Large Enterprise">Large Enterprise</option>
                <option value="Management ISV">Management ISV</option>
                <option value="MSP">MSP (Managed Service Provider)</option>
                <option value="Network Equipment">
                  Network Equipment Enterprise
                </option>
                <option value="Non Management ISP">Non Management ISP</option>
                <option value="Optical Networking">Optical Networking</option>
                <option value="SME">Small / Medium Enterprise</option>
                <option value="Storage Equipment">Storage Equipment</option>
                <option value="Storage Service Provider">
                  Storage Service Provider
                </option>
                <option value="Systems Integrator">Systems Integrator</option>
                <option value="Wireless Industry">Wireless Industry</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Education">Education</option>
                <option value="Technology">Technology</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Consulting">Consulting</option>
                <option value="Communications">Communications</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Employees</label>
              <input
                type="number"
                className="form-control"
                name="Employees"
                value={formData.Employees}
                onChange={handleChange}
              />
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
          </div>

          {/* Right column */}
          <div className="col-md-6">
            <h6 className="fw-bold mt-2">Billing Address</h6>
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                type="text"
                className="form-control"
                name="Billing_Street"
                value={formData.Billing_Street}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="Billing_City"
                value={formData.Billing_City}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="Billing_State"
                value={formData.Billing_State}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Zip Code</label>
              <input
                type="tetxt"
                className="form-control"
                name="Billing_Code"
                value={formData.Billing_Code}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                name="Billing_Country"
                value={formData.Billing_Country}
                onChange={handleChange}
              />
            </div>

            <h6 className="fw-bold mt-4">Shipping Address</h6>
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                type="text"
                className="form-control"
                name="Shipping_Street"
                value={formData.Shipping_Street}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="Shipping_City"
                value={formData.Shipping_City}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="Shipping_State"
                value={formData.Shipping_State}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Zip Code</label>
              <input
                type="text"
                className="form-control"
                name="Shipping_Code"
                value={formData.Shipping_Code}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                name="Shipping_Country"
                value={formData.Shipping_Country}
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
            className="btn btn-secondary me-2"
            onClick={() => navigate("/sales/accounts")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Updating..." : "Update Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountEdit;
