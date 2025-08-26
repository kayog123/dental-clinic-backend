import { Router } from "express";
import {
  createAppointment,
  getDentistAppointmentDay,
  getUserAppointment,
  updateAppointment,
  getUserAppointmentByDate,
  getAppointmentId,
} from "../controllers/appointmentController";

const router = Router();
router.post("/create", createAppointment);
router.post("/list", getUserAppointment);
router.post("/day/details", getDentistAppointmentDay);
router.post("/list/date", getUserAppointmentByDate);
router.patch("/:appointmentId/details", updateAppointment);
router.get("/:appointmentId", getAppointmentId);

export default router;
