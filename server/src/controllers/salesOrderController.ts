import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllSalesOrders = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields =
      "Subject,Account_Name,Contact_Name,Deal_Name,Status,Grand_Total,Owner";

    const response = await axios.get(
      `${CRM_BASE}/Sales_Orders?fields=${fields}`,
      {
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
      }
    );

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM SalesOrder Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch sales orders" });
  }
};

export const getSalesOrderById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Sales_Orders/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM SalesOrder Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch sales order" });
  }
};

export const createSalesOrder = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Sales_Orders`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM SalesOrder Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create sales order",
      details: err.response?.data || err.message,
    });
  }
};

export const editSalesOrder = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Sales_Orders/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM SalesOrder Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update sales order",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteSalesOrder = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Sales_Orders/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM SalesOrder Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete sales order",
      details: err.response?.data || err.message,
    });
  }
};
