import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllPriceBooks = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields =
      "Price_Book_Name,Active,Owner";

    const response = await axios.get(`${CRM_BASE}/Price_Books?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Price Book Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch price books" });
  }
};


export const getPriceBookById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Price_Books/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM Price Book Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch price book" });
  }
};

export const createPriceBook = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Price_Books`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Price Book Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create price book",
      details: err.response?.data || err.message,
    });
  }
};

export const editPriceBook = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Price_Books/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Price Book Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update price book",
      details: err.response?.data || err.message,
    });
  }
};

export const deletePriceBook = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Price_Books/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Price Book Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete price book",
      details: err.response?.data || err.message,
    });
  }
};