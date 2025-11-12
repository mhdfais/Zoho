import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";
import { getAllProducts } from "../services/zohoCrmService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getAllProducts();
        setProducts(res.data || []);
      } catch (error) {
        console.error("Error fetching products", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Products</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Product
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
      ) : products.length === 0 ? (
        <p className="text-center text-muted mt-5">No products available</p>
      ) : (
        <>
          <div className="mt-4 mb-3">
            <h6>All Products</h6>
          </div>

          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  <th scope="col">Product Name</th>
                  <th scope="col">Product Code</th>
                  <th scope="col">Product Active</th>
                  {/* <th scope="col">Manufacturer</th> */}
                  {/* <th scope="col">Category</th> */}
                  <th scope="col">Owner</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="border">
                {products.map((product, i) => (
                  <tr key={product.id || i} style={{ fontSize: "0.75rem" }}>
                    <td
                      className="fw-semibold text-dark text-truncate"
                      style={{ maxWidth: "10rem" }}
                    >
                      {product.Product_Name || "N/A"}
                    </td>

                    <td className="text-muted">
                      {product.Product_Code || "N/A"}
                    </td>

                    <td className="text-muted">
                      {product.Product_Active === true ? "Yes" : "No"||"N/A"}
                    </td>

                    {/* <td className="text-muted">
                      {product.Manufacturer || "N/A"}
                    </td> */}

                    {/* <td className="text-muted">{product.Category || "N/A"}</td> */}

                    <td className="text-muted">{product.Owner?.name || "N/A"}</td>

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

export default Products;
