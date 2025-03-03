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

const DAILYDATA = [
  { day: "Day1", hours: 7 },
  { day: "Day2", hours: 5 },
  { day: "Day3", hours: 8 },
  { day: "Day4", hours: 3 },
  { day: "Day5", hours: 5 },
  { day: "Day6", hours: 7 },
  { day: "Day7", hours: 4 },
  { day: "Day8", hours: 6 },
  { day: "Day9", hours: 3 },
  { day: "Day10", hours: 8 },
  { day: "Day11", hours: 6 },
  { day: "Day12", hours: 5 },
];

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

const Chart = () => {
  return (
    <div className="bg-[#111827] ps-0 p-5 border border-gray-700 rounded-md">
      <h1 className="text-gray-50 text-xl ps-14 pb-10">Performance</h1>
      <div style={{ width: "100%", height: "250px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={DAILYDATA}>
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
      </div>
    </div>
  );
};

export default Chart;
