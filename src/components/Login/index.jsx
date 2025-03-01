import { FaCode } from "react-icons/fa";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#080C18]">
      <div className="flex flex-col bg-[#111827] h-[350px] w-[350px]">
        <div className="flex self-center justify-center items-center mt-7">
          <FaCode className="text-white text-3xl mr-3" />
          <h1 className="gradient-text text-3xl">Journey</h1>
        </div>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Enter your Email" id="email" />
        </form>
      </div>
    </div>
  );
};

export default Login;
