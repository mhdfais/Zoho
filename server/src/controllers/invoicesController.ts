import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields =
      "Subject,Account_Name,Contact_Name,Status,Invoice_Date,Grand_Total,Owner";

    const response = await axios.get(`${CRM_BASE}/Invoices?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Invoice Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};

export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Invoices/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM Invoice Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch invoice" });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Invoices`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Invoice Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create invoice",
      details: err.response?.data || err.message,
    });
  }
};

export const editInvoice = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Invoices/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Invoice Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update invoice",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Invoices/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Invoice Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete invoice",
      details: err.response?.data || err.message,
    });
  }
};
