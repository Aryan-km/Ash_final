import api from "./axios";
export const getPendingStudentsAPI = () => {
  console.log("getPendingStudentsAPI called");
  return api.get("/teacher/students/pending");
}
export const approveStudentAPI = (id) =>
  api.put(`/teacher/student/${id}/approve`);

export const getSchoolStatsAPI = () => {
  return api.get("/teacher/stats");
}

export const getTeacherProfileAPI = () =>
  api.get("/teacher/profile");

export const updateTeacherProfileAPI = (data) =>
  api.put("/teacher/profile", data);

// Simulation management APIs
export const createSimulationAPI = (data) =>
  api.post("/teacher/simulations", data);

export const getSchoolSimulationsAPI = () =>
  api.get("/teacher/simulations");

export const updateSimulationAPI = (id, data) =>
  api.put(`/teacher/simulation/${id}`, data);

export const deleteSimulationAPI = (id) =>
  api.delete(`/teacher/simulation/${id}`);

export const getStudentReportsAPI = () =>
  api.get("/teacher/reports");

