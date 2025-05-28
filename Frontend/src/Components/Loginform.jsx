import React, { useState } from "react";
import { loginUser, registerUser } from "../API/user.api.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../Store/slice/authReducer.js";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, password } = formData;
    
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setLoading(true);
    
    try {
      if (isLogin) {
        const data = await loginUser(email, password);
        console.log("Login response:", data); // Debug
        
        if (data && data.user) {
          dispatch(login(data.user));
          toast.success(data.message || "Login successful!");
          
          // Add a small delay before navigation to ensure state is updated
          setTimeout(() => {
            navigate({to: "/dashboard"});
          }, 300);
        } else {
          toast.error("Invalid login response");
        }
      } else {
        const data = await registerUser(name, email, password);
        console.log("Register response:", data); // Debug
        
        if (data && data.user) {
          dispatch(login(data.user));
          toast.success(data.message || "Registration successful!");
          
          // Add a small delay before navigation to ensure state is updated
          setTimeout(() => {
            navigate({to: "/dashboard"});
          }, 300);
        } else {
          toast.error("Invalid registration response");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {isLogin ? "Login to Your Account" : "Create an Account"}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Name field - only for registration */}
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
        )}
        
        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        
        {/* Password field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>
        
        {/* Submit button */}
        <div className="mb-6">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : (isLogin ? "Login" : "Register")}
          </button>
        </div>
      </form>
      
      {/* Toggle between login and register */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:text-blue-400 focus:outline-none"
        >
          {isLogin ? "Need an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
