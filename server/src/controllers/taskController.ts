import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields =
      "Subject,Due_Date,Status,Priority,Owner,What_Id,Who_Id,Created_Time";

    const response = await axios.get(`${CRM_BASE}/Tasks?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Task Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Tasks/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM Task Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch task" });
  }
};


export const createTask = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Tasks`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Task Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create task",
      details: err.response?.data || err.message,
    });
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Tasks/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Task Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update task",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Tasks/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Task Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete task",
      details: err.response?.data || err.message,
    });
  }
};