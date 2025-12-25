import express from "express";
import { createTeacher, getTeachers, getAllSchools, getSchoolDetails, getAllPendingStudents, adminApproveRejectStudent } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();
router.use(authMiddleware, roleMiddleware("ADMIN"));

router.post("/teacher", createTeacher);
router.get("/teachers", getTeachers);
router.get("/schools", getAllSchools);
router.get("/school/:schoolName", getSchoolDetails);
router.get("/pending-students", getAllPendingStudents);
router.put("/student/:id/approval", adminApproveRejectStudent);

export default router;
