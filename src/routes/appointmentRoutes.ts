import { Router } from "express";
import {
  createAppointment,
  getDentistAppointmentDay,
  getUserAppointment,
  updateAppointment,
} from "../controllers/appointmentController";

const router = Router();
router.post("/create", createAppointment);
router.post("/list", getUserAppointment);
router.post("/day/details", getDentistAppointmentDay);
router.patch("/:appointmentId/details", updateAppointment);

export default router;
