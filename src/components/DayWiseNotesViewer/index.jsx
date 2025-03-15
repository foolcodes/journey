import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";

const DayWiseNotesViewer = ({ onClose, data }) => {
  const [dayNotes, setDayNotes] = useState([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeLoad = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(fakeLoad);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setDayNotes(data);
    } else {
      setLoading(false);
    }
  }, [data]);

  const handlePrevious = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentDayIndex < dayNotes.length - 1) {
      setCurrentDayIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Render loading skeleton
  if (loading) {
    return (
      <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <Skeleton
              height={20}
              width={150}
              baseColor="#374151"
              highlightColor="#4B5563"
            />
            <Skeleton
              height={28}
              width={28}
              circle
              baseColor="#374151"
              highlightColor="#4B5563"
            />
          </div>
          <div className="bg-gray-900 rounded-lg p-4 mb-4 min-h-[150px]">
            <Skeleton
              height={20}
              count={5}
              className="mb-2"
              baseColor="#374151"
              highlightColor="#4B5563"
            />
          </div>
          <div className="flex">
            <Skeleton
              height={28}
              width={80}
              baseColor="#374151"
              highlightColor="#4B5563"
              className="mr-4"
            />
            <Skeleton
              height={28}
              width={80}
              baseColor="#374151"
              highlightColor="#4B5563"
            />
          </div>
        </div>
      </div>
    );
  }

  // Render empty state
  if (!loading && (!dayNotes || dayNotes.length === 0)) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Day-wise Notes</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X size={20} color="white" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <Calendar size={48} className="text-gray-500 mb-4" />
            <p className="text-gray-300 text-center">
              No daily notes available for this challenge yet.
            </p>
            <p className="text-gray-400 text-sm text-center mt-2">
              Notes will appear here as you progress through your challenge
              days.
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Safety check to ensure we have valid data
  if (!dayNotes || currentDayIndex >= dayNotes.length) {
    return null;
  }

  const currentDay = dayNotes[currentDayIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-white">
                Day {currentDay.day}
              </h3>
              <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                {currentDayIndex + 1} of {dayNotes.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X size={20} color="white" />
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 mb-4 min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar">
            <div className="text-gray-200 whitespace-pre-wrap">
              {currentDay?.notes || "No notes for this day."}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentDayIndex === 0 || loading}
                className={`p-2 rounded-md flex items-center gap-1 hover:bg-gray-700 transition-colors ${
                  currentDayIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ChevronLeft size={16} color="white" />
                <span className="text-white">Previous</span>
              </button>
              <button
                onClick={handleNext}
                disabled={currentDayIndex === dayNotes.length - 1 || loading}
                className={`p-2 rounded-md flex items-center gap-1 hover:bg-gray-700 transition-colors ${
                  currentDayIndex === dayNotes.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <span className="text-white">Next</span>
                <ChevronRight size={16} color="white" />
              </button>
            </div>
          </div>

          {currentDay && currentDay.completedAt && (
            <div className="mt-4 p-2 bg-gray-900 rounded-lg text-gray-400 text-sm flex items-center gap-2">
              <Calendar size={14} />
              <span>
                Completed on:{" "}
                {new Date(currentDay.completedAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DayWiseNotesViewer;
