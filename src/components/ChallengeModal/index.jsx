import { useRef, useState } from "react";

import { X, CalendarDays, Loader } from "lucide-react";
import { useChallengeStore } from "../../store/challengesStore";
import toast from "react-hot-toast";

const ChallengeModal = ({ onCloseChallengeModal }) => {
  const [noOfDays, setDays] = useState("");
  const [achieve, setAchieve] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  const { addChallenge, isLoading } = useChallengeStore();

  const onSubmitAddChallenge = async (event) => {
    event.preventDefault();
    const response = await addChallenge(noOfDays, achieve, currentDay);

    if (!response) {
      toast.error("Cannot add a challenge when one challenge is active!");
      onCloseChallengeModal();
      return null;
    }
    if (!isLoading) {
      onCloseChallengeModal();
      toast.success("Challenge added successfully, reload the page to update!");
    }
  };

  const modalRef = useRef();

  const closeChallengeModal = (e) => {
    if (modalRef.current === e.target) {
      onCloseChallengeModal();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeChallengeModal}
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
          <form
            className="flex flex-col items-center"
            onSubmit={onSubmitAddChallenge}
          >
            <div className="relative w-full mb-5 flex justify-center items-center">
              <input
                onChange={(e) => setDays(e.target.value)}
                value={noOfDays}
                type="number"
                min="1"
                max="365"
                placeholder="Number of Days?"
                className="border-none focus:outline-none p-3 pr-10 h-11 bg-white w-full text-black rounded text-sm"
              />
              <CalendarDays
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={19}
              />
            </div>{" "}
            <input
              onChange={(e) => setCurrentDay(e.target.value)}
              value={currentDay}
              type="number"
              min="1"
              max="365"
              placeholder="Current day of the challenge? (Optional)"
              className="border-none focus:outline-none mb-4 p-3 pr-10 h-11 bg-white w-full text-black rounded text-sm"
            />
            <textarea
              value={achieve}
              onChange={(e) => setAchieve(e.target.value)}
              placeholder="Describe what you want to achieve with this challenge"
              className="border-none focus:outline-none p-3 pr-10 bg-white w-full text-black rounded text-sm resize-none h-24 mb-5 overflow-y-scroll custom-scrollbar"
            />
            <button
              disabled={isLoading}
              className="bg-black w-[300px] p-2 rounded-xl shadow-2xs border-none cursor-pointer text-white font-semibold"
            >
              {isLoading ? (
                <Loader className="w-6 h-6 mx-auto animate-spin" />
              ) : (
                "Add"
              )}
            </button>
            <p className="text-white text-sm mt-2">
              Once set, you can{" "}
              <span className="text-green-600 font-semibold"> extend </span> the
              challenge duration, but{" "}
              <span className="text-red-600 font-semibold"> cannot </span>{" "}
              reduce the total number of days. Choose wisely!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
