import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-600 hover:text-purple-700">
          Virtual Lab
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            {user.role === "ADMIN" && <Link to="/admin" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Admin</Link>}
            {user.role === "TEACHER" && <Link to="/teacher" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Teacher</Link>}
            {user.role === "STUDENT" && (
              <>
                <Link to="/student" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Dashboard</Link>
                <Link to="/student/simulations" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Simulations</Link>
              </>
            )}
            <Link to="/courses" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Courses</Link>
            <Link to="/resources" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Resources</Link>
            <Link to="/profile" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Profile</Link>
            <button onClick={logout} className="text-sm px-3 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/courses" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Courses</Link>
            <Link to="/resources" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Resources</Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 text-sm font-medium">About</Link>
            <Link to="/help" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Help</Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Contact</Link>
            <Link to="/login" className="text-gray-700 hover:text-purple-600 text-sm font-medium">Login</Link>
            <Link to="/register" style={{color: "white"}} className="text-sm px-3 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-700 transition-colors">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
