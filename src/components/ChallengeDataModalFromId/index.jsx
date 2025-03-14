import { X } from "lucide-react";
import Chart from "../Chart";
import StatisticsCard from "../StatisticsCard";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChallengeDataModalFromId = ({ data, onClose }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fakeLoad = setTimeout(() => setLoading(false), 2000); // Simulate loading delay
    return () => clearTimeout(fakeLoad);
  }, []);

  const hours = data.reduce((sum, eachItem) => sum + eachItem.hours, 0);
  const itemDetails = {
    title: "Total Hours",
    value: hours,
    color: "green",
  };

  // Calculate average hours per day
  const avgHours = data.length > 0 ? (hours / data.length).toFixed(1) : 0;
  const avgItemDetails = {
    title: "Avg Hours/Day",
    value: avgHours,
    color: "blue",
  };

  // Get the max hours in a day
  const maxHours =
    data.length > 0 ? Math.max(...data.map((item) => item.hours)) : 0;
  const maxItemDetails = {
    title: "Max Hours/Day",
    value: maxHours,
    color: "purple",
  };

  // Skeleton loaders
  const StatisticsCardSkeleton = () => (
    <div className="flex gap-4 w-full justify-center flex-wrap">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-gray-800 rounded-xl p-4 min-w-[200px] flex-1"
        >
          <Skeleton
            height={20}
            width="60%"
            className="mb-2"
            baseColor="#374151"
            highlightColor="#4B5563"
          />
          <Skeleton
            height={36}
            width="40%"
            baseColor="#374151"
            highlightColor="#4B5563"
          />
        </div>
      ))}
    </div>
  );

  const ChartSkeleton = () => (
    <div className="bg-gray-800 rounded-xl p-6 w-full">
      <Skeleton
        height={30}
        width="30%"
        className="mb-6"
        baseColor="#374151"
        highlightColor="#4B5563"
      />
      <Skeleton
        height={300}
        className="w-full"
        baseColor="#374151"
        highlightColor="#4B5563"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-4xl rounded-2xl bg-gray-900 p-4 md:p-8 shadow-xl animate-fadeIn">
          <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
            <h1 className="text-gray-50 text-xl md:text-2xl font-bold">
              CHALLENGE OVERVIEW
            </h1>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <X size={24} color="white" />
            </button>
          </div>

          {/* Stats Cards */}
          <div className="mb-8">
            <h2 className="text-gray-300 text-lg mb-4 font-medium">
              Statistics
            </h2>
            {isLoading ? (
              <StatisticsCardSkeleton />
            ) : (
              <div className="grid grid-cols-3 gap-8 justify-center md:justify-between">
                <StatisticsCard itemDetails={itemDetails} border={true} />
                <StatisticsCard itemDetails={avgItemDetails} border={true} />
                <StatisticsCard itemDetails={maxItemDetails} border={true} />
              </div>
            )}
          </div>

          {/* Chart section */}
          <div className="mb-4">
            <h2 className="text-gray-300 text-lg mb-4 font-medium">
              Progress Chart
            </h2>
            {isLoading ? (
              <ChartSkeleton />
            ) : (
              <div className="bg-gray-800 rounded-xl p-4 md:p-6">
                <Chart data={data} presentDay={null} border={true} />
              </div>
            )}
          </div>

          {/* Summary text */}
          {!isLoading && (
            <div className="mt-6 bg-gray-800 rounded-xl p-4 md:p-6">
              <h2 className="text-gray-300 text-lg mb-3 font-medium">
                Summary
              </h2>
              <p className="text-gray-400">
                You've completed {data.length} days with a total of {hours}{" "}
                hours of coding. Your daily average is {avgHours} hours, with
                your most productive day being {maxHours} hours. Keep up the
                good work!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDataModalFromId;
