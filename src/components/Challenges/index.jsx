import { useEffect, useState } from "react";

import ChallengeCard from "../ChallengeCard";
import Note from "../Note";
import ChallengeModal from "../ChallengeModal";
import { useChallengeStore } from "../../store/challengesStore";

const Challenges = () => {
  const [data, setData] = useState([]);

  const { getChallenges, isLoading, error } = useChallengeStore();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await getChallenges();
        if (response) {
          const formattedResponse = response.map((challenge) => ({
            challengeId: challenge._id,
            title: challenge.title + " Days of Code",
            status: challenge.status,
          }));
          setData(formattedResponse);
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, [getChallenges]);

  const [challengeModal, toggleChalengeModal] = useState(false);
  const [aim, setAim] = useState("");
  const [challengesData, setChallenges] = useState([
    { title: "100 Days Challenge", status: "In Progress", id: 1 },
  ]);

  const onAddChallengesData = (challengeDays) => {
    challengeDays.title = challengeDays.title + " Days of Challenge";
    setChallenges([...challengesData, challengeDays]);
    setAim(challengeDays.achieve);
  };

  return (
    <div className="w-full h-screen bg-[#080C18] p-10 pt-4">
      <div className="flex justify-between">
        <h1 data-aos="fade-down" className="text-gray-50 text-2xl">
          CHALLENGES
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
          className="bg-gray-900 mr-7 max-h-[80vh] w-[65vw] p-6 rounded-xl grid grid-cols-3 items-center overflow-y-scroll custom-scrollbar"
        >
          {data.map((eachItem) => (
            <ChallengeCard
              challengeDetails={eachItem}
              key={eachItem.challengeId}
            />
          ))}
        </div>
        <Note achieve={aim} />
      </div>
      {challengeModal && (
        <ChallengeModal
          onAddChallengesData={onAddChallengesData}
          onCloseChallengeModal={() => toggleChalengeModal(false)}
        />
      )}
    </div>
  );
};

export default Challenges;
