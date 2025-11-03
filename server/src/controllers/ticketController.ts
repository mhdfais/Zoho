import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const DESK_BASE = "https://desk.zoho.com/api/v1";

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const response = await axios.get(`${DESK_BASE}/tickets`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        orgId: process.env.ZOHO_DESK_ORG_ID,
      },
      params: {
        include: "contacts,assignee,departments",
      },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho Desk Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${DESK_BASE}/tickets/${id}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        orgId: process.env.ZOHO_DESK_ORG_ID,
      },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho Desk Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};

export const createTicket = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const payload = req.body;

    const response = await axios.post(`${DESK_BASE}/tickets`, payload, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        orgId: process.env.ZOHO_DESK_ORG_ID,
        "Content-Type": "application/json",
      },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error("Zoho Desk Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to create ticket",
      details: err.response?.data || err.message,
    });
  }
};

export const editTicket = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const payload = req.body;

    const response = await axios.patch(`${DESK_BASE}/tickets/${id}`, payload, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        orgId: process.env.ZOHO_DESK_ORG_ID,
        "Content-Type": "application/json",
      },
    });

    res.json(response.data);
  } catch (err: any) {
    console.error("Zoho Desk Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to update ticket",
      details: err.response?.data || err.message,
    });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    await axios.delete(`${DESK_BASE}/tickets/${id}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        orgId: process.env.ZOHO_DESK_ORG_ID,
      },
    });

    res.json({ success: true, message: "Ticket deleted successfully" });
  } catch (err: any) {
    console.error("Zoho Desk Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to delete ticket",
      details: err.response?.data || err.message,
    });
  }
};
