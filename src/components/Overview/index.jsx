import { useEffect, useState } from "react";
import Chart from "../Chart";
import StatisticsCard from "../StatisticsCard";
import DayModal from "../DayModal";
import ShinyButton from "../ShinyButton/ShinyButton";
import { useOverviewStore } from "../../store/overviewStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
    { title: "Month", value: `${monthlyHours || 0} Hours`, color: "#6366F1" },
    { title: "Week", value: `${weeklyHours || 0} Hours`, color: "#10B981" },
    { title: "Day", value: `${dailyHours || 0} Hours`, color: "#EC4899" },
    { title: "Total", value: `${totalHours || 0} Hours`, color: "#FFBF00" },
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
      <div className="flex justify-between items-center mb-8">
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

      {/* Statistics Cards section */}
      <div className="grid grid-cols-4 gap-8 mb-8">
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <div key={index} className="bg-[#111827] rounded-xl p-4">
                <Skeleton
                  height={20}
                  width={60}
                  baseColor="#374151"
                  highlightColor="#4B5563"
                  className="mb-2"
                />
                <Skeleton
                  height={30}
                  width={100}
                  baseColor="#374151"
                  highlightColor="#4B5563"
                />
              </div>
            ))
          : details.map((eachItem, index) => (
              <StatisticsCard key={index} itemDetails={eachItem} />
            ))}
      </div>

      {/* Chart section */}
      <div className={`${isLoading ? "relative" : ""}`}>
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-[#111827] rounded-xl p-6"></div>
        )}
        <div className={isLoading ? "invisible" : "visible"}>
          <Chart
            data={challengeData}
            presentDay={presentDay}
            isLoading={isLoading}
          />
        </div>
      </div>

      {modal && (
        <DayModal presentDay={presentDay} onClose={() => toggleModal(false)} />
      )}
    </div>
  );
};

export default Overview;
