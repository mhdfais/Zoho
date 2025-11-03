import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllQuotes = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields =
      "Subject,Account_Name,Contact_Name,Deal_Name,Quote_Stage,Grand_Total,Owner";

    const response = await axios.get(`${CRM_BASE}/Quotes?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Quote Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
};

export const getQuoteById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Quotes/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM Quote Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
};

export const createQuote = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Quotes`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Quote Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create quote",
      details: err.response?.data || err.message,
    });
  }
};

export const editQuote = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Quotes/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Quote Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update quote",
      details: err.response?.data || err.message,
    });
  }
};


export const deleteQuote = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Quotes/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Quote Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete quote",
      details: err.response?.data || err.message,
    });
  }
};