import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllVendors = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields = "Vendor_Name,Email,Phone,Website,Owner";

    const response = await axios.get(`${CRM_BASE}/Vendors?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Vendor Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
};

export const getVendorById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Vendors/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error("Zoho CRM Vendor Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch vendor" });
  }
};

export const createVendor = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Vendors`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Vendor Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create vendor",
      details: err.response?.data || err.message,
    });
  }
};

export const editVendor = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Vendors/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Vendor Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update vendor",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteVendor = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Vendors/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho CRM Vendor Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete vendor",
      details: err.response?.data || err.message,
    });
  }
};
