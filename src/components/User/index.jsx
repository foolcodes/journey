import { useEffect, useState } from "react";
import UserModal from "../UserModal";

import { PencilIcon } from "lucide-react";

import { useAuthStore } from "../../store/authStore";
import { useProfileStore } from "../../store/profileStore";
import toast from "react-hot-toast";

const User = () => {
  const { user } = useAuthStore();
  const { updateProfileDetails } = useProfileStore();

  const [showModal, toggleShowModal] = useState(false);
  const [image, setImage] = useState(user.imageUrl);

  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [about, setAbout] = useState(null);

  const onSubmitUpdateDetails = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      await updateProfileDetails(image, password, name, about);
    }
    toast.success("Details updated successfully");
  };

  const onImageSelectedUrl = (url) => {
    setImage(url);
  };

  return (
    <div className="bg-[#080C18] h-screen w-full p-10 pt-4">
      <h1 className="text-gray-50 text-2xl">USER PROFILE</h1>
      <div className="flex justify-center items-center">
        <div className="bg-[#111827] p-10 mt-8 rounded-md pe-30">
          <h1 className="text-white font-semibold text-sm mb-8">
            Edit Profile
          </h1>
          <form onSubmit={onSubmitUpdateDetails}>
            <div className="flex justify-between w-[70%] mb-8">
              <div className="mr-10">
                <h2 className="text-gray-300 text-sm mb-3">Email</h2>
                <input
                  disabled
                  value={user.email} // Use `value` instead of `placeholder` for better readability
                  type="text"
                  className="w-70 border border-gray-700 bg-transparent text-white text-sm focus:outline-none p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <h2 className="text-gray-300 text-sm mb-3">Name</h2>
                <input
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user.name}
                  type="text"
                  className="w-70 mr-8 border border-gray-700 bg-transparent text-gray-100 text-sm focus:outline-none p-2 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-between w-[70%] mb-8">
              <div className="mr-10">
                <h2 className="text-gray-300 text-sm mb-3">Password</h2>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                  className="w-70 border border-gray-700 bg-transparent text-gray-100 text-sm focus:outline-none p-2 rounded-md"
                />
              </div>
              <div>
                <h2 className="text-gray-300 text-sm mb-3">Confirm Password</h2>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  type="password"
                  className="w-70 mr-8 border border-gray-700 bg-transparent text-gray-100 text-sm focus:outline-none p-2 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-gray-300 text-sm mb-3">About Me</h2>
              <input
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write about yourself"
                type="text"
                className="w-70 mb-12 border border-gray-700 bg-transparent text-gray-100 text-sm focus:outline-none p-2 rounded-md"
              />
              <button className="bg-linear-to-bl from-indigo-500 to-purple-500 w-[100px] p-2 rounded-xl shadow-2xs border-none cursor-pointer text-white font-semibold">
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="bg-[#111827] ml-7 relative flex flex-col justify-center items-center p-6 rounded-md">
          <div className="relative mb-6">
            <img
              src={image}
              alt="avatar"
              className="w-[150px] h-[150px] rounded-full border-2 border-gray-200"
            />
            <button
              onClick={toggleShowModal}
              className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600 cursor-pointer"
            >
              <PencilIcon size={"14px"} color="gray" />
            </button>
          </div>
          <h1 className="text-gray-300 text-xl font-semibold mb-7">
            {user.name}
          </h1>
          <p className="text-gray-300 font-normal">{user.about}</p>
        </div>
      </div>
      {showModal && (
        <UserModal
          closeModal={() => toggleShowModal(false)}
          onImageSelectedUrl={onImageSelectedUrl}
        />
      )}
    </div>
  );
};

export default User;
