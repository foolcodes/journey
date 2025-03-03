import Chart from "../Chart";
import StatisticsCard from "../StatisticsCard";

const details = [
  { title: "Month", value: "70 Hours", color: "#6366F1" },
  { title: "Week", value: "24 Hours", color: "#10B981" },
  { title: "Day", value: "5 Hours", color: "#EC4899" },
];

const Overview = () => {
  return (
    <div className="h-screen bg-[#080C18] overflow-auto p-10 pt-5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-gray-50 text-2xl">OVERVIEW</h1>
        <button className="text-white cursor-pointer bg-indigo-600 rounded-xl w-17 px-4 py-2 font-medium">
          Add
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        {details.map((eachItem, index) => (
          <StatisticsCard key={index} itemDetails={eachItem} />
        ))}
      </div>
      <Chart />
    </div>
  );
};

export default Overview;
