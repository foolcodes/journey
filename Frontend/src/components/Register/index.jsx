import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "lucide-react";
import AOS from "aos";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800, // or any custom duration you prefer
      once: true, // ensures animation happens once
    });
  }, []);

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
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] p-4">
      <div
        data-aos="fade-down"
        className="flex flex-col md:flex-row shadow-xl min-h-[450px] w-full max-w-[750px] relative bg-white rounded-3xl overflow-hidden"
      >
        {/* Register Form Section */}
        <div
          data-aos="fade-right"
          className="w-full h-full md:w-[50%] md:absolute md:left-0 flex items-center text-center p-6 md:p-0 z-10"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <h1 className="font-bold text-[#333] text-3xl md:text-4xl mb-6">
              Register
            </h1>
            <div className="flex relative my-4 w-full max-w-[300px]">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                placeholder="Name"
                className="input-box w-full p-3 pl-10 border rounded-lg outline-none mb-2"
                value={name}
              />
              <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            <div className="flex relative mb-4 w-full max-w-[300px]">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required
                placeholder="Email"
                value={email}
                className="input-box w-full p-3 pl-10 border rounded-lg outline-none mb-2"
              />
              <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            <div className="flex relative mb-4 w-full max-w-[300px]">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
                value={password}
                className="input-box w-full p-3 pl-10 border rounded-lg outline-none"
              />
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              disabled={isLoading}
              className="bg-[#512da8] mt-2 w-full max-w-[300px] p-2 rounded-xl shadow-md border-none cursor-pointer text-white font-semibold"
            >
              {isLoading ? (
                <Loader className="w-6 h-6 mx-auto animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>

        {/* Hello Welcome Section */}
        <div
          data-aos="fade-left"
          className="bg-gradient-to-r from-[#512da8] to-[#5c6bc0] md:rounded-l-[160px] md:rounded-bl-[160px] rounded-b-3xl md:rounded-b-none md:right-0 md:absolute h-auto md:h-full w-full md:w-[50%] flex justify-center items-center text-white py-8 md:py-0 px-6 order-last"
        >
          <div className="toggle-panel text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Hello, Welcome
            </h1>
            <p className="text-sm mb-5">Already have an account?</p>
            <button
              onClick={onClickNavigateToRegister}
              className="bg-transparent w-full max-w-[180px] p-2 rounded-xl shadow-md border border-solid border-white cursor-pointer text-white font-semibold"
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
