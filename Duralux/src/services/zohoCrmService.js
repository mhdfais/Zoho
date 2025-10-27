import toast from "react-hot-toast";
import { api } from "./api";

export const fetchAccounts = async () => {
  try {
    const response = await api.get("/crm/accounts");
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to load accounts. Try again later.");
    }
    throw error;
  }
};

export const createAccount = async (formdata) => {
  try {
    const response = await api.post("/crm/accounts", formdata);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to create accounts. Try again later.");
    }
    throw error;
  }
};

export const deleteAccount = async (id) => {
  try {
    const response = await api.delete(`/crm/accounts/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to delete accounts. Try again later.");
    }
    throw error;
  }
};

export const editAccount = async (id, formdata) => {
  try {
    const response = await api.put(`/crm/accounts/${id}`, formdata);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to edit accounts. Try again later.");
    }
    throw error;
  }
};

export const getAccountById = async (id) => {
  try {
    const response = await api.get(`/crm/accounts/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to get account. Try again later.");
    }
    throw error;
  }
};
