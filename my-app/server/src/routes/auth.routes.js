import express from "express";
import { login, registerStudent } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/login", login);
router.post("/register", registerStudent);
export default router;
