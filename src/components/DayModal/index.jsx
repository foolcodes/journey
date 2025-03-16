import { useRef, useState } from "react";
import { X, Hourglass, Loader } from "lucide-react";
import { useOverviewStore } from "../../store/overviewStore";
import toast from "react-hot-toast";

const DayModal = ({ onClose, onAddDailyData, presentDay }) => {
  const [topics, onSetTopics] = useState("");
  const [hours, onSetHours] = useState("");
  const { addDay, isLoading, error } = useOverviewStore();

  const onSubmitAddDay = async (event) => {
    event.preventDefault();
    await addDay(presentDay, hours, topics);
    if (useOverviewStore.getState().error) {
      toast.error(useOverviewStore.getState().error);
    } else {
      onClose();
      toast.success("Data updated successfully, please reload the page!");
    }
  };

  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      data-aos="fade-up"
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="flex flex-col w-full max-w-md">
        <button
          onClick={onClose}
          className="place-self-end cursor-pointer mb-2 bg-black/20 hover:bg-black/40 rounded-full p-1 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} color="white" />
        </button>

        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-5 sm:p-6 text-white rounded-xl w-full shadow-xl shadow-indigo-900/30 border border-indigo-500/20">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-7 text-center">
            New Day, Same Goal!
          </h1>

          <div className="flex items-center justify-center mb-5">
            <div className="bg-indigo-700/50 backdrop-blur-sm px-4 py-2 rounded-full text-center">
              <h2 className="text-lg sm:text-xl font-medium">
                Day {presentDay}
              </h2>
            </div>
          </div>

          <form
            className="flex flex-col items-center"
            onSubmit={onSubmitAddDay}
          >
            <div className="relative w-full mb-5 flex justify-center items-center">
              <input
                onChange={(e) => onSetHours(e.target.value)}
                type="number"
                placeholder="Hours?"
                max="24"
                min="1"
                className="border-none focus:outline-none focus:ring-2 focus:ring-white/30 p-3 pr-10 h-11 bg-white/95 w-full text-black rounded-lg text-sm transition-all"
              />
              <Hourglass
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={19}
              />
            </div>

            <textarea
              onChange={(e) => onSetTopics(e.target.value)}
              placeholder="We suggest you to write in this format. What did you learn? what hurdles did you face, and how did you overcome them?"
              className="border-none focus:outline-none focus:ring-2 focus:ring-white/30 p-3 pr-10 bg-white/95 w-full text-black rounded-lg text-sm resize-none h-24 sm:h-32 mb-5 overflow-y-auto"
            />

            <button
              type="submit"
              className="text-white cursor-pointer bg-black hover:bg-gray-900 rounded-lg w-full sm:w-auto px-6 py-3 font-medium transition-all duration-300 focus:ring-2 focus:ring-white/30 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-5 h-5 mx-auto animate-spin" />
              ) : (
                "Add Entry"
              )}
            </button>

            {error && (
              <p className="text-red-300 text-center font-medium text-sm mt-3 bg-red-500/20 rounded-lg p-2 w-full">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DayModal;
