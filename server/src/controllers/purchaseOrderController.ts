import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllPurchaseOrders = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields =
      "Subject,Purchase_Order_Number,Vendor_Name,Status,Due_Date,Grand_Total,Owner";

    const response = await axios.get(
      `${CRM_BASE}/Purchase_Orders?fields=${fields}`,
      {
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
      }
    );

    res.json(response.data);
  } catch (err: any) {
    console.error(
      "Zoho CRM Purchase Orders Error:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "Failed to fetch purchase orders" });
  }
};

export const getPurchaseOrderById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Purchase_Orders/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error(
      "Zoho CRM Purchase Orders Error:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "Failed to fetch purchase order" });
  }
};

export const createPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Purchase_Orders`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error(
      "Zoho CRM Purchase Orders Error:",
      err.response?.data || err.message
    );
    res.status(500).json({
      error: "Failed to create purchase order",
      details: err.response?.data || err.message,
    });
  }
};

export const editPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(
      `${CRM_BASE}/Purchase_Orders/${id}`,
      payload,
      {
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
      }
    );

    res.json(response.data);
  } catch (err: any) {
    console.error(
      "Zoho CRM Purchase Orders Error:",
      err.response?.data || err.message
    );
    res.status(500).json({
      error: "Failed to update purchase order",
      details: err.response?.data || err.message,
    });
  }
};

export const deletePurchaseOrder = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Purchase_Orders/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error(
      "Zoho CRM Purchase Orders Error:",
      err.response?.data || err.message
    );
    res.status(500).json({
      error: "Failed to delete purchase order",
      details: err.response?.data || err.message,
    });
  }
};
