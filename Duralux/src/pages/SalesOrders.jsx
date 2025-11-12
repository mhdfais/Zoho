import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllSalesOrders } from "../services/zohoCrmService";

const SalesOrders = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesOrders = async () => {
      try {
        setLoading(true);
        const res = await getAllSalesOrders();
        setSalesOrders(res.data || []);
      } catch (error) {
        console.error("Error fetching sales orders", error);
        toast.error("Failed to load sales orders");
      } finally {
        setLoading(false);
      }
    };
    fetchSalesOrders();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Sales Orders</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Sales Order
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
      ) : salesOrders.length === 0 ? (
        <p className="text-center text-muted mt-5">No sales orders available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Sales Orders</h6>
          </div>

          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Subject</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Contact Name</th>
                  {/* <th scope="col">Due Date</th> */}
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th scope="col">Owner</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border">
                {salesOrders.map((order, i) => (
                  <tr key={order.id || i} style={{ fontSize: "0.75rem" }}>
                    <td
                      className="fw-semibold text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {order.Subject || "N/A"}
                    </td>

                    <td className="text-muted">
                      {order.Account_Name?.name || "N/A"}
                    </td>

                    <td className="text-muted">
                      {order.Contact_Name?.name || "N/A"}
                    </td>

                    {/* <td className="text-muted">
                      {order.Due_Date
                        ? new Date(order.Due_Date).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td> */}

                    <td className="text-muted">{order.Status || "N/A"}</td>

                    <td className="text-muted">
                      {order.Grand_Total
                        ? `AED ${order.Grand_Total.toLocaleString()}`
                        : "N/A"}
                    </td>

                    <td className="text-muted">{order.Owner?.name || "N/A"}</td>

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

export default SalesOrders;
