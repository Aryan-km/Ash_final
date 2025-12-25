import api from "./axios";

export const getRecentSimulationsAPI = () =>
  api.get("/student/simulation/recent");

export const startSimulationAPI = (simulationName) =>
  api.post("/student/simulation/start", { simulationName });

export const getSimulationAPI = (simulationName) =>
  api.get(`/student/simulation/${simulationName}`);

export const addObservationAPI = (simulationName, observation) =>
  api.post("/student/simulation/observation", { simulationName, observation });

export const markSimulationDoneAPI = (simulationName) =>
  api.post("/student/simulation/mark-done", { simulationName });

export const getStudentProfileAPI = () =>
  api.get("/student/profile");

export const updateStudentProfileAPI = (data) =>
  api.put("/student/profile", data);

export const getAllAvailableSimulationsAPI = () =>
  api.get("/student/simulations/available");
