import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createContact, getAllAccounts } from "../services/zohoCrmService";

const ContactCreate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mobile: "",
    title: "",
    department: "",
    leadSource: "",
    description: "",
    mailingStreet: "",
    mailingCity: "",
    mailingState: "",
    mailingCode: "",
    mailingCountry: "",
    otherStreet: "",
    otherCity: "",
    otherState: "",
    otherCode: "",
    otherCountry: "",
    accountId: "",
    vendorId: "",
  });

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  //   const [vendors, setVendors] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  //   const [loadingVendors, setLoadingVendors] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Lazy-load accounts
  const handleAccountFocus = async () => {
    if (accounts.length > 0) return;
    try {
      setLoadingAccounts(true);
      const res = await getAllAccounts();
      setAccounts(res.data || []);
      //   console.log(res)
    } catch (err) {
      toast.error("Failed to load accounts.");
      console.error(err);
    } finally {
      setLoadingAccounts(false);
    }
  };

  // Lazy-load vendors
  //   const handleVendorFocus = async () => {
  //     if (vendors.length > 0) return;
  //     try {
  //       setLoadingVendors(true);
  //       const res = await fetchVendors();
  //       setVendors(res.data || []);
  //     } catch (err) {
  //       toast.error("Failed to load vendors.");
  //       console.error(err);
  //     } finally {
  //       setLoadingVendors(false);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData.lastName.trim() === "") {
        toast.error("last name cannot be empty");
        return;
      }
      await createContact(formData);
      toast.success("Contact created successfully!");
      navigate("/sales/contacts");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait a few seconds.");
      } else {
        toast.error("Failed to create contact.");
        console.error("Error creating contact:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/sales/contacts");
  };

  return (
    <div className="container pt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0 text-white">Create New Contact</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Left Column */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
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
                  <label className="form-label">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Account Name dropdown */}
                <div className="mb-3">
                  <label className="form-label">Account Name</label>
                  <select
                    name="accountId"
                    value={formData.accountId}
                    onChange={handleChange}
                    onFocus={handleAccountFocus}
                    className="form-select"
                  >
                    <option value="">Select Account</option>
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

                {/* Vendor dropdown */}
                {/* <div className="mb-3">
                  <label className="form-label">Vendor Name</label>
                  <select
                    name="vendorId"
                    value={formData.vendorId}
                    onChange={handleChange}
                    onFocus={handleVendorFocus}
                    className="form-select"
                  >
                    <option value="">Select Vendor</option>
                    {loadingVendors ? (
                      <option disabled>Loading vendors...</option>
                    ) : (
                      vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.Vendor_Name || vendor.name}
                        </option>
                      ))
                    )}
                  </select>
                </div> */}

                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Lead Source</label>
                  <select
                    name="leadSource"
                    value={formData.leadSource}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Source</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Employee Referral">Employee Referral</option>
                    <option value="Online Store">Online Store</option>
                    <option value="Partner">Partner</option>
                    <option value="Public Relations">Public Relations</option>
                    <option value="Trade Show">Trade Show</option>
                    <option value="Web Download">Web Download</option>
                    <option value="Web Research">Web Research</option>
                    <option value="Chat">Chat</option>
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
                    name="mailingStreet"
                    value={formData.mailingStreet}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="mailingCity"
                      value={formData.mailingCity}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="mailingState"
                      value={formData.mailingState}
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
                      name="mailingCode"
                      value={formData.mailingCode}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      name="mailingCountry"
                      value={formData.mailingCountry}
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
                    name="otherStreet"
                    value={formData.otherStreet}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="otherCity"
                      value={formData.otherCity}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="otherState"
                      value={formData.otherState}
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
                      name="otherCode"
                      value={formData.otherCode}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      name="otherCountry"
                      value={formData.otherCountry}
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
                {loading ? "Creating..." : "Create Contact"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactCreate;
