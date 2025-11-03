import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAllSolutions = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields = "Solution_Title,Status,Solution_Number,Owner";

    const response = await axios.get(`${CRM_BASE}/Solutions?fields=${fields}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error(
      "Zoho CRM Solutions Error:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "Failed to fetch solutions" });
  }
};

export const getSolutionById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Solutions/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data?.[0]);
  } catch (err: any) {
    console.error(
      "Zoho CRM Solutions Error:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "Failed to fetch solution" });
  }
};

export const createSolution = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = { data: [req.body] };

    const response = await axios.post(`${CRM_BASE}/Solutions`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error(
      "Zoho CRM Solutions Error:",
      err.response?.data || err.message
    );
    res.status(500).json({
      error: "Failed to create solution",
      details: err.response?.data || err.message,
    });
  }
};

export const editSolution = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Solutions/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error(
      "Zoho CRM Solutions Error:",
      err.response?.data || err.message
    );
    res.status(500).json({
      error: "Failed to update solution",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteSolution = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.delete(`${CRM_BASE}/Solutions/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error(
      "Zoho CRM Solutions Error:",
      err.response?.data || err.message
    );
    res.status(500).json({
      error: "Failed to delete solution",
      details: err.response?.data || err.message,
    });
  }
};
