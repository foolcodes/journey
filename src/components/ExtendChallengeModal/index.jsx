import { useState } from "react";
import { X, Calendar, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ExtendChallengeModal = ({
  onClose,
  onSubmit,
  challengeTitle,
  showModalFalse,
}) => {
  const [additionalDays, setAdditionalDays] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    if (additionalDays > 0) {
      onSubmit(additionalDays);
      setShowConfirmation(true);
    }
  };

  const handleDaysChange = (e) => {
    const value = parseInt(e.target.value);
    setAdditionalDays(isNaN(value) ? 0 : Math.max(0, value));
  };

  // Predefined day options for quick selection
  const dayOptions = [7, 14, 30, 60];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {!showConfirmation ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-indigo-500" />
                  <h2 className="text-xl font-bold text-white">
                    Extend Challenge
                  </h2>
                </div>
                <button
                  onClick={showModalFalse}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-300 mb-2">
                  {challengeTitle || "Current Challenge"}
                </h3>
                <p className="text-gray-400 text-sm">
                  Would you like to extend this challenge? Add more days to
                  continue your progress.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">
                  Select additional days:
                </label>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  {dayOptions.map((days) => (
                    <button
                      key={days}
                      onClick={() => setAdditionalDays(days)}
                      className={`py-2 rounded-lg text-center transition-colors ${
                        additionalDays === days
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {days} days
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
                  <input
                    type="number"
                    min="1"
                    value={additionalDays || ""}
                    onChange={handleDaysChange}
                    placeholder="Custom days"
                    className="bg-gray-700 text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-gray-300 whitespace-nowrap">days</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={additionalDays <= 0}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    additionalDays > 0
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  } transition-colors`}
                >
                  <PlusCircle size={18} className="mr-2" />
                  Extend Challenge
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Challenge Extended!
              </h2>
              <p className="text-gray-400 mb-6">
                You've successfully extended your challenge by {additionalDays}{" "}
                days.
              </p>
              <button
                onClick={showModalFalse}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExtendChallengeModal;
