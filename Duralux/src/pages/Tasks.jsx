import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTasks } from "../services/zohoCrmService";
import { GoTrash } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await getTasks();
        setTasks(res.data || []);
      } catch (error) {
        console.error("Error fetching tasks", error);
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const statusTabs = [
    "All",
    "In Progress",
    "Completed",
    "Deferred",
    "Not Started",
    "Waiting for input",
  ];

  const filteredTasks =
    activeTab === "All"
      ? tasks
      : tasks.filter(
          (task) =>
            task.Status?.toLowerCase() === activeTab.toLowerCase() ||
            task.Status?.replace(/\s/g, "").toLowerCase() ===
              activeTab.replace(/\s/g, "").toLowerCase()
        );

  // Group by Created Date
 const groupedTasks = filteredTasks.reduce((acc, task) => {
  const rawDate = task.Due_Date || task.Created_Time;
  const dateObj = rawDate ? new Date(rawDate) : null;

  // Fallback if invalid
  const dateKey = dateObj && !isNaN(dateObj)
    ? dateObj.toDateString()
    : "No Date";

  if (!acc[dateKey]) acc[dateKey] = [];
  acc[dateKey].push(task);
  return acc;
}, {});

// Sort groups by date (latest first)
const sortedGroupedTasks = Object.entries(groupedTasks).sort(
  ([dateA], [dateB]) => {
    if (dateA === "No Date") return 1;
    if (dateB === "No Date") return -1;
    return new Date(dateB) - new Date(dateA);
  }
);

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Highest":
        return { backgroundColor: "#FCEAEA", color: "#C82333" };
      case "High":
        return { backgroundColor: "#FDF1E5", color: "#D2691E" };
      case "Normal":
        return { backgroundColor: "#EAF5EA", color: "#4B735F" };
      case "Low":
        return { backgroundColor: "#E9F0FC", color: "#204090" };
      default:
        return { backgroundColor: "#EEE", color: "#333" };
    }
  };

  return (
    <div className="container-fluid py-3 px-4" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Tasks</h5>
        <button
          className="btn text-white fw-medium"
          style={{ backgroundColor: "#0A2342" }}
        >
          + Add Tasks
        </button>
      </div>

      {/* Loading */}
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
      ) : Object.keys(groupedTasks).length === 0 ? (
        <p className="text-center text-muted mt-5">No tasks available</p>
      ) : (
        <>
          {/* Tabs */}
          <ul className="nav nav-tabs border-0 mb-4">
            {statusTabs.map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link fw-semibold ${
                    activeTab === tab
                      ? "text-black border-bottom border-primary"
                      : "text-muted"
                  }`}
                  style={{
                    background: "none",
                    border: "none",
                    marginRight: "10px",
                    fontSize: "12px",
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          {/* Grouped Task Sections */}
          {sortedGroupedTasks.map(([date, group]) => (
            <div key={date} className="mb-5">
              <h6 className="fw-semibold mb-3">{date}</h6>
              <div
                className="px-4 rounded-3 shadow-sm"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #E9ECEF",
                }}
              >
                {group.map((task, i) => (
                  <div
                    key={task.id || i}
                    className="d-flex align-items-center justify-content-between border-bottom py-3"
                    style={{ fontSize: "13px" }}
                  >
                    {/* Left side */}
                    <div className="d-flex align-items-center gap-3">
                      {/* <input
                        type="checkbox"
                        className="form-check-input"
                        style={{ cursor: "pointer" }}
                      /> */}
                      <div>
                        <div className="fw-semibold text-dark">
                          {task.Subject || "Untitled Task"}
                        </div>
                        <small className="text-muted">
                          {task.Description||'No description'}
                        </small>
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="d-flex align-items-center gap-4">
                      <span
                        className="badge rounded-pill px-2 py-1"
                        style={{
                          ...getPriorityStyle(task.Priority),
                          fontSize: "0.6rem",
                          fontWeight: "500",
                        }}
                      >
                        {task.Priority || "N/A"}
                      </span>

                      <small className="text-muted">
                        {new Date(task.Due_Date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </small>

                      <div className="d-flex gap-3">
                        <GoTrash size={18} />
                        <FiEdit2 size={18} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Tasks;
