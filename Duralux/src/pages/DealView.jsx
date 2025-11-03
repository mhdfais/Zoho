import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getDealbyId } from "../services/zohoCrmService";

const DealView = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        setLoading(true);
        const res = await getDealbyId(id);
        setDeal(res);
      } catch (err) {
        console.error(err);
        setError("Failed to load deal details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading deal details...</p>
      </div>
    );

  if (error)
    return <div className="alert alert-danger text-center my-4">{error}</div>;

  if (!deal)
    return (
      <div className="alert alert-secondary text-center my-4">
        Deal not found.
      </div>
    );

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link
          to="/sales/deals"
          className="btn btn-outline-primary d-flex align-items-center"
        >
          <FiArrowLeft className="me-2" /> Back to Deals
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary mb-3">Deal Information</h5>
          <div className="row">
            <div className="col-md-4 mb-3">
              <strong>Deal Name:</strong>
              <div>{deal.Deal_Name || "—"}</div>
            </div>
            <div className="col-md-4 mb-3">
              <strong>Stage:</strong>
              <div>{deal.Stage || "—"}</div>
            </div>
            <div className="col-md-4 mb-3">
              <strong>Amount:</strong>
              <div>{deal.Amount ? `₹${deal.Amount}` : "—"}</div>
            </div>
            <div className="col-md-4 mb-3">
              <strong>Closing Date:</strong>
              <div>{deal.Closing_Date || "—"}</div>
            </div>
            <div className="col-md-4 mb-3">
              <strong>Type:</strong>
              <div>{deal.Type || "—"}</div>
            </div>
            <div className="col-md-4 mb-3">
              <strong>Lead Source:</strong>
              <div>{deal.Lead_Source || "—"}</div>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="card-title text-primary mb-3">Related Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Account:</strong>
              <div>
                {deal.Account_Name ? (
                  <Link
                    to={`/sales/accounts/${deal.Account_Name.id}`}
                    className="text-decoration-none text-primary"
                  >
                    {deal.Account_Name.name}
                  </Link>
                ) : (
                  "—"
                )}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Contact:</strong>
              <div>
                {deal.Contact_Name ? (
                  <Link
                    to={`/sales/contacts/${deal.Contact_Name.id}`}
                    className="text-decoration-none text-primary"
                  >
                    {deal.Contact_Name.name}
                  </Link>
                ) : (
                  "—"
                )}
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="card-title text-primary mb-3">Owner & Details</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Owner:</strong>
              <div>{deal.Owner?.name || "—"}</div>
            </div>
            {/* <div className="col-md-6 mb-3">
              <strong>Created Time:</strong>
              <div>{new Date(deal.Created_Time).toLocaleString || "—"}</div>
            </div> */}
          </div>

          {deal.Description && (
            <>
              <hr className="my-4" />
              <h5 className="card-title text-primary mb-3">Description</h5>
              <p className="text-muted">{deal.Description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealView;
