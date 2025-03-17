import { motion } from "framer-motion";

const StatisticsCard = ({ itemDetails, border = false }) => {
  const { title, value, color } = itemDetails;

  const classname = border
    ? "bg-[#111827] bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-solid border-gray-500"
    : "bg-[#111827] bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl";

  return (
    <motion.div
      className={classname}
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-400">
          <span
            style={{
              backgroundColor: color,
              borderRadius: "1rem",
              height: "12px",
              width: "12px",
              display: "inline-block",
              marginRight: "0.5rem",
            }}
          ></span>
          {title}
        </span>
        <p className="mt-1 text-2xl font-semibold text-gray-100">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatisticsCard;
