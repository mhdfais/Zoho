import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllCalls = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields =
      "Subject,Call_Type,Call_Start_Time,Call_Duration,Owner,What_Id,Who_Id";

    const response = await axios.get(`${CRM_BASE}/Calls?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Call Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch calls" });
  }
};

export const getCallById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Calls/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM Call Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch call" });
  }
};

export const createCall = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Calls`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Call Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create call",
      details: err.response?.data || err.message,
    });
  }
};

export const editCall = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Calls/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Call Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update call",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteCall = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Calls/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Call Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete call",
      details: err.response?.data || err.message,
    });
  }
};
