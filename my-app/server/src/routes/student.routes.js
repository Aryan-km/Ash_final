import express from "express";
import {
  startSimulation,
  getSimulation,
  addObservation,
  markSimulationDone,
  getRecentSimulations,
  getMyProfile,
  updateMyProfile,
  getAllAvailableSimulations
} from "../controllers/student.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();
router.use(authMiddleware, roleMiddleware("STUDENT"));

router.get("/profile", getMyProfile);
router.put("/profile", updateMyProfile);
router.get("/simulations/available", getAllAvailableSimulations);
router.post("/simulation/start", startSimulation);
router.get("/simulation/:simulationName", getSimulation);
router.post("/simulation/observation", addObservation);
router.post("/simulation/mark-done", markSimulationDone);
router.get("/simulation/recent", getRecentSimulations);

export default router;
