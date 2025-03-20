import React from "react";
import { useNavigate } from "react-router-dom";
import ShinyButton from "../ShinyButton/ShinyButton";
import { FaCode, FaStar } from "react-icons/fa";
import logo from "../../../assets/icon.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen flex justify-between items-center p-4 pe-10 font-sans-serif">
      <div className="flex text-white justify-center items-center ml-1 cursor-pointer">
        <img src={logo} alt="logo" className="h-8 w-8 mr-3 object-contain" />

        <h1 className="text-3xl font-extrabold gradient-text">Journey</h1>
      </div>
      <div className="flex">
        <button 
          className="flex items-center justify-center gap-1 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 text-white px-3 py-1 rounded-md mr-4 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm shadow-sm"
          onClick={() => window.location.href = "https://github.com/foolcodes/journey"}
        >
          <FaStar className="text-yellow-300 text-xs" /> Star us
        </button>
        <ShinyButton title={"Login"} onCLick={() => navigate("/login")} />
      </div>
    </div>
  );
};

export default Header;