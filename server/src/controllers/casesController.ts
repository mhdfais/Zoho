import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllCases = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields =
      "Case_Number,Subject,Status,Priority,Account_Name,Related_To,Case_Origin,Owner";

    const response = await axios.get(`${CRM_BASE}/Cases?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Cases Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch cases" });
  }
};

export const getCaseById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Cases/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM Cases Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch case" });
  }
};

export const createCase = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Cases`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Cases Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create case",
      details: err.response?.data || err.message,
    });
  }
};

export const editCase = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Cases/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Cases Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update case",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteCase = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Cases/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Cases Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete case",
      details: err.response?.data || err.message,
    });
  }
};
