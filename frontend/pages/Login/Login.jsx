import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Redirect to dashboard or home page
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div
      className="min-h-screen min-w-screen h-full flex items-center justify-center bg-white"
      style={{
        backgroundImage: "url('photo-1664651205193-bfb6bfdd3b09.avif')",
        backgroundSize: "full",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-[360px] bg-white/90 p-[40px] rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.25)] font-['Segoe_UI','sans-serif']">
        <h2 className="text-center font-bold text-[22px] text-[#222] mb-[20px]">
          Login to Your Account
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Email or Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full p-[12px] mb-[10px] border border-[#ccc] rounded-[8px] bg-white text-black placeholder:text-[#666] outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-[12px] mb-[20px] border border-[#ccc] rounded-[8px] bg-white text-black placeholder:text-[#666] outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-[12px] rounded-[8px] text-white text-[16px] font-normal disabled:opacity-50"
            style={{
              backgroundColor: loading ? "#ccc" : "#007bff",
            }}
            onMouseOver={(e) =>
              !loading && (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              !loading && (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="mt-[15px] text-center text-[14px]">
          <a
            href="#"
            className="text-[#007bff] no-underline mx-[5px] hover:underline"
            onClick={handleSignupClick}
          >
            Sign Up 
          </a>
          <a
            href="#"
            className="text-[#007bff] no-underline mx-[5px] hover:underline"
          >
            ||
          </a>
          
          <a
            href="#"
            className="text-[#007bff] no-underline mx-[5px] hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
