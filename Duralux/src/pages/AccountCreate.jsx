import React, { useState } from "react";
import { createAccount } from "../services/zohoCrmService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AccountCreate = () => {
  const [formData, setFormData] = useState({
    accountName: "",
    phone: "",
    website: "",
    accountNumber: "",
    accountType: "",
    industry: "",
    employees: "",
    annualRevenue: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingCode: "",
    billingCountry: "",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingCode: "",
    shippingCountry: "",
    description: "",
  });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await createAccount(formData);
      navigate("/sales/accounts");
      // console.log("created");
    } catch (error) {
      setloading(false);
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait a few seconds.");
      } else {
        toast.error("Failed to load accounts.");
        console.error("Error fetching accounts:", error);
      }
    } finally {
      setloading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      accountName: "",
      phone: "",
      website: "",
      accountNumber: "",
      accountType: "",
      industry: "",
      employees: "",
      annualRevenue: "",
      billingStreet: "",
      billingCity: "",
      billingState: "",
      billingCode: "",
      billingCountry: "",
      shippingStreet: "",
      shippingCity: "",
      shippingState: "",
      shippingCode: "",
      shippingCountry: "",
      description: "",
    });
    navigate("/sales/accounts");
  };

  return (
    <div className="container pt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0 text-white">Create New Account</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Left Column */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Account Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Account Type</label>
                  <select
                    name="accountType"
                    value={formData.accountType}
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
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Industry</option>
                    <option value="ASP">
                      ASP (Application Service Provider)
                    </option>
                    <option value="Data/Telecom OEM">Data / Telecom OEM</option>
                    <option value="ERP">
                      ERP (Enterprise Resource Planning)
                    </option>
                    <option value="Government">Government / Industry</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Large Enterprise">Large Enterprise</option>
                    <option value="Management ISV">Management ISV</option>
                    <option value="MSP">MSP (Managed Service Provider)</option>
                    <option value="Network Equipment">
                      Network Equipment Enterprise
                    </option>
                    <option value="Non Management ISP">
                      Non Management ISP
                    </option>
                    <option value="Optical Networking">
                      Optical Networking
                    </option>
                    <option value="SME">Small / Medium Enterprise</option>
                    <option value="Storage Equipment">Storage Equipment</option>
                    <option value="Storage Service Provider">
                      Storage Service Provider
                    </option>
                    <option value="Systems Integrator">
                      Systems Integrator
                    </option>
                    <option value="Wireless Industry">Wireless Industry</option>
                    <option value="Financial Services">
                      Financial Services
                    </option>
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
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Annual Revenue</label>
                  <input
                    type="number"
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                <h6 className="fw-bold text-secondary mt-2">Billing Address</h6>

                <div className="mb-2">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    name="billingStreet"
                    value={formData.billingStreet}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="billingCity"
                      value={formData.billingCity}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="billingState"
                      value={formData.billingState}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      name="billingCode"
                      value={formData.billingCode}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      name="billingCountry"
                      value={formData.billingCountry}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <h6 className="fw-bold text-secondary mt-3">
                  Shipping Address
                </h6>

                <div className="mb-2">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    name="shippingStreet"
                    value={formData.shippingStreet}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="shippingState"
                      value={formData.shippingState}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      name="shippingCode"
                      value={formData.shippingCode}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      name="shippingCountry"
                      value={formData.shippingCountry}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary"
              >
                {loading ? "Creating" : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountCreate;
