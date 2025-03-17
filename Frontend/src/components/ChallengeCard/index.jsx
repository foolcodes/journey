import { useState } from "react";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";

const STATUS_COLOR = {
  active: "bg-[#FFBF00]",
  completed: "bg-green-500",
  abandoned: "bg-red-500",
};

const ChallengeCard = ({
  challengeDetails,
  getChallengeId,
  showChallengeDataModal,
}) => {
  const { title, status, challengeId } = challengeDetails;
  const [isHovered, setIsHovered] = useState(false);

  const onClickDeleteChallenge = (e) => {
    e.stopPropagation();
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
      className="cursor-pointer relative bg-[#111827] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 w-full"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="px-4 py-4 md:p-5 pe-1">
        <div className="flex justify-between items-start gap-2">
          <h1 className="text-lg md:text-xl font-semibold text-gray-100 leading-tight flex-1 break-words">
            {title}
          </h1>
          {/* Delete button logic fixed */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            className={`
              text-red-800 cursor-pointer
              ${isHovered ? "md:block" : "md:hidden"} 
              block
            `}
            onClick={onClickDeleteChallenge}
          >
            <Trash size={18} />
          </motion.button>
        </div>
        <div className="flex items-center text-sm font-medium mt-2">
          <span
            className={`${STATUS_COLOR[status]} rounded-full h-3 w-3 mr-2`}
          ></span>
          <p className="text-gray-400 capitalize">{status}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
