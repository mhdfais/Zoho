import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllPriceBooks } from "../services/zohoCrmService";

const PriceBooks = () => {
  const [priceBooks, setPriceBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPriceBooks = async () => {
      try {
        setLoading(true);
        const res = await getAllPriceBooks();
        setPriceBooks(res.data || []);
      } catch (error) {
        console.error("Error fetching price books", error);
        toast.error("Failed to load price books");
      } finally {
        setLoading(false);
      }
    };
    fetchPriceBooks();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Price Books</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Price Book
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
      ) : priceBooks.length === 0 ? (
        <p className="text-center text-muted mt-5">No price books available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Price Books</h6>
          </div>

          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Price Book Name</th>
                  {/* <th scope="col">Pricing Model</th> */}
                  {/* <th scope="col">Description</th> */}
                  <th scope="col">Active</th>
                  <th scope="col">Owner</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border">
                {priceBooks.map((pb, i) => (
                  <tr key={pb.id || i} style={{ fontSize: "0.75rem" }}>
                    <td
                      className="fw-semibold text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {pb.Price_Book_Name || "N/A"}
                    </td>

                    {/* <td className="text-muted">{pb.Pricing_Model || "N/A"}</td> */}

                    {/* <td
                      className="text-muted text-truncate"
                      style={{ maxWidth: "15rem" }}
                    >
                      {pb.Description || "No description"}
                    </td> */}

                    <td className="text-muted">
                      {pb.Active === true ? "Yes" : "No"||"N/A"}
                    </td>

                    <td className="text-muted">{pb.Owner?.name || "N/A"}</td>

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

export default PriceBooks;
