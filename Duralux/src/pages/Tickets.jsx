import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllTickets } from "../services/zohoCrmService"; 

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await getAllTickets();
        setTickets(res.data || []);
      } catch (error) {
        console.error("Error fetching desk tickets", error);
        toast.error("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Desk Tickets</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Ticket
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
      ) : tickets.length === 0 ? (
        <p className="text-center text-muted mt-5">No tickets available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Tickets</h6>
          </div>

          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Ticket ID</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Status</th>
                  {/* <th scope="col">Priority</th> */}
                  <th scope="col">Department</th>
                  <th scope="col">Contact Name</th>
                  <th scope="col">Agent</th>
                  <th scope="col">Created Time</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border">
                {tickets.map((t, i) => (
                  <tr key={t.id || i} style={{ fontSize: "0.75rem" }}>
                    <td className="fw-semibold text-dark text-truncate" style={{ maxWidth: "10rem" }}>
                      {t.ticketNumber || "N/A"}
                    </td>

                    <td className="text-muted">{t.subject || "N/A"}</td>
                    <td className="text-muted">{t.status || "N/A"}</td>
                    {/* <td className="text-muted">{t.priority || "N/A"}</td> */}
                    <td className="text-muted">{t.department?.name || "N/A"}</td>
                    <td className="text-muted">{t.contact.lastName || "N/A"}</td>
                    <td className="text-muted">{t.assignee?.lastName || "N/A"}</td>
                    <td className="text-muted">
                      {t.createdTime
                        ? new Date(t.createdTime).toLocaleDateString()
                        : "N/A"}
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

export default Tickets;
