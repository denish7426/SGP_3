import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Signup() {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };


  return (
    <div className="min-h-screen min-w-screen bg-[#f8f8f8] flex items-center justify-center px-4">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-[900px] rounded-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden">
        
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-10">
          <h2 className="text-[32px] font-bold mb-[25px] text-[#111]">Sign up</h2>

          <form className="space-y-4  text-[#333] ">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full border border-[#ccc] px-4 py-3 text-sm rounded-md"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full border border-[#ccc] px-4 py-3 text-sm rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full border border-[#ccc] px-4 py-3 text-sm rounded-md"
            />
            <input
              type="password"
              placeholder="Repeat your password"
              required
              className="w-full border border-[#ccc] px-4 py-3 text-sm rounded-md"
            />

            <label className="text-[13px] mt-2 block">
              <input type="checkbox" className="mr-2" required />
              I agree all statements in{' '}
              <a href="#" className="text-[#2575fc] underline">
                Terms of service
              </a>
            </label>

            <button
              type="submit"
              className="w-full bg-[#2575fc] hover:bg-[#1b5fd1] text-white py-3 text-[16px] rounded-md mt-2"
            >
              submit
            </button>

            <div className="text-center text-sm mt-4">
              <p>
                I am already member{' '}
                <a href="/login" className="text-[#333]  underline">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-white p-8">
          <img
            src="download.jpg"
            alt="Sign up illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
