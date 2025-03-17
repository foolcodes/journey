import React from "react";
import { useNavigate } from "react-router-dom";
import ShinyButton from "../ShinyButton/ShinyButton";
import { FaCode } from "react-icons/fa";
import logo from "../../../assets/icon.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen flex justify-between items-center p-4 pe-10 font-sans-serif">
      <div className="flex text-white justify-center items-center ml-1 cursor-pointer">
        <img src={logo} alt="logo" className="h-8 w-8 mr-3 object-contain" />

        <h1 className="text-3xl font-extrabold gradient-text">Journey</h1>
      </div>
      <ShinyButton title={"Login"} onCLick={() => navigate("/login")} />
    </div>
  );
};

export default Header;
