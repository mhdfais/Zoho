import express from "express";
import {
  authorize,
  checkZohoStatus,
  getCurrentUser,
  // fetchLeads,
  handleLogout,
  zohoCallback,
} from "../controllers/zohoAuthController";

const router = express.Router();

router.get("/authorize", authorize);
router.get("/oauth/zoho/callback", zohoCallback);
router.post("/logout", handleLogout);
router.get("/zoho/status", checkZohoStatus);
router.get('/currentUser',getCurrentUser)

// router.post(
//   "/checkpost",
//   (req, res, next) => {
//     console.log("hello");
//     next();
//   },
//   checkpost
// );

// Zoho CRM
// router.get("/leads", fetchLeads);

// Zoho Desk
// router.get("/tickets", fetchTickets);
export default router;
