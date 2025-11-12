import React, { useEffect, useState } from "react";

const UpcomingTaskTable = ({ upcomingTask }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(upcomingTask);
  }, []);

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Highest":
        return {
          backgroundColor: "#FDECEC",
          color: "#D32F2F",
        };
      case "High":
        return {
          backgroundColor: "#FFECEC",
          color: "#E65100",
        };
      case "Normal":
        return {
          backgroundColor: "#FFF9E6",
          color: "#C49A00",
        };
      case "Low":
        return {
          backgroundColor: "#EAF5EA",
          color: "#4B735F",
        };
      case "Lowest":
        return {
          backgroundColor: "#E8F4FD",
          color: "#0275D8",
        };
      default:
        return { backgroundColor: "#EEE", color: "#333" };
    }
  };
  return (
    <div
      className=" mt-4 p-4 bg-white rounded shadow-sm"
      style={{
        borderRadius: "12px",
        border: "1px solid #f0f0f0",
        fontFamily: "Inter, sans-serif",
        maxWidth: "600px",
        minHeight: "22.7rem",
      }}
    >
      <h5 className="fw-bold mb-2">Upcoming Tasks</h5>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="d-flex align-items-center justify-content-between py-2 border-bottom"
        >
          <div className="d-flex align-items-center">
            {/* <input
              type="checkbox"
              style={{ marginRight: "12px", width: "18px", height: "18px" }}
            /> */}
            <div>
              <div style={{ fontWeight: 500 }}>{task.subject}</div>
              <small style={{ color: "#6c757d" }}>{task.owner}</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span
              className="badge px-3 py-2"
              style={{
                borderRadius: "20px",
                fontSize: "0.6rem",
                fontWeight: 500,
                ...getPriorityStyle(task.priority),
              }}
            >
              {task.priority}
            </span>
            <span style={{ fontSize: "0.9rem", color: "#555" }}>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })
                : "--"}
            </span>
          </div>
        </div>
      ))}

      <div className="text-center mt-3">
        <button
          className="btn mx-auto"
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "5px 18px",
            fontSize: "0.8rem",
            color: "black",
          }}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default UpcomingTaskTable;
