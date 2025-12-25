import { useState, useContext } from "react";
import { loginAPI } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async () => {
    const res = await loginAPI(form);
    login(res.data.token);

    if (res.data.role === "ADMIN") navigate("/admin");
    if (res.data.role === "TEACHER") navigate("/teacher");
    if (res.data.role === "STUDENT") navigate("/student");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Sign in to continue learning</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              placeholder="Enter your email"
              onChange={e => setForm({ ...form, email: e.target.value })} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              type="password" 
              placeholder="Enter your password"
              onChange={e => setForm({ ...form, password: e.target.value })} 
            />
          </div>
          
          <button 
            onClick={submit} 
            className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-md hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm font-medium"
          >
            Sign In
          </button>
          
          <div className="text-center pt-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                Register here
              </Link>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <Link to="/" className="text-purple-600 hover:text-purple-700">
                ← Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
