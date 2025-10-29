import React, { useEffect, useState } from "react";
import { FiEdit3, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteContact, getAllContacts } from "../../services/zohoCrmService";


const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getContacts = async () => {
      try {
        setError(null);
        const res = await getAllContacts();
        setContacts(res.data || []);
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to load contacts.");
          console.error("Error fetching contacts:", error);
        }
        setError(error.message || "Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };

    getContacts();
  }, []);

  const handleAction = async (action, contact, id) => {
    if (action === "Edit") {
      navigate(`/sales/edit-contact/${id}`);
    } else if (action === "Delete") {
      try {
        const confirmDelete = window.confirm(
          `Are you sure you want to delete contact "${contact.Full_Name || contact.Last_Name}"?`
        );
        if (!confirmDelete) return;

        await deleteContact(id);
        setContacts((prev) => prev.filter((c) => c.id !== id));
        toast.success("Contact deleted successfully!");
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please wait a few seconds.");
        } else {
          toast.error("Failed to delete contact.");
          console.error("Error deleting contact:", error);
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
        <p className="mt-2">Loading contacts...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  if (contacts.length === 0)
    return (
      <div className="alert alert-secondary" role="alert">
        No contacts found.
      </div>
    );

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Contacts</h4>
        <button
          onClick={() => navigate("/sales/create-contact")}
          className="btn btn-primary"
        >
          + Create Contact
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Account Name</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr
                key={index}
                className="cursor-pointer"
                onClick={() => navigate(`/sales/contact/${contact.id}`)}
              >
                <td>{ `${contact.First_Name || ""} ${contact.Last_Name || ""}`}</td>
                <td>{contact.Email || "—"}</td>
                <td>{contact.Phone || "—"}</td>
                <td>{contact.Account_Name?.name || "—"}</td>
                <td>{contact.Owner?.name || "—"}</td>
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
                            handleAction("Edit", contact, contact.id);
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
                            handleAction("Delete", contact, contact.id);
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

export default ContactTable;
