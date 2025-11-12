import React, { Fragment, useEffect, useState } from "react";
import {
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getCurrentuser, logout } from "../../../services/authService";
import { useDispatch } from "react-redux";
import { logout as logoutRedux } from "../../../redux/zohoSlice";
import { RiAccountCircleFill } from "react-icons/ri";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";

// const activePosition = [
//   "Active",
//   "Always",
//   "Bussy",
//   "Inactive",
//   "Disabled",
//   "Cutomization",
// ];
// const subscriptionsList = [
//   "Plan",
//   "Billings",
//   "Referrals",
//   "Payments",
//   "Statements",
//   "Subscriptions",
// ];
const ProfileModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState([]);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutRedux());
      navigate("/login");
    } catch (error) {
      console.error("error logging out");
    }
  };
  useEffect(() => {
    const getUserdetail = async () => {
      try {
        const res = await getCurrentuser();
        setCurrentUser(res.users[0]);
        // console.log(res.users[0]);
      } catch (error) {
        toast.error("error get user detail");
      }
    };
    getUserdetail();
  }, []);

  return (
    <div className="dropdown nxl-h-item">
      <a
        href="#"
        data-bs-toggle="dropdown"
        role="button"
        data-bs-auto-close="outside"
        className="d-flex gap-2 align-items-center"
      >
        <RiAccountCircleFill size={25} className="text-secondary" />
        <div>
          <p className="pt-3">
            {currentUser?.first_name != null
              ? `${currentUser.first_name}${
                  currentUser?.last_name != null
                    ? " " + currentUser.last_name
                    : ""
                }`
              : currentUser?.last_name != null
              ? currentUser.last_name
              : null}
          </p>
        </div>
        <IoIosArrowDown className="" />
      </a>
      <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
        <div className="dropdown-header">
          <div className="d-flex align-items-center gap-3">
            <RiAccountCircleFill size={35} className="text-secondary" />
            <div>
              <h6 className="text-dark mb-0 pl-2">
                {currentUser?.first_name != null
                  ? `${currentUser.first_name}${
                      currentUser?.last_name != null
                        ? " " + currentUser.last_name
                        : ""
                    }`
                  : currentUser?.last_name != null
                  ? currentUser.last_name
                  : null}{" "}
                {/* <span className="badge bg-soft-success text-success ms-1">
                  PRO
                </span> */}
              </h6>
              <span className="fs-12 fw-medium text-muted">
                {currentUser.email || "N/A"}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="dropdown">
          <a href="#" className="dropdown-item" data-bs-toggle="dropdown">
            <span className="hstack">
              <i className="wd-10 ht-10 border border-2 border-gray-1 bg-success rounded-circle me-2"></i>
              <span>Active</span>
            </span>
            <i className="ms-auto me-0">
              <FiChevronRight />
            </i>
          </a>
          <div className="dropdown-menu user-active">
            {activePosition.map((item, index) => {
              return (
                <Fragment key={index}>
                  {index === activePosition.length - 1 && (
                    <div className="dropdown-divider"></div>
                  )}
                  <a href="#" className="dropdown-item">
                    <span className="hstack">
                      <i
                        className={`wd-10 ht-10 border border-2 border-gray-1 rounded-circle me-2 ${getColor(
                          item
                        )}`}
                      ></i>
                      <span>{item}</span>
                    </span>
                  </a>
                </Fragment>
              );
            })}
          </div>
        </div> */}
        {/* <div className="dropdown-divider"></div>
        <div className="dropdown">
          <a href="#" className="dropdown-item" data-bs-toggle="dropdown">
            <span className="hstack">
              <i className=" me-2">
                <FiDollarSign />
              </i>
              <span>Subscriptions</span>
            </span>
            <i className="ms-auto me-0">
              <FiChevronRight />
            </i>
          </a>
          <div className="dropdown-menu">
            {subscriptionsList.map((item, index) => {
              return (
                <Fragment key={index}>
                  {index === activePosition.length - 1 && (
                    <div className="dropdown-divider"></div>
                  )}
                  <a href="#" className="dropdown-item">
                    <span className="hstack">
                      <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                      <span>{item}</span>
                    </span>
                  </a>
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="dropdown-divider"></div>
        <a href="#" className="dropdown-item">
          <i>
            <FiUser />
          </i>
          <span>Profile Details</span>
        </a>
        <a href="#" className="dropdown-item">
          <i>
            <FiActivity />
          </i>
          <span>Activity Feed</span>
        </a>
        <a href="#" className="dropdown-item">
          <i>
            <FiDollarSign />
          </i>
          <span>Billing Details</span>
        </a>
        <a href="#" className="dropdown-item">
          <i>
            <FiBell />
          </i>
          <span>Notifications</span>
        </a>
        <a href="#" className="dropdown-item">
          <i>
            <FiSettings />
          </i>
          <span>Account Settings</span>
        </a> */}
        {/* <div className="dropdown-divider"></div> */}
        <a onClick={handleLogout} className="dropdown-item">
          <i>
            {" "}
            <FiLogOut />
          </i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default ProfileModal;

const getColor = (item) => {
  switch (item) {
    case "Always":
      return "always_clr";
    case "Bussy":
      return "bussy_clr";
    case "Inactive":
      return "inactive_clr";
    case "Disabled":
      return "disabled_clr";
    case "Cutomization":
      return "cutomization_clr";
    default:
      return "active-clr";
  }
};
