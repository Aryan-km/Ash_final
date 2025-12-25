import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import StudentRegister from "./pages/auth/StudentRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SchoolDetails from "./pages/admin/SchoolDetails";
import AdminCreateTeacher from "./pages/admin/AdminCreateTeacher";
import AdminPendingApprovals from "./pages/admin/AdminPendingApprovals";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherSimulations from "./pages/teacher/TeacherSimulations";
import TeacherAddSimulation from "./pages/teacher/TeacherAddSimulation";
import TeacherReports from "./pages/teacher/TeacherReports";
import StudentDashboard from "./pages/student/StudentDashboard";
import Simulation from "./pages/student/Simulation";
import SimulationView from "./pages/student/SimulationView";
import Profile from "./pages/profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/static/Home";
import Courses from "./pages/static/Courses";
import Resources from "./pages/static/Resources";
import About from "./pages/static/About";
import Help from "./pages/static/Help";
import Contact from "./pages/static/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<StudentRegister />} />
        
        {/* Static Pages */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />

        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-teacher" element={<AdminCreateTeacher />} />
          <Route path="/admin/pending-approvals" element={<AdminPendingApprovals />} />
          <Route path="/admin/school/:schoolName" element={<SchoolDetails />} />
        </Route>

        <Route element={<ProtectedRoute role="TEACHER" />}>
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/simulations" element={<TeacherSimulations />} />
          <Route path="/teacher/simulations/add" element={<TeacherAddSimulation />} />
          <Route path="/teacher/reports" element={<TeacherReports />} />
        </Route>

        <Route element={<ProtectedRoute role="STUDENT" />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/simulations" element={<Simulation />} />
          <Route path="/student/simulation/:simulationName" element={<SimulationView />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
