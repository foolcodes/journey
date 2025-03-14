import { useState } from "react";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { useChallengeStore } from "../../store/challengesStore";

const STATUS_COLOR = {
  active: "bg-[#FFBF00]",
  completed: "bg-green",
  abandoned: "bg-red",
};

const ChallengeCard = ({
  challengeDetails,
  getChallengeId,
  showChallengeDataModal,
}) => {
  const { title, status, challengeId } = challengeDetails;
  const [isHovered, setIsHovered] = useState(false);

  const onClickDeleteChallenge = () => {
    getChallengeId(challengeId);
  };

  const showChallengeData = () => {
    showChallengeDataModal(challengeId);
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={showChallengeData}
      className="cursor-pointer relative bg-[#111827] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 m-3 max-h-32"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6 pe-1">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-100">{title} </h1>
          {isHovered && (
            <motion.button
              whileHover={{ scale: 1.2 }}
              className="text-red-800 cursor-pointer"
              onClick={onClickDeleteChallenge}
            >
              <Trash size={20} />
            </motion.button>
          )}
        </div>
        <div className="flex items-center text-sm font-medium mt-1">
          <span
            className={`${STATUS_COLOR[status]} align-middle rounded-2xl h-3 w-3 mr-2 mt-2`}
          ></span>
          <p className="mt-1 text-gray-400">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
