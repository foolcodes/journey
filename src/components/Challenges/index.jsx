import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import ChallengeCard from "../ChallengeCard";
import Note from "../Note";
import ChallengeModal from "../ChallengeModal";
import { useChallengeStore } from "../../store/challengesStore";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import ChallengeDataModalFromId from "../ChallengeDataModalFromId";

const Challenges = () => {
  const [data, setData] = useState([]);
  const [aimData, setAim] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDelteModal, setDeleteModal] = useState(false);
  const [deleteChallengeId, setDeleteChallengeId] = useState("");
  const [challengeModal, toggleChalengeModal] = useState(false);
  const [showChallengeDataModalFromId, setShowChallengeDataModalFromId] =
    useState(false);
  const [challengeDataFromId, setChallengeDataFromId] = useState("");

  const {
    getChallenges,
    isLoading,
    error,
    getAim,
    deleteChallenge,
    getChallengeFromChallengeId,
  } = useChallengeStore();

  useEffect(() => {
    const fetchChallenges = async () => {
      console.log("Fetching challenges");
      try {
        setLoading(true);
        const response = await getChallenges();
        setTimeout(() => {
          if (response) {
            const formattedResponse = response.map((challenge) => ({
              challengeId: challenge._id,
              title: challenge.title + " Days of Code",
              status: challenge.status,
            }));
            setData(formattedResponse);
          }
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    const fetchAimData = async () => {
      try {
        setLoading(true);
        const fetchedAim = await getAim();
        setTimeout(() => {
          if (fetchedAim) {
            setAim(fetchedAim);
          }
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching aim:", error);
        setLoading(false);
      }
    };
    fetchAimData();
  }, [aimData]);

  const setAimData = (updatedAimData) => {
    setAim(updatedAimData);
    toast.success("Updated Successfully");
  };

  const ChallengeCardSkeleton = () => (
    <div className="bg-gray-800 rounded-lg p-4 m-2">
      <Skeleton
        height={24}
        width="80%"
        className="mb-2"
        baseColor="#374151"
        highlightColor="#4B5563"
      />
      <Skeleton
        height={16}
        width="60%"
        className="mb-4"
        baseColor="#374151"
        highlightColor="#4B5563"
      />
      <Skeleton
        height={32}
        width="40%"
        baseColor="#374151"
        highlightColor="#4B5563"
      />
    </div>
  );

  const NoteSkeleton = () => (
    <div className="bg-gray-900 rounded-xl p-6 w-full h-full">
      <Skeleton
        height={30}
        width="70%"
        className="mb-4"
        baseColor="#374151"
        highlightColor="#4B5563"
      />
      <Skeleton
        height={20}
        width="90%"
        className="mb-2"
        baseColor="#374151"
        highlightColor="#4B5563"
      />
      <Skeleton
        height={20}
        width="80%"
        className="mb-2"
        baseColor="#374151"
        highlightColor="#4B5563"
      />
      <Skeleton
        height={20}
        width="85%"
        className="mb-2"
        baseColor="#374151"
        highlightColor="#4B5563"
      />
      <Skeleton
        height={20}
        width="75%"
        className="mb-2"
        baseColor="#374151"
        highlightColor="#4B5563"
      />
    </div>
  );

  const getChallengeId = (challengeId) => {
    setDeleteChallengeId(challengeId);
    setDeleteModal(true);
  };

  const handleDeleteChallenge = async () => {
    const challengeId = deleteChallengeId;
    await deleteChallenge(challengeId);
    toast.success(
      "Challenge deleted successfully, please reload the page to see update!"
    );
    setDeleteModal(false);
  };

  const onClickShowChallengeDataModal = async (challengeId) => {
    setShowChallengeDataModalFromId(true);
    setLoading(true);

    try {
      const response = await getChallengeFromChallengeId(challengeId);
      if (response) {
        setChallengeDataFromId(response.data);
      }
    } catch (error) {
      console.error("Error fetching challenge data:", error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#080C18] p-4 md:p-6 lg:p-10 pt-4 overflow-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-0">
        <h1 className="text-gray-50 text-xl md:text-2xl mb-4 sm:mb-0">
          CHALLENGES
        </h1>
        <button
          onClick={() => toggleChalengeModal(true)}
          className="text-gray-200 hover:text-white transition duration-300 cursor-pointer bg-indigo-600 rounded-xl w-full sm:w-auto px-4 py-2 font-medium"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col lg:flex-row mt-4 lg:mt-8 gap-6">
        {/* Challenge Cards Container */}
        <div className="bg-gray-900 min-h-[50vh] lg:min-h-[70vh] w-full lg:w-2/3 p-4 md:p-6 rounded-xl overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading || isLoading ? (
              Array(6)
                .fill()
                .map((_, index) => (
                  <ChallengeCardSkeleton key={`skeleton-${index}`} />
                ))
            ) : data.length === 0 ? (
              <h1 className="text-xl text-gray-200 font-semibold col-span-full">
                No challenges found. Create your first challenge!
              </h1>
            ) : (
              data.map((eachItem) => (
                <ChallengeCard
                  challengeDetails={eachItem}
                  key={eachItem.challengeId}
                  getChallengeId={getChallengeId}
                  showChallengeDataModal={onClickShowChallengeDataModal}
                />
              ))
            )}
          </div>
        </div>

        {/* Note Component */}
        <div className="w-full lg:w-1/3 h-[50vh] lg:h-auto">
          {loading || isLoading ? (
            <NoteSkeleton />
          ) : (
            <Note achieve={aimData} setAimData={setAimData} />
          )}
        </div>
      </div>

      {challengeModal && (
        <ChallengeModal
          onCloseChallengeModal={() => toggleChalengeModal(false)}
        />
      )}

      {/* Delete challenge modal */}
      <AnimatePresence>
        {showDelteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-4 md:p-6 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  Delete
                </h3>
                <button
                  onClick={() => setDeleteModal(false)}
                  className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <X size={20} color="white" />
                </button>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete the Challenge?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="px-3 py-1 md:px-4 md:py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteChallenge}
                  className="px-3 py-1 md:px-4 md:py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                {error && (
                  <p className="text-red-500 text-sm font-semibold mb-3">
                    {error}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Challenge data modal */}
      {showChallengeDataModalFromId && !loading && challengeDataFromId && (
        <ChallengeDataModalFromId
          data={challengeDataFromId}
          onClose={() => setShowChallengeDataModalFromId(false)}
        />
      )}
    </div>
  );
};

export default Challenges;
