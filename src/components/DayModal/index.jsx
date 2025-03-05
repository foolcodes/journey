import { X, Hourglass } from "lucide-react";
const DayModal = ({ onClose }) => {
  return (
    <div
      data-aos="fade-up"
      className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="flex flex-col">
        <button
          onClick={onClose}
          className="place-self-end cursor-pointer mb-2"
        >
          <X size={30} color="white" />
        </button>
        <div className="bg-indigo-600 p-5 text-white rounded-xl w-100">
          <h1 className="text-3xl font-bold mb-7 text-center">
            New Day, Same Goal!
          </h1>
          <h2 className="text-xl mb-3 font-medium">Day 1</h2>
          <form className="flex flex-col items-center">
            <div className="relative w-full mb-5 flex justify-center items-center">
              <input
                type="text"
                placeholder="Hours?"
                className="border-none focus:outline-none p-3 pr-10 h-11 bg-white w-full text-black rounded text-sm"
              />
              <Hourglass
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={19}
              />
            </div>{" "}
            <textarea
              placeholder="Topics Covered"
              className="border-none focus:outline-none p-3 pr-10 bg-white w-full text-black rounded text-sm resize-none h-24 mb-5"
            />
            <button className="text-white cursor-pointer bg-black rounded w-17 px-4 py-2 font-medium">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DayModal;
