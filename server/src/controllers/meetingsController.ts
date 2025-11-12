import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllMeetings = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields =
      "Event_Title,Start_DateTime,End_DateTime,What_Id,Who_Id";

    const response = await axios.get(`${CRM_BASE}/Events?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Meetings Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch meetings" });
  }
};

export const getMeetingById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Events/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM Meetings Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch meeting" });
  }
};

export const createMeeting = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Events`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Meetings Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create meeting",
      details: err.response?.data || err.message,
    });
  }
};

export const editMeeting = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Events/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Meetings Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update meeting",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteMeeting = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Events/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Meetings Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete meeting",
      details: err.response?.data || err.message,
    });
  }
};
