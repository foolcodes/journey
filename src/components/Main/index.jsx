import ChallengeCard from "../ChallengeCard";
import Note from "../Note";

const Main = () => {
  const challenges = [
    { title: "100 Days Challenge", status: "In Progress", id: 1 },
  ];
  return (
    <div className="w-full h-screen bg-[#080C18] font-semibold p-10 pt-4">
      <h1 data-aos="fade-down" className="text-white text-3xl">
        Challenges
      </h1>
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
    </div>
  );
};

export default Main;
