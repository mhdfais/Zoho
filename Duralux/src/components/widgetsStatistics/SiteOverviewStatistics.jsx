import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
// import { crmStatisticsData } from '@/utils/fackData/crmStatisticsData'
import getIcon from "@/utils/getIcon";
// import { getStatistics } from "../../services/dashboardCrmService";
// import { statistics } from "../../services/zohoCrmService";

// export const crmStatisticsData = [
//     {
//         id: 1,
//         title: "Invoices Awaiting Payment",
//         total_number: "76",
//         completed_number: "45",
//         progress: "56%",
//         progress_info: "$5,569",
//         icon:"feather-dollar-sign"
//     },

//     {
//         id: 2,
//         title: "Converted Leads",
//         total_number: "86",
//         completed_number: "48",
//         progress: "63%",
//         progress_info: "52 Completed",
//         icon:"feather-cast"
//     },
//     {
//         id: 3,
//         title: "Projects In Progress",
//         total_number: "20",
//         completed_number: "16",
//         progress: "78%",
//         progress_info: "16 Completed",
//         icon:"feather-briefcase"
//     },
//     {
//         id: 4,
//         title: "Conversion Rate",
//         total_number: "46.59%",
//         completed_number: "",
//         progress: "46%",
//         progress_info: "$2,254",
//         icon:"feather-activity"
//     },

// ]

const SiteOverviewStatistics = ({ stats }) => {
  const [statisticsData, setStatisticsData] = useState([]);

  useEffect(() => {
    const formatted = [
      {
        id: 2,
        title: "Total Revenue",
        total_number: `AED ${stats?.totalRevenue.total.toLocaleString()}`,
        completed_number: "",
        progress: stats?.totalRevenue.progress,
        progress_info: stats?.totalRevenue.info,
        icon: "feather-dollar-sign",
      },
      {
        id: 1,
        title: "Overdue Tasks",
        total_number: stats?.overdueTasks.total,
        completed_number: stats?.overdueTasks.overdue,
        progress: stats?.overdueTasks.progress,
        progress_info: stats?.overdueTasks.info,
        icon: "feather-clock",
      },

      {
        id: 3,
        title: "Deals Closed",
        total_number: stats?.dealsClosed.total,
        completed_number: stats?.dealsClosed.closed,
        progress: stats?.dealsClosed.progress,
        progress_info: stats?.dealsClosed.info,
        icon: "feather-briefcase",
      },
      {
        id: 4,
        title: "Active Pipeline",
        total_number: `AED ${stats?.activePipeline.total.toLocaleString()}`,
        completed_number: "",
        progress: stats?.activePipeline.progress,
        progress_info: stats?.activePipeline.info,
        icon: "feather-activity",
      },
    ];

    setStatisticsData(formatted);
    //   } catch (error) {
    //     console.error("Error fetching statistics:", error);
    //   }
    // };

    // fetchStatisti  cs();
  }, []);

  return (
    <>
      {statisticsData.map(
        ({
          id,
          completed_number,
          progress,
          progress_info,
          title,
          total_number,
          icon,
        }) => (
          <div key={id} className="col-xxl-3 col-md-3">
            <div className="card stretch stretch-full short-info-card">
              <div className="card-body">
                <div>
                  <p className="fs-11 fw-bold text-muted text-truncate-1-line mb-2">
                    {title}
                  </p>
                </div>
                <div className="d-flex align-items-start justify-content-between">
                  <div className="d-flex   align-items-center">
                    <div>
                      <div className=" text-muted" style={{fontWeight:700, fontSize:'1.1rem'}}>
                        <span className="counter">
                          {completed_number ? completed_number + "/" : ""}
                        </span>
                        <span className="counter">{total_number}</span>
                      </div>
                      {/* <h3 className="fs-5 fw-semibold text-truncate-1-line">
                        {title}
                      </h3> */}
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="w-100">
                      <div className="text-end mt-1">
                        {/* <span className="fs-12 text-dark">{progress_info}</span>{" "} */}
                        <span className="fs-11 text-muted">{progress}</span>
                      </div>
                      <div
                        className="progress ht-3"
                        style={{ height: "5px" }}
                      >
                        <div
                          className={`progress-bar progress-${id}`}
                          role="progressbar"
                          style={{ width: progress }}
                        ></div>
                      </div>
                      
                    </div>

                    {/* ICON placed beside progress bar */}
                    <div className="ms-3 d-flex align-items-center justify-content-center rounded-3 bg-light p-2">
                      {React.cloneElement(getIcon(icon), {
                        size: 18,
                        className: "text-dark",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default SiteOverviewStatistics;
