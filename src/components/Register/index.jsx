import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickNavigateToRegister = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div
        data-aos="fade-down"
        className="flex shadow-xl h-[450px] w-[750px] relative bg-white rounded-3xl overflow-hidden"
      >
        <div
          data-aos="fade-right"
          className="absolute w-[50%] h-[100%] flex items-center text-center z-10"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-[100%]"
          >
            <h1 className="font-bold text-[#333] text-4xl">Register</h1>
            <div className="flex relative m-[30px]">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                placeholder="Name"
                className="input-box"
                value={name}
              />
              <FaUser className="input-icon" />
            </div>
            <div className="flex relative mb-[30px]">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required
                placeholder="Email"
                value={email}
                className="input-box"
              />
              <FaEnvelope className="input-icon" />
            </div>

            <div className="flex relative mb-[30px]">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
                value={password}
                className="input-box"
              />
              <FaLock className="input-icon" />
            </div>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              disabled={isLoading}
              className="bg-[#512da8] w-[300px] p-2 rounded-xl shadow-2xs border-none cursor-pointer text-white font-semibold"
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={25} />
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
        <div
          data-aos="fade-left"
          className="bg-gradient-to-r right-0 from-[#512da8] to-[#5c6bc0] rounded-l-[160px] toggle-box absolute h-[100%] w-[50%] flex justify-center items-center text-white"
        >
          <div className="toggle-panel text-center">
            <h1 className="text-4xl font-bold mb-3">Hello, Welcome</h1>
            <p className="text-sm mb-5">Already have an account?</p>
            <button
              onClick={onClickNavigateToRegister}
              className="bg-transparent w-44 p-2 rounded-xl shadow-2xs border-1 border-solid border-white cursor-pointer text-white font-semibold"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
