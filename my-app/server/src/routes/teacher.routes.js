import express from "express";
import {
  getUnapprovedStudents,
  approveStudent,
  getSchoolStats,
  getMyProfile,
  updateMyProfile,
  createSimulation,
  getSchoolSimulations,
  updateSimulation,
  deleteSimulation,
  getStudentReports
} from "../controllers/teacher.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();
router.use(authMiddleware, roleMiddleware("TEACHER"));

router.get("/profile", getMyProfile);
router.put("/profile", updateMyProfile);
router.get("/students/pending", getUnapprovedStudents);
router.put("/student/:id/approve", approveStudent);
router.get("/stats", getSchoolStats);
router.get("/reports", getStudentReports);

// Simulation management routes
router.post("/simulations", createSimulation);
router.get("/simulations", getSchoolSimulations);
router.put("/simulation/:id", updateSimulation);
router.delete("/simulation/:id", deleteSimulation);

export default router;
