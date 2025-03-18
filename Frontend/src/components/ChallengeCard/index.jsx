import { useState } from "react";
import { motion } from "framer-motion";
import { Trash, Clock, Check, XCircle, X, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useOverviewStore } from "../../store/overviewStore";
import { AnimatePresence } from "framer-motion";

const STATUS_COLOR = {
  active: "bg-[#FFBF00]",
  completed: "bg-green-500",
  abandoned: "bg-red-500",
};

const STATUS_ICON = {
  active: <Clock size={14} className="text-[#FFBF00]" />,
  completed: <Check size={14} className="text-green-500" />,
  abandoned: <XCircle size={14} className="text-red-500" />,
};

const ChallengeCard = ({
  challengeDetails,
  getChallengeId,
  showChallengeDataModal,
}) => {
  const { title, status, challengeId } = challengeDetails;
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const { changeChallengeStatus } = useOverviewStore();
  const [showAbandonModal, setShowAbandonModal] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClickDeleteChallenge = (e) => {
    e.stopPropagation();
    getChallengeId(challengeId);
  };

  const openAbandonModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowAbandonModal(true);
  };

  const handleAbandonConfirm = async () => {
    setIsSubmitting(true);
    try {
      await changeChallengeStatus("abandoned", challengeId);
      toast.success("Challenge abandoned successfully!");
      setShowAbandonModal(false);
    } catch (error) {
      toast.error("Failed to abandon challenge");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showChallengeData = () => {
    if (!showAbandonModal) {
      showChallengeDataModal(challengeId);
    }
  };

  // Handle click outside modal
  const handleModalBackdropClick = (e) => {
    e.stopPropagation();
    setShowAbandonModal(false);
  };

  // Handle modal content click
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <motion.div
        onMouseEnter={() => {
          setIsHovered(true);
          setShowActions(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowActions(false);
        }}
        onClick={showChallengeData}
        className="cursor-pointer relative bg-[#111827] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 w-full overflow-hidden"
        whileHover={{
          y: -5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Status indicator line at top */}
        <div className={`h-1 w-full ${STATUS_COLOR[status]}`} />

        <div className="px-4 py-4 md:p-5">
          <div className="flex justify-between items-start gap-2">
            <h1 className="text-lg md:text-xl font-semibold text-gray-100 leading-tight flex-1 break-words">
              {title}
            </h1>

            {/* Action buttons */}
            <div className="flex items-center space-x-1">
              {status === "active" && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: showActions ? 1 : 0,
                    scale: showActions ? 1 : 0.8,
                    x: showActions ? 0 : 10,
                  }}
                  className="text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-red-900 hover:bg-opacity-20"
                  onClick={openAbandonModal}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <XCircle size={18} />
                </motion.button>
              )}

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: showActions ? 1 : 0,
                  scale: showActions ? 1 : 0.8,
                }}
                className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-900 hover:bg-opacity-20"
                onClick={onClickDeleteChallenge}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Trash size={18} />
              </motion.button>
            </div>
          </div>

          <div className="flex items-center text-sm font-medium mt-3">
            <div className="flex items-center bg-gray-800 bg-opacity-50 px-2 py-1 rounded-full">
              {STATUS_ICON[status]}
              <p className="text-gray-300 capitalize ml-1">{status}</p>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        {status === "active" && (
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[#FFBF00]"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>

      {/* Abandon challenge modal - moved outside the card component */}
      <AnimatePresence>
        {showAbandonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
              onClick={handleModalBackdropClick}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-[#111827] border border-gray-700 rounded-xl shadow-2xl w-full max-w-md overflow-hidden z-50"
              onClick={handleModalContentClick}
            >
              {/* Status indicator line at top */}
              <div className="h-1 w-full bg-red-500" />

              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-red-500" size={20} />
                  <h2 className="text-lg font-semibold text-gray-100">
                    Abandon Challenge
                  </h2>
                </div>
                <button
                  onClick={() => setShowAbandonModal(false)}
                  className="text-gray-400 hover:text-gray-200 p-1 rounded-full hover:bg-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="mb-5">
                  <p className="text-gray-300 mb-2">
                    Are you sure you want to abandon:
                  </p>
                  <p className="text-gray-100 font-semibold text-lg">
                    "{title}"
                  </p>
                </div>

                <div className="mb-5">
                  <label className="block text-gray-300 mb-2 text-sm">
                    Tell us why you're abandoning this challenge (optional):
                  </label>
                  <textarea
                    className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    rows="3"
                    placeholder="What obstacles did you face?"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <p className="text-gray-400 text-sm mb-5">
                  <XCircle className="inline mr-1" size={14} />
                  This action cannot be undone. The challenge will be marked as
                  abandoned.
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={() => setShowAbandonModal(false)}
                    className="px-4 py-2 bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleAbandonConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg transition flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} />
                        <span>Abandon Challenge</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChallengeCard;
