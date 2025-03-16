import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Area,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgba(31,41,55,0.8)] border border-[#4B5563] p-2 rounded shadow w-25">
        <p className="text-[#E5E7EB]">{`${label}`}</p>
        <p className="text-[#E5E7EB]">{`Hours: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Chart = ({ data, presentDay, border = false }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeLoad = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(fakeLoad);
  }, []);

  const formattedData = data.map((eachItem) => ({
    ...eachItem,
    day: `Day ${eachItem.day}`,
  }));

  const classname = border
    ? "bg-[#111827] p-4 sm:p-6 rounded-md border border-solid border-gray-600"
    : "bg-[#111827] p-4 sm:p-6 rounded-md";

  return (
    <SkeletonTheme baseColor="#374151" highlightColor="#4B5563">
      <div className={classname}>
        {/* Header */}
        <div className="flex justify-between flex-wrap gap-2">
          <h1 className="text-gray-50 text-lg sm:text-xl ps-2 sm:ps-6 pb-6 sm:pb-10">
            {loading ? <Skeleton width={120} height={24} /> : "Performance"}
          </h1>
          {presentDay && (
            <h1 className="text-gray-50 text-lg sm:text-xl pe-2 sm:pe-6 pb-6 sm:pb-10">
              {loading ? (
                <Skeleton width={80} height={24} />
              ) : (
                `Day ${presentDay}`
              )}
            </h1>
          )}
        </div>

        {/* Chart Section */}
        <div className="w-full h-[30vh] sm:h-[31vh] lg:h-[31vh]">
          {loading ? (
            <Skeleton height={"100%"} width={"100%"} />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData}>
                <CartesianGrid
                  vertical={true}
                  horizontal={false}
                  stroke="#6366F1"
                  strokeOpacity={0.3}
                />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="hours"
                  fill="#6366F1"
                  fillOpacity={0.1}
                  stroke="none"
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Chart;
