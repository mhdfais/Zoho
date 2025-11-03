import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllCampaigns = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields = "Campaign_Name,Type,Status,Start_Date,End_Date,Owner";
    const response = await axios.get(`${CRM_BASE}/Campaigns?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};

export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Campaigns/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch campaign" });
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Campaigns`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create campaign",
      details: err.response?.data || err.message,
    });
  }
};

export const editCampaign = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Campaigns/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update campaign",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Campaigns/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete campaign",
      details: err.response?.data || err.message,
    });
  }
};
