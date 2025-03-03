import React from "react";
import { useNavigate } from "react-router-dom";
import ShinyButton from "../ShinnyButton/ShinyButton";
import { FaCode } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const onClickNavigateToRegister = () => {
    navigate("/register");
  };
  return (
    <div className="w-screen flex justify-between items-center p-4 font-sans-serif">
      <div className="flex text-white justify-center items-center ml-1 cursor-pointer">
        <FaCode className="text-4xl mr-3" />
        <h1 className="text-3xl font-extrabold gradient-text">Journey</h1>
      </div>
      <div className="flex">
        <ShinyButton title={"Login"} />
        <button
          onClick={onClickNavigateToRegister}
          className="mr-4 ml-4 text-white cursor-pointer bg-indigo-600 p-2 rounded-2xl w-23 font-medium button"
        >
          Signup{" "}
        </button>
      </div>
    </div>
  );
};

export default Header;
