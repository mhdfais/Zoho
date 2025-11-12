import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMeetings } from "../services/zohoCrmService";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        const res = await getMeetings();
        setMeetings(res.data || []);
      } catch (error) {
        console.error("Error fetching meetings", error);
        toast.error("Failed to load meetings");
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div className="container-fluid py-3 px-3" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Meetings</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Create Meeting
        </button>
      </div>
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
      ) : meetings.length === 0 ? (
        <p className="text-center text-muted mt-5">No meetings available</p>
      ) : (
        <>
         <div className="mt-4 mb-3">
          <h6>All Meetings</h6>
        </div>
        <div className="table-responsive shadow-sm rounded-3 bg-white p-3">
          <table className="table align-middle">
            <thead>
              <tr style={{ fontSize: "0.85rem" }}>
                <th scope="col">Title</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Related To</th>
                <th scope="col">Contact Name</th>
                <th scope="col">Host</th>
                {/* <th scope="col" className="text-center">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="border  ">
              {meetings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No meetings available
                  </td>
                </tr>
              ) : (
                meetings.map((meeting, i) => (
                  <tr key={meeting.id || i} style={{ fontSize: "0.7rem" }}>
                    <td
                      className="fw-semibold text-dark"
                      style={{ width: "6rem" }}
                    >
                      <div
                        className="text-truncate"
                        style={{
                          maxWidth: "6.5rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "block",
                        }}
                      >
                        {meeting.Event_Title}
                      </div>
                    </td>
                    <td className="text-muted">
                      {meeting.Start_DateTime
                        ? new Date(meeting.Start_DateTime).toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="text-muted">
                      {meeting.End_DateTime
                        ? new Date(meeting.End_DateTime).toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="text-muted">
                      {meeting.What_Id?.name || "N/A"}
                    </td>
                    <td className="text-muted">
                      {meeting.Who_Id?.name || "N/A"}
                    </td>
                    <td className="text-muted">
                      {meeting.Owner?.name || "N/A"}
                    </td>
                    <td className="text-center text-muted">
                      <div className="d-flex justify-content-center gap-4">
                        <GoTrash size={18} className="" />
                        <FiEdit2 size={18} className="" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  );
};

export default Meetings;
