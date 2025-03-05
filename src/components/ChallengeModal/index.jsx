import { X, CalendarDays } from "lucide-react";
const ChallengeModal = ({ onCloseChallengeModal }) => {
  return (
    <div
      data-aos="fade-up"
      className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="flex flex-col">
        <button
          onClick={onCloseChallengeModal}
          className="place-self-end cursor-pointer mb-2"
        >
          <X size={30} color="white" />
        </button>
        <div className="bg-indigo-600 p-5 text-white rounded-xl w-100">
          <h1 className="text-3xl font-bold mb-7 text-center">Up for It?</h1>
          <form className="flex flex-col items-center">
            <div className="relative w-full mb-5 flex justify-center items-center">
              <input
                type="text"
                placeholder="Number of Days?"
                className="border-none focus:outline-none p-3 pr-10 h-11 bg-white w-full text-black rounded text-sm"
              />
              <CalendarDays
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={19}
              />
            </div>{" "}
            <textarea
              placeholder="Describe what you want to achieve with this challenge"
              className="border-none focus:outline-none p-3 pr-10 bg-white w-full text-black rounded text-sm resize-none h-24 mb-5 overflow-y-scroll custom-scrollbar"
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

export default ChallengeModal;
