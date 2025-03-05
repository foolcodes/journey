import { useState } from "react";

import ChallengeCard from "../ChallengeCard";
import Note from "../Note";
import ChallengeModal from "../ChallengeModal";

const Challenges = () => {
  const [challengeModal, toggleChalengeModal] = useState(false);

  const challenges = [
    { title: "100 Days Challenge", status: "In Progress", id: 1 },
  ];
  return (
    <div className="w-full h-screen bg-[#080C18] font-semibold p-10 pt-4">
      <div className="flex justify-between">
        <h1 data-aos="fade-down" className="text-white text-3xl">
          Challenges
        </h1>
        <button
          onClick={() => toggleChalengeModal(true)}
          className="text-gray-200 hover:text-white transition duration-300 cursor-pointer bg-indigo-600 rounded-xl w-17 px-4 py-2 font-medium"
        >
          Add
        </button>
      </div>
      <div className="flex mt-8">
        <div
          data-aos="fade-right"
          className="bg-gray-900 border mr-7 border-gray-700 min-h-[70vh] max-h-[70vh] w-[65vw] p-6 rounded-xl grid grid-cols-3 items-center overflow-y-scroll custom-scrollbar"
        >
          {challenges.map((eachItem) => (
            <ChallengeCard challengeDetails={eachItem} key={eachItem.id} />
          ))}
        </div>
        <Note />
      </div>
      {challengeModal && (
        <ChallengeModal
          onCloseChallengeModal={() => toggleChalengeModal(false)}
        />
      )}
    </div>
  );
};

export default Challenges;
