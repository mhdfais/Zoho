import toast from "react-hot-toast";
import { api } from "./api";

export const fetchAccounts = async () => {
  try {
    const response = await api.get("/crm/accounts");
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to load accounts. Try again later.");
    }
    throw error;
  }
};

export const createAccount = async (formdata) => {
  try {
    const response = await api.post("/crm/accounts", formdata);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to create accounts. Try again later.");
    }
    throw error;
  }
};

export const deleteAccount = async (id) => {
  try {
    const response = await api.delete(`/crm/accounts/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to delete accounts. Try again later.");
    }
    throw error;
  }
};

export const editAccount = async (id, formdata) => {
  try {
    const response = await api.put(`/crm/accounts/${id}`, formdata);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to edit accounts. Try again later.");
    }
    throw error;
  }
};

export const getAccountById = async (id) => {
  try {
    const response = await api.get(`/crm/accounts/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to get account. Try again later.");
    }
    throw error;
  }
};

export const getLeads = async () => {
  try {
    const response = await api.get(`/crm/leads`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to get leads. Try again later.");
    }
    throw error;
  }
};

export const getLeadbyId = async (id) => {
  try {
    const response = await api.get(`/crm/leads/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to get lead. Try again later.");
    }
    throw error;
  }
};

export const createLead = async (formData) => {
  try {
    const payload = {
      data: [
        {
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Company: formData.company,
          Email: formData.email,
          Phone: formData.phone,
          Mobile: formData.mobile,
          Fax: formData.fax,
          Website: formData.website,
          Lead_Source: formData.leadSource,
          Lead_Status: formData.leadStatus,
          Annual_Revenue: formData.annualRevenue,
          Industry: formData.industry,
          No_of_Employees: formData.numberOfEmployees,
          Rating: formData.rating,
          Street: formData.street,
          City: formData.city,
          State: formData.state,
          Zip_Code: formData.zipCode,
          Country: formData.country,
          Description: formData.description,
          Title: formData.title,
        },
      ],
    };
    const response = await api.post("/crm/leads", payload);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to create leads. Try again later.");
    }
    throw error;
  }
};

export const editLead = async (id, data) => {
  try {
    const response = await api.put(`/crm/leads/${id}`, data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to edit leads. Try again later.");
    }
    throw error;
  }
};

export const deleteLead = async (id) => {
  try {
    const response = await api.delete(`/crm/leads/${id}`);
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to delete leads. Try again later.");
    }
    throw error;
  }
};

export const getAllContacts = async () => {
  try {
    const response = await api.get("/crm/contacts");
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to load contacts. Try again later.");
    }
    throw error;
  }
};

export const getContactById = async (id) => {
  try {
    const response = await api.get(`/crm/contacts/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to get contact. Try again later.");
    }
    throw error;
  }
};

export const createContact = async (formData) => {
  try {
    const payload = {
      data: [
        {
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Email: formData.email,
          Phone: formData.phone,
          Mobile: formData.mobile,
          Department: formData.department,
          Title: formData.title,
          Lead_Source: formData.leadSource,
          Mailing_Street: formData.mailingStreet,
          Mailing_City: formData.mailingCity,
          Mailing_State: formData.mailingState,
          Mailing_Zip: formData.mailingCode,
          Mailing_Country: formData.mailingCountry,
          Other_Street: formData.otherStreet,
          Other_City: formData.otherCity,
          Other_State: formData.otherState,
          Other_Zip: formData.otherCode,
          Other_Country: formData.otherCountry,
          Description: formData.description,
          // if linked to an Account:
          ...(formData.accountId
            ? { Account_Name: { id: formData.accountId } }
            : {}),
        },
      ],
    };

    const response = await api.post("/crm/contacts", payload);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to create contact. Try again later.");
    }
    throw error;
  }
};

export const editContact = async (id, formData) => {
  try {
    const response = await api.put(`/crm/contacts/${id}`, formData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to edit contacts. Try again later.");
    }
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/crm/contacts/${id}`);
    return response;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to delete contacts. Try again later.");
    }
    throw error;
  }
};

export const getAllDeals = async () => {
  try {
    const response = await api.get("/crm/deals");
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to fetch deals. Try again later.");
    }
    throw error;
  }
};

export const getDealbyId = async (id) => {
  try {
    const response = await api.get(`/crm/deals/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to get deal. Try again later.");
    }
    throw error;
  }
};

export const createDeal = async (formData) => {
  try {
    const response = await api.post("/crm/deals", formData);
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to create deals. Try again later.");
    }
    throw error;
  }
};

export const editDeal = async (id, formData) => {
  try {
    const response = await api.put(`/crm/deals/${id}`, formData);
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to edit deals. Try again later.");
    }
    throw error;
  }
};

export const deleteDeal = async (id) => {
  try {
    const response = await api.delete(`/crm/deals/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please wait a few seconds.");
    } else if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to delete deals. Try again later.");
    }
    throw error;
  }
};
