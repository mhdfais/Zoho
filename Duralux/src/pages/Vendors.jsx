import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllVendors } from "../services/zohoCrmService";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const res = await getAllVendors();
        setVendors(res.data || []);
      } catch (error) {
        console.error("Error fetching vendors", error);
        toast.error("Failed to load vendors");
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Vendors</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Vendor
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
      ) : vendors.length === 0 ? (
        <p className="text-center text-muted mt-5">No vendors available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Vendors</h6>
          </div>

          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Vendor Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Website</th>
                  {/* <th scope="col">City</th> */}
                  <th scope="col">Owner</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border">
                {vendors.map((vendor, i) => (
                  <tr key={vendor.id || i} style={{ fontSize: "0.75rem" }}>
                    <td className="fw-semibold text-dark">
                      {vendor.Vendor_Name || "N/A"}
                    </td>
                    <td className="text-muted">{vendor.Email || "N/A"}</td>
                    <td className="text-muted">{vendor.Phone || "N/A"}</td>
                    <td className="text-muted text-truncate" style={{ maxWidth: "10rem" }}>
                      {vendor.Website || "N/A"}
                    </td>
                    {/* <td className="text-muted">{vendor.City || "N/A"}</td> */}
                    <td className="text-muted">{vendor.Owner?.name || "N/A"}</td>

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

export default Vendors;
