import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllAccounts } from "../services/zohoCrmService";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const res = await getAllAccounts();
        setAccounts(res.data || []);
      } catch (error) {
        console.error("Error fetching accounts", error);
        toast.error("Failed to load accounts");
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Accounts</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Account
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : accounts.length === 0 ? (
        <p className="text-center text-muted mt-5">No accounts available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Accounts</h6>
          </div>
          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Account Name</th>
                  <th scope="col">Website</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Industry</th>
                  <th scope="col">Account Owner</th>
                </tr>
              </thead>
              <tbody className="border">
                {accounts.map((account, i) => (
                  <tr key={account.id || i} style={{ fontSize: "0.75rem" }}>
                    <td
                      className="fw-semibold text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {account.Account_Name || "N/A"}
                    </td>

                    <td
                      className="text-muted text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {account.Website || "N/A"}
                    </td>

                    <td className="text-muted">{account.Phone || "N/A"}</td>

                    <td className="text-muted">{account.Industry || "N/A"}</td>

                    <td className="text-muted">
                      {account.Owner?.name || "N/A"}
                    </td>

                    <td className="text-center text-muted">
                      <div className="d-flex justify-content-center gap-4">
                        <GoTrash size={18} />
                        <FiEdit2 size={18} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Accounts;
