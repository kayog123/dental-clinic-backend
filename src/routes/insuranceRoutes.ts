import { Router } from "express";
import { createInsurance } from "../controllers/insuranceController";

const router = Router();
router.post("/create", createInsurance);

export default router;
