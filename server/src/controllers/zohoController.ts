import axios from "axios";
import { Request, Response } from "express";
import ZohoToken from "../models/ZohoToken";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.ZOHO_CLIENT_ID;
const redirectUrl = process.env.ZOHO_REDIRECT_URI;
const clientSecret = process.env.ZOHO_CLIENT_SECRET;

export const authorize = async (req: Request, res: Response) => {
  try {
    const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL,Desk.tickets.ALL,Desk.contacts.ALL&client_id=${clientId}&response_type=code&access_type=offline&redirect_uri=${redirectUrl}`;

    res.redirect(authUrl);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const zohoCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUrl,
          grant_type: "authorization_code",
        },
      }
    );
    // console.log(response.data)
    const data = response.data;
    await ZohoToken.findOneAndUpdate(
      {},
      {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        createdAt: new Date(),
      },
      { upsert: true }
    );

    res.send("Zoho authorization successful!");
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const getAccessToken = async () => {
  let token = await ZohoToken.findOne();
  if (!token) throw new Error("No token found!");

  const response = await axios.post(
    "https://accounts.zoho.com/oauth/v2/token",
    null,
    {
      params: {
        refresh_token: token.refresh_token,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
      },
    }
  );

  token.access_token = response.data.access_token;
  await token.save();
  return token.access_token;
};

// CRM -- fetching leads
export const fetchLeads = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get("https://www.zohoapis.com/crm/v2/Leads", {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// desk -- fetching tickets
export const fetchTickets = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get("https://desk.zoho.com/api/v1/tickets", {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// desk -- creating ticket
export const createTicket = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { subject, departmentId, contactId, description } = req.body;

    const response = await axios.post(
      "https://desk.zoho.com/api/v1/tickets",
      {
        subject,
        departmentId,
        contactId,
        description,
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          orgId: process.env.ZOHO_DESK_ORG_ID,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
