import { Router } from "express";
import { getDentistList } from "../controllers/serviceDentistController";

const router = Router();
router.post("/dentist/list", getDentistList);

export default router;
