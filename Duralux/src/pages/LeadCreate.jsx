import React, { useState } from "react";
import { createLead } from "../services/zohoCrmService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LeadCreate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    mobile: "",
    fax: "",
    website: "",
    leadSource: "",
    leadStatus: "",
    annualRevenue: "",
    industry: "",
    numberOfEmployees: "",
    rating: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    description: "",
    title: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData.company.trim() === "" || formData.lastName.trim() === "") {
        toast.error("company and last name are required");
        return;
      }
      await createLead(formData);
      toast.success("Lead created successfully!");
      navigate("/sales/leads");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait a few seconds.");
      } else {
        toast.error("Failed to create lead.");
        console.error("Error creating lead:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/sales/leads");
  };

  return (
    <div className="container pt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0 text-white">Create New Lead</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* LEFT COLUMN */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    First Name 
                  </label>
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
                  <label className="form-label">
                    Company <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

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
              </div>

              {/* RIGHT COLUMN */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Lead Source</label>
                  <select
                    name="leadSource"
                    value={formData.leadSource}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Source</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Employee Referral">Employee Referral</option>
                    <option value="External Referral">External Referral</option>
                    <option value="Online Store">Online Store</option>
                    <option value="Partner">Partner</option>
                    <option value="Public Relations">Public Relations</option>
                    <option value="Trade Show">Trade Show</option>
                    <option value="Word of Mouth">Word of Mouth</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Lead Status</label>
                  <select
                    name="leadStatus"
                    value={formData.leadStatus}
                    onChange={handleChange}
                    className="form-select"
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
                    <option value="Pre Qualified">Pre Qualified</option>
                    <option value="Not Qualified">Not Qualified</option>
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
                    <option value="Apparel">Apparel</option>
                    <option value="Banking">Banking</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Chemicals">Chemicals</option>
                    <option value="Communications">Communications</option>
                    <option value="Construction">Construction</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Education">Education</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Energy">Energy</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Retail">Retail</option>
                    <option value="Technology">Technology</option>
                    <option value="Telecommunications">
                      Telecommunications
                    </option>
                    <option value="Transportation">Transportation</option>
                  </select>
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

                <div className="mb-3">
                  <label className="form-label">No. of Employees</label>
                  <input
                    type="number"
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Rating</option>
                    <option value="Acquired">Acquired</option>
                    <option value="Active">Active</option>
                    <option value="Market Failed">Market Failed</option>
                    <option value="Project Cancelled">Project Cancelled</option>
                    <option value="Shut Down">Shut Down</option>
                  </select>
                </div>

                <h6 className="fw-bold text-secondary mt-3">Address</h6>
                <div className="mb-2">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
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
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
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
                {loading ? "Creating..." : "Create Lead"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadCreate;
