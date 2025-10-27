import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getAccountById } from "../services/zohoCrmService";

const AccountView = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const res = await getAccountById(id);
        setAccount(res);
      } catch (err) {
        console.error(err);
        setError("Failed to load account details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading account details...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center my-4">{error}</div>
    );

  if (!account)
    return (
      <div className="alert alert-secondary text-center my-4">
        Account not found.
      </div>
    );

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/sales/accounts" className="btn btn-outline-primary d-flex align-items-center">
          <FiArrowLeft className="me-2" /> Back to Accounts
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary mb-3">Account Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Account Name:</strong>
              <div>{account.Account_Name || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Phone:</strong>
              <div>{account.Phone || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Website:</strong>
              <div>
                {account.Website ? (
                  <a
                    href={account.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {account.Website}
                  </a>
                ) : (
                  "—"
                )}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Industry:</strong>
              <div>{account.Industry || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Account Type:</strong>
              <div>{account.Account_Type || "—"}</div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Owner:</strong>
              <div>{account.Owner?.name || "—"}</div>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="card-title text-primary mb-3">Address Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Billing Address:</strong>
              <div>
                {[account.Billing_Street, account.Billing_City, account.Billing_State, account.Billing_Country]
                  .filter(Boolean)
                  .join(", ") || "—"}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Shipping Address:</strong>
              <div>
                {[account.Shipping_Street, account.Shipping_City, account.Shipping_State, account.Shipping_Country]
                  .filter(Boolean)
                  .join(", ") || "—"}
              </div>
            </div>
          </div>

          {account.Description && (
            <>
              <hr className="my-4" />
              <h5 className="card-title text-primary mb-3">Description</h5>
              <p className="text-muted">{account.Description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountView;
