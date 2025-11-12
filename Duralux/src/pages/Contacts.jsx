import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllContacts } from "../services/zohoCrmService";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const res = await getAllContacts();
        setContacts(res.data || []);
      } catch (error) {
        console.error("Error fetching contacts", error);
        toast.error("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Contacts</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Contact
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
      ) : contacts.length === 0 ? (
        <p className="text-center text-muted mt-5">No contacts available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Contacts</h6>
          </div>
          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Contact Name</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  {/* <th scope="col">Department</th> */}
                  <th scope="col">Contact Owner</th>
                </tr>
              </thead>
              <tbody className="border">
                {contacts.map((contact, i) => (
                  <tr key={contact.id || i} style={{ fontSize: "0.75rem" }}>
                    <td
                      className="fw-semibold text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {contact.Full_Name ||
                        `${contact.First_Name || ""} ${contact.Last_Name || ""}`.trim() ||
                        "N/A"}
                    </td>

                    <td className="text-muted">
                      {contact.Account_Name?.name || "N/A"}
                    </td>

                    <td
                      className="text-muted text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {contact.Email || "N/A"}
                    </td>

                    <td className="text-muted">{contact.Phone || "N/A"}</td>

                    {/* <td className="text-muted">{contact.Department || "N/A"}</td> */}

                    <td className="text-muted">
                      {contact.Owner?.name || "N/A"}
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

export default Contacts;
