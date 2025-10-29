import axios from "axios";
import { Request, Response } from "express";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllDeals = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const fields = "Deal_Name,Amount,Stage,Closing_Date,Account_Name,Contact_Name,Owner";
    const response = await axios.get(`${CRM_BASE}/Deals?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
};

export const getDealById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const response = await axios.get(`${CRM_BASE}/Deals/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch deal" });
  }
};

export const createDeal = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Deals`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create deal",
      details: err.response?.data || err.message,
    });
  }
};

export const editDeal = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Deals/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update deal",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteDeal = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Deals/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete deal",
      details: err.response?.data || err.message,
    });
  }
};
