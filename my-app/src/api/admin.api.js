import api from "./axios";

export const createTeacherAPI = (data) => api.post("/admin/teacher", data);

export const getAllSchoolsAPI = () => api.get("/admin/schools");

export const getSchoolDetailsAPI = (schoolName) => api.get(`/admin/school/${encodeURIComponent(schoolName)}`);

export const getAllPendingStudentsAPI = () => api.get("/admin/pending-students");

export const adminApproveRejectStudentAPI = (id, data) => api.put(`/admin/student/${id}/approval`, data);
