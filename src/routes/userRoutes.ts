import { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/userController";

const router = Router();
router.post("/create", createUser);
router.get("/:userId", getUser);
router.patch("/:userId/details", updateUser);

export default router;
