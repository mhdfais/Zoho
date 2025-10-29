import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getContactById } from "../services/zohoCrmService"

const ContactView = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const res = await getContactById(id);
        setContact(res);
      } catch (err) {
        console.error(err);
        setError("Failed to load contact details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading contact details...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center my-4">{error}</div>
    );

  if (!contact)
    return (
      <div className="alert alert-secondary text-center my-4">
        Contact not found.
      </div>
    );

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/sales/contacts" className="btn btn-outline-primary d-flex align-items-center">
          <FiArrowLeft className="me-2" /> Back to Contacts
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary mb-3">Contact Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Full Name:</strong>
              <div>{`${contact.First_Name || ""} ${contact.Last_Name || ""}`.trim() || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Email:</strong>
              <div>{contact.Email || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Phone:</strong>
              <div>{contact.Phone || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Mobile:</strong>
              <div>{contact.Mobile || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Title:</strong>
              <div>{contact.Title || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Department:</strong>
              <div>{contact.Department || "—"}</div>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="card-title text-primary mb-3">Account Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Account Name:</strong>
              <div>
                {contact.Account_Name ? (
                  <Link
                    to={`/sales/accounts/${contact.Account_Name.id}`}
                    className="text-decoration-none text-primary"
                  >
                    {contact.Account_Name.name}
                  </Link>
                ) : (
                  "—"
                )}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Lead Source:</strong>
              <div>{contact.Lead_Source || "—"}</div>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="card-title text-primary mb-3">Address Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Mailing Address:</strong>
              <div>
                {[
                  contact.Mailing_Street,
                  contact.Mailing_City,
                  contact.Mailing_State,
                  contact.Mailing_Zip,
                  contact.Mailing_Country,
                ]
                  .filter(Boolean)
                  .join(", ") || "—"}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Other Address:</strong>
              <div>
                {[
                  contact.Other_Street,
                  contact.Other_City,
                  contact.Other_State,
                  contact.Other_Zip,
                  contact.Other_Country,
                ]
                  .filter(Boolean)
                  .join(", ") || "—"}
              </div>
            </div>
          </div>

          {contact.Description && (
            <>
              <hr className="my-4" />
              <h5 className="card-title text-primary mb-3">Description</h5>
              <p className="text-muted">{contact.Description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactView;
