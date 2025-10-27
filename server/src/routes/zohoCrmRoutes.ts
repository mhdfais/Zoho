import express from "express";
import {
  createAccount,
  deleteAccount,
  editAccount,
  getAccountbyId,
  getAccounts,
} from "../controllers/zohoCrmController";
// import { fetchAccounts } from "../controllers/zohoCrmController";

const router = express.Router();

router.get("/accounts", getAccounts);
router.post("/accounts", createAccount);
router.delete("/accounts/:id", deleteAccount);
router.put("/accounts/:id", editAccount);
router.get("/accounts/:id", getAccountbyId);

export default router;
