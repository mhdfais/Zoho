import toast from "react-hot-toast";
import { api } from "./api";

export const getDashboardData = async () => {
  try {
    const res = await api.get("/crm/statistics");
    return res.data;
  } catch (error) {
    console.error(error.message);
    toast.error("failed to get statistics", error.message);
  }
};
