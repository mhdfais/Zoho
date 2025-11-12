import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllInvoices } from "../services/zohoCrmService";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const res = await getAllInvoices();
        setInvoices(res.data || []);
      } catch (error) {
        console.error("Error fetching invoices", error);
        toast.error("Failed to load invoices");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Invoices</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Invoice
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
      ) : invoices.length === 0 ? (
        <p className="text-center text-muted mt-5">No invoices available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Invoices</h6>
          </div>

          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  {/* <th scope="col">Invoice Number</th> */}
                  <th scope="col">Subject</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Contact Name</th>
                  <th scope="col">Invoice Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th scope="col">Owner</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border">
                {invoices.map((invoice, i) => (
                  <tr key={invoice.id || i} style={{ fontSize: "0.75rem" }}>
                    {/* <td className="fw-semibold text-dark">
                      {invoice.Invoice_Number || "N/A"}
                    </td> */}

                    <td
                      className="text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {invoice.Subject || "N/A"}
                    </td>

                    <td className="text-muted">
                      {invoice.Account_Name?.name || "N/A"}
                    </td>

                    <td className="text-muted">
                      {invoice.Contact_Name?.name || "N/A"}
                    </td>

                    <td className="text-muted">
                      {invoice.Invoice_Date
                        ? new Date(invoice.Invoice_Date).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="text-muted">{invoice.Status || "N/A"}</td>

                    <td className="text-muted">
                      {invoice.Grand_Total
                        ? `AED ${invoice.Grand_Total.toLocaleString()}`
                        : "N/A"}
                    </td>

                    <td className="text-muted">{invoice.Owner?.name || "N/A"}</td>

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

export default Invoices;
