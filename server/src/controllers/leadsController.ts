import axios from "axios";
import { Request, Response } from "express";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getLeads = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();

    const fields = "Full_Name,Company,Email,Phone,Lead_Source,Owner";

    const response = await axios.get(`${CRM_BASE}/Leads?fields=${fields}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    });

    res.status(200).json(response.data);
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;

    console.error("Zoho CRM Error:", message);

    // Handle 429 rate limit
    if (status === 429) {
      return res.status(429).json({
        error: "Too many requests to Zoho CRM API. Please wait and try again.",
      });
    }

    // Handle 401 (expired token)
    if (status === 401) {
      return res.status(401).json({
        error: "Invalid or expired Zoho access token.",
      });
    }

    // Default fallback
    res.status(500).json({
      error: "Failed to fetch leads",
      details: message,
    });
    console.error("zoho CRM Error:", status, err.response?.data || err.message);
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Leads/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(200).json(response.data.data[0]);
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;

    console.error("Zoho CRM Error:", message);

    // Handle 429 rate limit
    if (status === 429) {
      return res.status(429).json({
        error: "Too many requests to Zoho CRM API. Please wait and try again.",
      });
    }

    // Handle 401 (expired token)
    if (status === 401) {
      return res.status(401).json({
        error: "Invalid or expired Zoho access token.",
      });
    }

    // Default fallback
    res.status(500).json({
      error: "Failed to get lead",
      details: message,
    });
    console.error("zoho CRM Error:", status, err.response?.data || err.message);
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    // const payload = { data: [req.body] };
    // console.log(payload.data)

    const response = await axios.post(`${CRM_BASE}/Leads`, req.body, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(201).json(response.data);
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;

    console.error("Zoho CRM Error:", message);

    // Handle 429 rate limit
    if (status === 429) {
      return res.status(429).json({
        error: "Too many requests to Zoho CRM API. Please wait and try again.",
      });
    }

    // Handle 401 (expired token)
    if (status === 401) {
      return res.status(401).json({
        error: "Invalid or expired Zoho access token.",
      });
    }

    // Default fallback
    res.status(500).json({
      error: "Failed to create leads",
      details: message,
    });
    console.error("zoho CRM Error:", status, err.response?.data || err.message);
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = await getAccessToken();

    const payload = { data: [req.body] };

    const response = await axios.put(`${CRM_BASE}/Leads/${id}`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(200).json(response.data);
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;

    console.error("Zoho CRM Error:", message);

    // Handle 429 rate limit
    if (status === 429) {
      return res.status(429).json({
        error: "Too many requests to Zoho CRM API. Please wait and try again.",
      });
    }

    // Handle 401 (expired token)
    if (status === 401) {
      return res.status(401).json({
        error: "Invalid or expired Zoho access token.",
      });
    }

    // Default fallback
    res.status(500).json({
      error: "Failed to update leads",
      details: message,
    });
    console.error("zoho CRM Error:", status, err.response?.data || err.message);
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = await getAccessToken();

    const response = await axios.delete(`${CRM_BASE}/Leads/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    res.status(200).json(response.data);
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;

    console.error("Zoho CRM Error:", message);

    // Handle 429 rate limit
    if (status === 429) {
      return res.status(429).json({
        error: "Too many requests to Zoho CRM API. Please wait and try again.",
      });
    }

    // Handle 401 (expired token)
    if (status === 401) {
      return res.status(401).json({
        error: "Invalid or expired Zoho access token.",
      });
    }

    // Default fallback
    res.status(500).json({
      error: "Failed to delete leads",
      details: message,
    });
    console.error("zoho CRM Error:", status, err.response?.data || err.message);
  }
};
