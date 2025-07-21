import React from "react";
import {useNavigate} from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()

    const handleloginclick=()=>{
        navigate("/signup")
    }

  return (
    <div
      className="min-h-screen min-w-screen h-full flex items-center justify-center  bg-white"
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
        <form>
          <input
            type="text"
            placeholder="Email or Username"
            required
            className="w-full p-[12px] mb-[10px] border border-[#ccc] rounded-[8px] bg-white text-black placeholder:text-[#666] outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-[12px] mb-[20px] border border-[#ccc] rounded-[8px] bg-white text-black placeholder:text-[#666] outline-none"
          />
          <button
            type="submit"
            className="w-full p-[12px] rounded-[8px] text-white text-[16px] font-normal"
            style={{
              backgroundColor: "#007bff",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Log In
          </button>
        </form>
        <div className="mt-[15px] text-center text-[14px]">
          <a
            href="#"
            className="text-[#007bff] no-underline mx-[5px] hover:underline"
            onClick={handleloginclick}
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
