import { X } from "lucide-react";

const UserModal = ({ closeModal, onImageSelectedUrl }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageSelectedUrl(url);
      closeModal();
    }
  };

  const onClickCloseModal = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col">
        <button
          onClick={onClickCloseModal}
          className="place-self-end cursor-pointer mb-2"
        >
          <X size={30} color="white" />
        </button>
        <div className="bg-indigo-500 p-5 rounded-2xl flex flex-col justify-center items-center">
          <label className="block mb-3 w-fit">
            <span className="sr-only">Choose profile photo</span>
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="block w-full text-sm text-white file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-gray-700 file:text-white hover:file:bg-gray-600"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
