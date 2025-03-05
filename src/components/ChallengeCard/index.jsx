import { motion } from "framer-motion";

const ChallengeCard = ({ challengeDetails }) => {
  const { title, status } = challengeDetails;
  return (
    <motion.div
      className="relative bg-[#111827] bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 m-3 max-h-32"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6">
        <h1 className="text-2xl font-semibold text-gray-100">{title} </h1>
        <div className="flex items-center text-sm font-medium">
          <span className="bg-[#FFBF00] rounded-2xl h-3 w-3 mr-2 mt-2"></span>
          <p className="mt-1 text-gray-400">{status}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
