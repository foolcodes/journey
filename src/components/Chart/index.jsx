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

const Chart = ({ data, presentDay }) => {
  const day = `Day ${presentDay}`;

  const formattedData = data.map((eachItem) => ({
    ...eachItem,
    day: `Day ${eachItem.day}`,
  }));

  return (
    <div className="bg-[#111827] ps-0 p-5  rounded-md">
      <div className="flex justify-between">
        <h1 className="text-gray-50 text-xl ps-14 pb-10">Performance</h1>
        <h1 className="text-gray-50 text-xl ps-14 pb-10 pe-10">{day}</h1>
      </div>
      <div style={{ width: "100%", height: "38vh" }}>
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
      </div>
    </div>
  );
};

export default Chart;
