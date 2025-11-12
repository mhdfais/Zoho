import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getLeadbyId } from "../services/zohoCrmService";

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const res = await getLeadbyId(id);
        setLead(res.data);
      } catch (error) {
        console.error("Error fetching lead details", error);
        toast.error("Failed to load lead details");
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!lead) {
    return <p className="text-center text-muted mt-5">Lead not found</p>;
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">{lead.Full_Name || `${lead.First_Name || ""} ${lead.Last_Name || ""}`}</h4>
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <span className="nav-link active fw-semibold" style={{ fontSize: "0.9rem" }}>
                Overview
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link text-muted fw-semibold" style={{ fontSize: "0.9rem" }}>
                Timeline
              </span>
            </li>
          </ul>
        </div>
        <button className="btn btn-outline-primary px-4">Edit</button>
      </div>

      {/* Top Summary */}
      <div className="p-4 rounded-3 bg-white shadow-sm mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <p className="fw-semibold mb-1 text-secondary small">Lead Owner</p>
            <p className="text-dark mb-0">{lead.Owner?.name || "—"}</p>
          </div>
          <div className="col-md-3">
            <p className="fw-semibold mb-1 text-secondary small">Email</p>
            <p className="text-dark mb-0">{lead.Email || "—"}</p>
          </div>
          <div className="col-md-3">
            <p className="fw-semibold mb-1 text-secondary small">Phone</p>
            <p className="text-dark mb-0">{lead.Phone || "—"}</p>
          </div>
          <div className="col-md-3">
            <p className="fw-semibold mb-1 text-secondary small">Lead Status</p>
            <p className="text-dark mb-0">{lead.Lead_Status || "—"}</p>
          </div>
        </div>
      </div>

      {/* Lead Information Section */}
      <div className="p-4 rounded-3 bg-white shadow-sm mb-4">
        <h6 className="fw-bold mb-3">Lead Information</h6>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Lead Owner</p>
              <p className="fw-semibold text-dark">{lead.Owner?.name || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Company</p>
              <p className="fw-semibold text-dark">{lead.Company || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Title</p>
              <p className="fw-semibold text-dark">{lead.Title || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Phone</p>
              <p className="fw-semibold text-dark">{lead.Phone || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Lead Source</p>
              <p className="fw-semibold text-dark">{lead.Lead_Source || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Industry</p>
              <p className="fw-semibold text-dark">{lead.Industry || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Email Opt Out</p>
              <p className="fw-semibold text-dark">{lead.Email_Opt_Out ? "Yes" : "No"}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Lead Name</p>
              <p className="fw-semibold text-dark">{lead.Full_Name || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Email</p>
              <p className="fw-semibold text-dark">{lead.Email || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Fax</p>
              <p className="fw-semibold text-dark">{lead.Fax || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Website</p>
              <p className="fw-semibold text-dark">{lead.Website || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Lead Status</p>
              <p className="fw-semibold text-dark">{lead.Lead_Status || "—"}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary small">Created By</p>
              <p className="fw-semibold text-dark">
                {lead.Created_By?.name || "—"} <br />
                <small className="text-muted">{lead.Created_Time ? new Date(lead.Created_Time).toLocaleString() : "—"}</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="p-4 rounded-3 bg-white shadow-sm mb-4">
        <h6 className="fw-bold mb-3">Address Information</h6>
        <div className="row g-4">
          <div className="col-md-3">
            <p className="text-secondary small mb-1">Street</p>
            <p className="fw-semibold text-dark">{lead.Street || "—"}</p>
          </div>
          <div className="col-md-3">
            <p className="text-secondary small mb-1">City</p>
            <p className="fw-semibold text-dark">{lead.City || "—"}</p>
          </div>
          <div className="col-md-3">
            <p className="text-secondary small mb-1">State</p>
            <p className="fw-semibold text-dark">{lead.State || "—"}</p>
          </div>
          <div className="col-md-3">
            <p className="text-secondary small mb-1">Country</p>
            <p className="fw-semibold text-dark">{lead.Country || "—"}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 rounded-3 bg-white shadow-sm">
        <h6 className="fw-bold mb-2">Description Information</h6>
        <div
          className="border rounded p-3 bg-light"
          style={{ minHeight: "70px", whiteSpace: "pre-line" }}
        >
          {lead.Description || "—"}
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
