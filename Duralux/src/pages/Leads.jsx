  import React, { useEffect, useState } from "react";
  import toast from "react-hot-toast";
  import { getLeads } from "../services/zohoCrmService";
  import { GoTrash } from "react-icons/go";
  import { FiEdit2 } from "react-icons/fi";

  const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchLeads = async () => {
        try {
          setLoading(true);
          const res = await getLeads();
          setLeads(res.data || []);
        } catch (error) {
          console.error("Error fetching leads", error);
          toast.error("Failed to load leads");
        } finally {
          setLoading(false);
        }
      };
      fetchLeads();
    }, []);
    

    return (
      
      <div className="container-fluid py-3" style={{ minHeight: "100vh" }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold">Leads</h5>
          <button
            className="btn text-white fw-medium"
            style={{ backgroundColor: "#0A2342" }}
          >
            + Create Lead
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
        ) : leads.length === 0 ? (
          <p className="text-center text-muted mt-5">No leads available</p>
        ) : (

          <>
          <div className="mt-4 mb-3">
            <h6>All Leads</h6>
          </div>
          <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: "0.85rem" }}>
                  {/* <th scope="col">Date</th> */}
                  <th scope="col">Lead Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Lead Source</th>
                  <th scope="col">Lead Owner</th>
                  {/* <th scope="col" className="text-center">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="border" >
                {leads.map((lead, i) => (
                  <tr key={lead.id || i} style={{ fontSize: "0.75rem" }}>
                    {/* <td className="text-muted">
                      {lead.Created_Time
                        ? new Date(lead.Created_Time).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td> */}

                    <td className="fw-semibold text-dark text-truncate"  style={{ maxWidth: "10rem" }}>
                      {lead.Full_Name || `${lead.First_Name || ""} ${lead.Last_Name || ""}`.trim() || "N/A"}
                    </td>

                    <td className="text-muted">{lead.Company || "N/A"}</td>

                    <td className="text-muted text-truncate" style={{ maxWidth: "10rem" }}>
                      {lead.Email || "N/A"}
                    </td>

                    <td className="text-muted">{lead.Phone || "N/A"}</td>

                    <td className="text-muted">{lead.Lead_Source || "N/A"}</td>

                    <td className="text-muted">{lead.Owner?.name || "N/A"}</td>

                    <td className="text-center text-muted">
                      <div className="d-flex justify-content-center gap-4">
                        <GoTrash size={18} className="" />
                        <FiEdit2 size={18} className="" />
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

  export default Leads;
