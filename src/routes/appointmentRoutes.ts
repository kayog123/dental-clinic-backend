import { Router } from "express";
import {
  createAppointment,
  getUserAppointment,
  updateAppointment,
} from "../controllers/appointmentController";

const router = Router();
router.post("/create", createAppointment);
router.post("/list", getUserAppointment);
router.patch("/:appointmentId/details", updateAppointment);

export default router;
