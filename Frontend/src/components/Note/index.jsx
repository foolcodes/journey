import { useState, useEffect } from "react";
import { useChallengeStore } from "../../store/challengesStore";

const Note = ({ achieve = "", setAimData }) => {
  const { updateNote } = useChallengeStore();

  const [data, setData] = useState(achieve);
  useEffect(() => {
    setData(achieve);
  }, [achieve]);

  const onChangeSetData = (event) => {
    setData(event.target.value);
  };

  const onClickUpdateAim = async () => {
    await updateNote(data);
    setAimData(data);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-6 w-full h-full flex flex-col">
      <h1 className="gradient-text text-xl md:text-2xl mb-3 font-semibold">
        Aim of the Challenge
      </h1>
      <textarea
        placeholder="-> Be consistent

-> Work for 5 hours every day

-> Track your progress
"
        onChange={onChangeSetData}
        value={data}
        className="overflow-y-scroll custom-scrollbar flex-1 border-none focus:outline-none p-3 pr-10 bg-gray-800 w-full text-white rounded text-sm resize-none mb-5"
      />
      <button
        onClick={onClickUpdateAim}
        className="text-white cursor-pointer bg-indigo-600 px-4 py-2 rounded-xl font-medium w-full sm:w-auto"
      >
        Save
      </button>
    </div>
  );
};

export default Note;
