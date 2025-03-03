import { useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();
  const onClickNavigateToRegister = () => {
    navigate("/register", { replace: true });
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div
        data-aos="fade-down"
        className="flex shadow-xl h-[450px] w-[750px] relative bg-white rounded-3xl overflow-hidden"
      >
        <div
          data-aos="fade-left"
          className="absolute w-[50%] h-[100%] right-0 flex items-center text-center z-10"
        >
          <form className="flex flex-col items-center w-[100%]">
            <h1 className="font-bold text-[#333] text-4xl">Login</h1>
            <div className="flex relative m-[30px]">
              <input
                type="text"
                required
                placeholder="Username"
                className="input-box"
              />
              <FaUser className="input-icon top-3.5" />
            </div>

            <div className="flex relative mb-[30px]">
              <input
                type="password"
                required
                placeholder="Password"
                className="input-box"
              />
              <FaLock className="input-icon top-3.5" />
            </div>
            <button
              onClick={() => navigate("/overview", { replace: true })}
              className="bg-[#512da8] w-[300px] p-2 rounded-xl shadow-2xs border-none cursor-pointer text-white font-semibold"
            >
              Login
            </button>
          </form>
        </div>
        <div
          data-aos="fade-right"
          className="bg-gradient-to-r from-[#512da8] to-[#5c6bc0] rounded-r-[160px] toggle-box absolute h-[100%] w-[50%] flex justify-center items-center text-white z-20"
        >
          <div className="toggle-panel text-center">
            <h1 className="text-4xl font-bold mb-3">Welcome Back!</h1>
            <p className="text-sm mb-5">Don't have an account?</p>
            <button
              onClick={onClickNavigateToRegister}
              className="bg-transparent w-44 p-2 rounded-xl shadow-2xs border-1 border-solid border-white cursor-pointer text-white font-semibold"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
