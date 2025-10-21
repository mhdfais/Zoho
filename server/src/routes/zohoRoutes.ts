import express from "express";
import {
  authorize,
  fetchLeads,
  fetchTickets,
  zohoCallback,
} from "../controllers/zohoController";

const router = express.Router();

router.get("/authorize", authorize);
router.get("/oauth/zoho/callback", zohoCallback);

// Zoho CRM
router.get("/leads", fetchLeads);

// Zoho Desk
router.get('/tickets',fetchTickets)

export default router;
