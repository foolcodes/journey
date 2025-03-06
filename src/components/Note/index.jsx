import { useState, useEffect } from "react";

const Note = ({ achieve = "" }) => {
  const [data, setData] = useState(achieve);
  useEffect(() => {
    setData(achieve);
  }, [achieve]);

  const onChangeSetData = (event) => {
    setData(event.target.value);
  };
  return (
    <div
      data-aos="fade-left"
      className="bg-gray-900 border border-gray-700 rounded-xl p-4 max-w-[22vw]"
    >
      <h1 className="gradient-text text-2xl mb-3">Aim of the Challenge</h1>
      <textarea
        placeholder="-> Be consistent

-> Work for 5 hours every day

-> Track your progress
"
        onChange={onChangeSetData}
        value={data}
        className="overflow-y-scroll custom-scrollbar h-[60%] border-none focus:outline-none p-3 pr-10 bg-gray-800 w-full text-white rounded text-sm resize-none mb-7"
      />
      <button className="text-white cursor-pointer bg-indigo-600 p-2 rounded-xl w-23 font-medium button">
        Save
      </button>
    </div>
  );
};

export default Note;
