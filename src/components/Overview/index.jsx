import { useState } from "react";

import Chart from "../Chart";
import StatisticsCard from "../StatisticsCard";
import DayModal from "../DayModal";
import ShinyButton from "../ShinnyButton/ShinyButton";

const details = [
  { title: "Month", value: "70 Hours", color: "#6366F1" },
  { title: "Week", value: "24 Hours", color: "#10B981" },
  { title: "Day", value: "5 Hours", color: "#EC4899" },
  { title: "Total", value: "99 Hours", color: "#FFBF00" },
];

const Overview = () => {
  const [modal, toggleModal] = useState(false);
  return (
    <div className="w-full h-screen bg-[#080C18] overflow-auto p-10 pt-5">
      <div
        data-aos="fade-down"
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-gray-50 text-2xl">OVERVIEW</h1>
        <div className="flex">
          <button
            onClick={() => toggleModal(true)}
            className="text-gray-200 hover:text-white transition duration-300 cursor-pointer bg-indigo-600 rounded-xl w-17 px-4 py-2 mr-3 font-medium"
          >
            Add
          </button>
          <ShinyButton title={"Share"} />
        </div>
      </div>
      <div data-aos="fade-down" className="grid grid-cols-4 gap-8 mb-8">
        {details.map((eachItem, index) => (
          <StatisticsCard key={index} itemDetails={eachItem} />
        ))}
      </div>
      <Chart />
      {modal && <DayModal onClose={() => toggleModal(false)} />}
    </div>
  );
};

export default Overview;
