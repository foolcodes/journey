const Signout = () => {
  return (
    <div className="bg-[#080C18] h-screen w-full p-10 pt-4">
      <h1 className="text-gray-50 text-2xl">USER PROFILE</h1>
      <div className="flex justify-center items-center">
        <div className="bg-[#111827] p-10 mt-8 rounded-l">
          <h1 className="text-white font-semibold text-sm mb-8">
            Edit Profile
          </h1>
          <form>
            <div className="flex justify-between w-[70%] mb-8">
              <div>
                <h2 className="text-gray-300 text-sm mb-3">Username</h2>
                <input
                  placeholder="fool"
                  type="text"
                  className="w-70 mr-8 border border-gray-700 bg-transparent text-gray-100 text-sm focus:outline-none p-2 rounded-md"
                />
              </div>
              <div>
                <h2 className="text-gray-300 text-sm mb-3">Email</h2>
                <input
                  placeholder="fool@gmail.com"
                  type="text"
                  className="w-70 border border-gray-700 bg-transparent text-gray-100 text-sm focus:outline-none p-2 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-between w-[70%] mb-8">
              <div>
                <h2 className="text-gray-300 text-sm mb-3">First Name</h2>
                <input
                  placeholder="fool"
                  type="text"
                  className="w-70 mr-8 border border-gray-700 bg-transparent text-gray-100 text-sm focus:outline-none p-2 rounded-md"
                />
              </div>
              <div>
                <h2 className="text-gray-300 text-sm mb-3">Last Name</h2>
                <input
                  placeholder="fool@gmail.com"
                  type="text"
                  className="w-70 border border-gray-700 bg-transparent text-gray-100 text-sm focus:outline-none p-2 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-gray-300 text-sm mb-3">About Me</h2>
              <input
                placeholder="fool@gmail.com"
                type="text"
                className="w-70 mb-12 border border-gray-700 bg-transparent text-gray-100 text-sm focus:outline-none p-2 rounded-md"
              />
              <button className="bg-linear-to-bl from-indigo-500 to-purple-500 w-[100px] p-2 rounded-xl shadow-2xs border-none cursor-pointer text-white font-semibold">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signout;
