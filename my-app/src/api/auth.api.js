import api from "./axios";

export const loginAPI = (data) => api.post("/auth/login", data);
export const registerStudentAPI = (data) => api.post("/auth/register", data);
