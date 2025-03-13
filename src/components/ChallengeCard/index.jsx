import { useState } from "react";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { useChallengeStore } from "../../store/challengesStore";
import toast from "react-hot-toast";

const ChallengeCard = ({ challengeDetails, getChallengeId }) => {
  const { title, status, challengeId } = challengeDetails;
  const [isHovered, setIsHovered] = useState(false);

  const { deleteChallenge, isLoading, error } = useChallengeStore();

  const onClickDelteChallenge = () => {
    getChallengeId(challengeId);
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
              onClick={onClickDelteChallenge}
            >
              <Trash size={20} />
            </motion.button>
          )}
        </div>
        <div className="flex items-center text-sm font-medium">
          <span className="bg-[#FFBF00] rounded-2xl h-3 w-3 mr-2 mt-2"></span>
          <p className="mt-1 text-gray-400">{status}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
