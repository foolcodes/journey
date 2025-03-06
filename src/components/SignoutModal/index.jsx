import ShinyButton from "../ShinyButton/ShinyButton";

const SignoutModal = () => {
  return (
    <div className="bg-[#080C18] h-screen w-full flex justify-center items-center">
      <div data-aos="fade-up" className="bg-[#111827] p-10 mt-8 rounded-md">
        <h1 className="text-gray-100 text-2xl font-semibold mb-8">
          Are you sure you want to Signout?
        </h1>
        <div className="flex justify-center">
          <ShinyButton title={"Yes"} />
          <button className="bg-linear-to-bl ml-5 from-indigo-500 to-purple-500 w-[70px] p-2 rounded-xl shadow-2xs border-none cursor-pointer text-white font-semibold">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignoutModal;
