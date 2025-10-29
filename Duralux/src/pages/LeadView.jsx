import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getLeadbyId } from "../services/zohoCrmService";

const LeadView = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const res = await getLeadbyId(id);
        setLead(res);
      } catch (err) {
        console.error(err);
        setError("Failed to load lead details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading lead details...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center my-4">{error}</div>
    );

  if (!lead)
    return (
      <div className="alert alert-secondary text-center my-4">
        Lead not found.
      </div>
    );

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/sales/leads" className="btn btn-outline-primary d-flex align-items-center">
          <FiArrowLeft className="me-2" /> Back to Leads
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary mb-3">Lead Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Full Name:</strong>
              <div>
                {[lead.First_Name, lead.Last_Name].filter(Boolean).join(" ") || "—"}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Company:</strong>
              <div>{lead.Company || "—"}</div>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Email:</strong>
              <div>
                {lead.Email ? (
                  <a href={`mailto:${lead.Email}`}>{lead.Email}</a>
                ) : (
                  "—"
                )}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Phone:</strong>
              <div>{lead.Phone || "—"}</div>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Mobile:</strong>
              <div>{lead.Mobile || "—"}</div>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Lead Source:</strong>
              <div>{lead.Lead_Source || "—"}</div>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Lead Status:</strong>
              <div>{lead.Lead_Status || "—"}</div>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Industry:</strong>
              <div>{lead.Industry || "—"}</div>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Annual Revenue:</strong>
              <div>{lead.Annual_Revenue || "—"}</div>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Number of Employees:</strong>
              <div>{lead.No_of_Employees || "—"}</div>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Rating:</strong>
              <div>{lead.Rating || "—"}</div>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="card-title text-primary mb-3">Address Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Street:</strong>
              <div>{lead.Street || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>City:</strong>
              <div>{lead.City || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>State:</strong>
              <div>{lead.State || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Zip Code:</strong>
              <div>{lead.Zip_Code || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Country:</strong>
              <div>{lead.Country || "—"}</div>
            </div>
          </div>

          {lead.Description && (
            <>
              <hr className="my-4" />
              <h5 className="card-title text-primary mb-3">Description</h5>
              <p className="text-muted">{lead.Description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadView;
