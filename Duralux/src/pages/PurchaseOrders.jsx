import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllPurchaseOrders } from "../services/zohoCrmService";

const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        setLoading(true);
        const res = await getAllPurchaseOrders();
        setPurchaseOrders(res.data || []);
      } catch (error) {
        console.error("Error fetching purchase orders", error);
        toast.error("Failed to load purchase orders");
      } finally {
        setLoading(false);
      }
    };
    fetchPurchaseOrders();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Purchase Orders</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Purchase Order
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
      ) : purchaseOrders.length === 0 ? (
        <p className="text-center text-muted mt-5">No purchase orders available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Purchase Orders</h6>
          </div>

          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Subject</th>
                  <th scope="col">Vendor Name</th>
                  <th scope="col">Contact Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th scope="col">Owner</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border">
                {purchaseOrders.map((po, i) => (
                  <tr key={po.id || i} style={{ fontSize: "0.75rem" }}>
                    <td
                      className="fw-semibold text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {po.Subject || "N/A"}
                    </td>

                    <td className="text-muted">
                      {po.Vendor_Name?.name || "N/A"}
                    </td>

                    <td className="text-muted">
                      {po.Contact_Name?.name|| "N/A"}
                    </td>

                    <td className="text-muted">{po.Status || "N/A"}</td>

                    <td className="text-muted">
                      {po.Grand_Total
                        ? `AED ${po.Grand_Total.toLocaleString()}`
                        : "N/A"}
                    </td>

                    <td className="text-muted">{po.Owner?.name || "N/A"}</td>

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

export default PurchaseOrders;
