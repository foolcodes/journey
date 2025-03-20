import React from "react";
import { useNavigate } from "react-router-dom";
import ShinyButton from "../ShinyButton/ShinyButton";
import { FaStar } from "react-icons/fa";
import logo from "../../../assets/icon.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full flex flex-wrap sm:flex-nowrap justify-between items-center px-4 py-4 sm:px-10 font-sans bg-transparent">
      {/* Logo & Title */}
      <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer mb-3 sm:mb-0">
        <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
        <h1 className="text-2xl sm:text-3xl font-extrabold gradient-text leading-tight">Journey</h1>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <button
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm shadow-md w-full sm:w-auto"
          onClick={() => window.open("https://github.com/foolcodes/journey", "_blank")}
        >
          <FaStar className="text-yellow-300 text-sm" /> Star us
        </button>
        <ShinyButton title="Login" onCLick={() => navigate("/login")} />
      </div>
    </header>
  );
};

export default Header;
