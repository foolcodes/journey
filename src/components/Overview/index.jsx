import { useEffect, useState } from "react";

import Chart from "../Chart";
import StatisticsCard from "../StatisticsCard";
import DayModal from "../DayModal";
import ShinyButton from "../ShinyButton/ShinyButton";
import { useOverviewStore } from "../../store/overviewStore";

const Overview = () => {
  const [modal, toggleModal] = useState(false);
  const [presentDay, setPresentDay] = useState(null);

  const {
    getCurrentDay,
    getChallengeData,
    isLoading,
    challengeData,
    monthlyHours,
    weeklyHours,
    totalHours,
    dailyHours,
  } = useOverviewStore();

  const details = [
    { title: "Month", value: `${monthlyHours} Hours`, color: "#6366F1" },
    { title: "Week", value: `${weeklyHours} Hours`, color: "#10B981" },
    { title: "Day", value: `${dailyHours} Hours`, color: "#EC4899" },
    { title: "Total", value: `${totalHours} Hours`, color: "#FFBF00" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = Date.now();
      const presentDay = await getCurrentDay(currentDate);
      await getChallengeData();
      setPresentDay(presentDay);
    };
    fetchData();
  }, []);

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
      <Chart data={challengeData} presentDay={presentDay} />
      {modal && (
        <DayModal presentDay={presentDay} onClose={() => toggleModal(false)} />
      )}
    </div>
  );
};

export default Overview;
