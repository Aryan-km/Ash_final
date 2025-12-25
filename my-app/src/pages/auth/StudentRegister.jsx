import { useState } from "react";
import { registerStudentAPI } from "../../api/auth.api";
import { Link } from "react-router-dom";

export default function StudentRegister() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await registerStudentAPI(form);
    alert("Registered! Wait for teacher approval.");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600 text-sm">Join our learning platform</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              placeholder="Enter your name"
              onChange={e => setForm({ ...form, name: e.target.value })} 
            />
          </div>
          
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
              placeholder="Create a password"
              onChange={e => setForm({ ...form, password: e.target.value })} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">School</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              placeholder="Enter your school name"
              onChange={e => setForm({ ...form, school: e.target.value })} 
            />
          </div>
          
          <button 
            onClick={submit} 
            className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-md hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm font-medium"
          >
            Register
          </button>
          
          <div className="text-center pt-2">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
