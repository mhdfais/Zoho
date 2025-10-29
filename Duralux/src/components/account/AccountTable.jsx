import React, { useEffect, useState } from "react";
import { FiEdit3, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { deleteAccount, fetchAccounts } from "../../services/zohoCrmService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const naviagte = useNavigate();

  useEffect(() => {
    const getAccounts = async () => {
      try {
        setError(null);
        const res = await fetchAccounts();
        setAccounts(res.data || []);
        // console.log(res.data);
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to load accounts.");
          console.error("Error fetching accounts:", error);
        }
        setError(error.message || "Failed to load accounts");
      } finally {
        setLoading(false);
      }
    };

    getAccounts();
  }, []);

  const handleAction = async (action, account, accId) => {
    if (action === "Edit") {
      naviagte(`/sales/edit-account/${accId}`);
    } else if (action === "Delete") {
      try {
        const confirmDelete = window.confirm(
          `Are you sure you want to delete account "${account.Account_Name}"?`
        );
        if (!confirmDelete) return;

        const res = await deleteAccount(account.id);
        setAccounts((prev) => prev.filter((a) => a.id !== account.id));
      } catch (error) {
       if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to delete accounts.");
          console.error("Error delete accounts:", error);
        }
      }
    }
  };

  if (loading)
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading accounts...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  if (accounts.length === 0)
    return (
      <div className="alert alert-secondary" role="alert">
        No accounts found.
      </div>
    );

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Accounts</h4>
        <button
          onClick={() => naviagte("/sales/create-account")}
          className="btn btn-primary"
        >
          + Create Account
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>Account Name</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Account Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, index) => (
              <tr
                key={index}
                className="cursor-pointer"
                onClick={() => naviagte(`/sales/account/${acc.id}`)}
              >
                <td>{acc.Account_Name || "—"}</td>
                <td>{acc.Phone || "—"}</td>
                <td>
                  {acc.Website ? (
                    <a
                      href={acc.Website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {acc.Website}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td>{acc.Owner?.name || "—"}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-light border"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiMoreHorizontal />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction("Edit", acc, acc.id);
                          }}
                        >
                          <FiEdit3 className="me-2" /> Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center text-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction("Delete", acc);
                          }}
                        >
                          <FiTrash2 className="me-2" /> Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountTable;
