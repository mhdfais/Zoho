import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const fields = "Account_Name,Phone,Website,Owner";
    const response = await axios.get(`${CRM_BASE}/Accounts?fields=${fields}`, {
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
      error: "Failed to fetch accounts",
      details: message,
    });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const {
      accountName,
      phone,
      website,
      industry,
      accountNumber,
      accountType,
      employees,
      annualRevenue,
      billingStreet,
      billingCity,
      billingState,
      billingCode,
      billingCountry,
      shippingStreet,
      shippingCity,
      shippingState,
      shippingCode,
      shippingCountry,
      description,
    } = req.body;

    const payload = {
      data: [
        {
          Account_Name: accountName,
          Phone: phone,
          Website: website,
          Account_Number: accountNumber,
          Account_Type: accountType,
          Industry: industry,
          Employees: employees,
          Annual_Revenue: annualRevenue,
          Billing_Street: billingStreet,
          Billing_City: billingCity,
          Billing_State: billingState,
          Billing_Code: billingCode,
          Billing_Country: billingCountry,
          Shipping_Street: shippingStreet,
          Shipping_City: shippingCity,
          Shipping_State: shippingState,
          Shipping_Code: shippingCode,
          Shipping_Country: shippingCountry,
          Description: description,
        },
      ],
    };
    // console.log(payload)
    const token = await getAccessToken();

    const response = await axios.post(`${CRM_BASE}/Accounts`, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    res.json({
      success: true,
      message: "Account created successfully in Zoho CRM!",
      data: response.data,
    });
  } catch (err: any) {
    console.error(err.response?.data || err.message);
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
      error: "Failed to create accounts",
      details: message,
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const response = await axios.delete(`${CRM_BASE}/Accounts/${id}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    res.json({ success: true, data: response.data });
  } catch (err: any) {
    console.error(err.response?.data || err.message);
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
      error: "Failed to delete accounts",
      details: message,
    });
  }
};

export const editAccount = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;
    const updatedData = req.body;

    const payload = {
      data: [
        {
          ...updatedData,
        },
      ],
    };

    const response = await axios.put(`${CRM_BASE}/Accounts/${id}`, payload, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
      },
    });

    res.json({ success: true, data: response.data });
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
      error: "Failed to edit accounts",
      details: message,
    });
  }
};

export const getAccountbyId = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const response = await axios.get(`${CRM_BASE}/Accounts/${id}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    });

    const record = response.data.data?.[0];
    if (!record) {
      return res.status(404).json({ error: "Account not found" });
    }

    return res.status(200).json(record);
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
      error: "Failed to fetch account",
      details: message,
    });
  }
};

// fetch records
// const fetchModuleRecords = async (module: string) => {
//   try {
//     const token = await getAccessToken();
//     const response = await axios.get(`${CRM_BASE}/settings/modules`, {
//       headers: { Authorization: `Zoho-oauthtoken ${token}` },
//     });
//     console.log(response.data.modules)
//     return response.data.modules;
//   } catch (error: any) {
//     console.error(
//       `Error fetching ${module}:`,
//       error.response?.data || error.message
//     );
//   }
// };

// // create record
// export const createModuleRecord = async (module: string, data: any) => {
//   try {
//     const token = await getAccessToken();
//     const response = await axios.post(
//       `${CRM_BASE}/${module}`,
//       { data: [data] },
//       { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
//     );
//     return response.data.data[0];
//   } catch (error: any) {
//     console.error(
//       `Error creating record in ${module}:`,
//       error.response?.data || error.message
//     );
//   }
// };

// // Update record
// export const updateModuleRecord = async (
//   module: string,
//   id: string,
//   data: any
// ) => {
//   try {
//     const token = await getAccessToken();
//     const response = await axios.put(
//       `${CRM_BASE}/${module}`,
//       { data: [{ id, ...data }] },
//       { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
//     );
//     return response.data.data[0];
//   } catch (error: any) {
//     console.error(
//       `Error updating record in ${module} (id: ${id}):`,
//       error.response?.data || error.message
//     );
//   }
// };

// // Delete record
// export const deleteModuleRecord = async (module: string, id: string) => {
//   try {
//     const token = await getAccessToken();
//     const response = await axios.delete(`${CRM_BASE}/${module}`, {
//       headers: { Authorization: `Zoho-oauthtoken ${token}` },
//       params: { ids: id },
//     });
//     return response.data.data[0];
//   } catch (error: any) {
//     console.error(
//       `Error deleting record in ${module} (id: ${id}):`,
//       error.response?.data || error.message
//     );
//   }
// };

// export const fetchAccounts = async (req: Request, res: Response) => {
//   try {
//     const data = await fetchModuleRecords("Accounts");
//     res.json(data);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ------------------------------------------------  LEAD  -------------
// export const fetchLeads = async (req: Request, res: Response) => {
//   try {
//     const data = await fetchModuleRecords("Leads");
//     res.json(data);
//   } catch (err: any) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const createLead = async (req: Request, res: Response) => {
//   try {
//     const newLead = await createModuleRecord("Leads", req.body);
//     res.json({ success: true, data: newLead });
//   } catch (err: any) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const updateLead = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const updatedLead = await updateModuleRecord("Leads", id, req.body);
//     res.json({ success: true, data: updatedLead });
//   } catch (err: any) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const deleteLead = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const deletedLead = await deleteModuleRecord("Leads", id);
//     res.json({ success: true, data: deletedLead });
//   } catch (err: any) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// //-------------------------------------------------  contacts  -----------------------------------

// export const fetchContacts = async (req: Request, res: Response) => {
//   try {
//     const data = await fetchModuleRecords("Contacts");
//     res.json(data);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// //--------------------------------------------------  account  --------------------------------------------

// //---------------------------------------------------  deal -------------------------------------------------

// export const fetchDeals = async (req: Request, res: Response) => {
//   try {
//     const data = await fetchModuleRecords("Deals");
//     res.json(data);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// //--------------------------------------------  task -------------------------------------------------------

// export const fetchTasks = async (req: Request, res: Response) => {
//   try {
//     const data = await fetchModuleRecords("Tasks");
//     res.json(data);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ------------------------------------------------  call ----------------------------------------------------

// export const fetchCalls = async (req: Request, res: Response) => {
//   try {
//     const data = await fetchModuleRecords("Calls");
//     res.json(data);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// //-----------------------------------------------------------  event ----------------------------------------------------

// export const fetchEvents = async (req: Request, res: Response) => {
//   try {
//     const data = await fetchModuleRecords("Events");
//     res.json(data);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// //------------------------------------------------------------ notes ---------------------------------------------------

// export const fetchNotes = async (req: Request, res: Response) => {
//   try {
//     const data = await fetchModuleRecords("Notes");
//     res.json(data);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };
