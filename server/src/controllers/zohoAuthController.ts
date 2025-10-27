import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
import ZohoToken from "../models/ZohoToken";

dotenv.config();

const clientId = process.env.ZOHO_CLIENT_ID;
const redirectUrl = process.env.ZOHO_REDIRECT_URI;
const clientSecret = process.env.ZOHO_CLIENT_SECRET;

// export const zohoLogin = async (req: Request, res: Response) => {
//   console.log("hee");
//   try {
//     const { email, password } = req.body;
//     // console.log(email,password)
//     if (!email || !password) {
//       res.status(400).json({ message: "email and password is required" });
//       return;
//     }

//     const response = await axios.post(
//       "https://accounts.zoho.com/oauth/v2/token",
//       null,
//       {
//         params: {
//           grant_type: "password",
//           client_id: clientId,
//           client_secret: clientSecret,
//           username: email,
//           password: password,
//           scope: "ZohoCRM.modules.ALL,Desk.tickets.ALL,Desk.contacts.ALL",
//         },
//       }
//     );

//     const { access_token, refresh_token, expires_in, api_domain } =
//       response.data;
//     console.log(response.data);
//   } catch (error) {
//     res.status(500).json({ message: "server error" });
//   }
// };

export const authorize = async (req: Request, res: Response) => {
  try {
    const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL,ZohoCRM.settings.modules.READ&client_id=${clientId}&response_type=code&access_type=offline&redirect_uri=${redirectUrl}`;

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

    res.redirect(`${process.env.FRONTEND_URL}`);
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

export const handleLogout = async (req: Request, res: Response) => {
  try {
    await ZohoToken.deleteMany({});
    res.status(200).json({ message: "logged out" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const checkZohoStatus = async (req: Request, res: Response) => {
  const token = await ZohoToken.findOne();
  res.json({ connected: !!token });
};

// CRM -- fetching leads

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
