import ChallengeCard from "../ChallengeCard";
import Sidebar from "../Sidebar";

const Main = () => {
  const challenges = [
    { title: "100 Days Challenge", status: "In Progress", id: 1 },
  ];
  return (
    <div className="w-full h-screen bg-[#080C18] font-semibold p-10 pt-4">
      <h1 className="text-white text-3xl">Challenges</h1>
      <div className="bg-gray-900 min-h-[70vh] max-h-[70vh]  w-[70vw] mt-8 p-6 rounded-xl grid grid-cols-3 items-center overflow-y-scroll custom-scrollbar">
        {challenges.map((eachItem) => (
          <ChallengeCard challengeDetails={eachItem} key={eachItem.id} />
        ))}
      </div>
    </div>
  );
};

export default Main;
