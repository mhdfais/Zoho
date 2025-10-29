import express from "express";
import {
  createAccount,
  deleteAccount,
  editAccount,
  getAccountbyId,
  getAccounts,
} from "../controllers/accountsController";
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
} from "../controllers/leadsController";
import {
  createContact,
  deleteContact,
  editContact,
  getAllContacts,
  getContactById,
} from "../controllers/contactController";
import {
  createDeal,
  deleteDeal,
  editDeal,
  getAllDeals,
  getDealById,
} from "../controllers/dealsController";
// import { fetchAccounts } from "../controllers/zohoCrmController";

const router = express.Router();

//  accounts
router.get("/accounts", getAccounts);
router.post("/accounts", createAccount);
router.delete("/accounts/:id", deleteAccount);
router.put("/accounts/:id", editAccount);
router.get("/accounts/:id", getAccountbyId);

//  leads
router.get("/leads", getLeads);
router.get("/leads/:id", getLeadById);
router.post("/leads", createLead);
router.put("/leads/:id", updateLead);
router.delete("/leads/:id", deleteLead);

// contacts
router.get("/contacts", getAllContacts);
router.get("/contacts/:id", getContactById);
router.post("/contacts", createContact);
router.put("/contacts/:id", editContact);
router.delete("/contacts/:id", deleteContact);

// deals
router.get("/deals", getAllDeals);
router.get("/deals/:id", getDealById);
router.post("/deals", createDeal);
router.put("/deals/:id", editDeal);
router.delete("/deals/:id", deleteDeal);

export default router;
