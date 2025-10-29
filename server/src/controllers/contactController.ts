import axios from "axios";
import { Request, Response } from "express";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const fields = "First_Name,Last_Name,Account_Name,Email,Phone,Owner";
    const response = await axios.get(`${CRM_BASE}/Contacts?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response.data);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

export const createContact = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    // const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Contacts`, req.body, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data || err.message;

    if (status === 429)
      return res.status(429).json({ error: "Too many requests." });

    if (status === 401)
      return res.status(401).json({ error: "Token expired or invalid." });

    res
      .status(500)
      .json({ error: "Failed to create contact", details: message });
  }
};

export const getContactById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${CRM_BASE}/Contacts/${req.params.id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    res.json(response.data.data[0]);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch contact" });
  }
};

export const editContact = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.put(
      `${CRM_BASE}/Contacts/${req.params.id}`,
      payload,
      {
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
      }
    );

    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update contact" });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const response = await axios.delete(
      `${CRM_BASE}/Contacts/${req.params.id}`,
      {
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
      }
    );
    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
};
