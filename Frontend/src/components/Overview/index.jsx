import { useEffect, useState } from "react";
import Chart from "../Chart";
import StatisticsCard from "../StatisticsCard";
import DayModal from "../DayModal";
import ShinyButton from "../ShinyButton/ShinyButton";
import ShareModal from "../ShareModal";
import { useOverviewStore } from "../../store/overviewStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ExtendChallengeModal from "../ExtendChallengeModal";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import { Flame, Calendar, Trophy, ArrowUpRight } from "lucide-react";

const Overview = () => {
  const [modal, toggleModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExtendChallengeModal, setShowExtendChallengeModal] =
    useState(false);
  const [challengeId, setChallengeId] = useState(null);
  const [presentDay, setPresentDay] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [streak, setStreak] = useState({
    current: 0,
    longest: 0,
    lastUpdate: null,
    isActive: false,
  });

  const {
    getCurrentDay,
    getChallengeData,
    isLoading,
    challengeData,
    monthlyHours,
    weeklyHours,
    totalHours,
    dailyHours,
    updateTitle,
    changeChallengeStatus,
  } = useOverviewStore();

  const { user } = useAuthStore();

  // Calculate current streak based on challenge data
  const calculateStreak = (data) => {
    if (!data || data.length === 0)
      return { current: 0, longest: 0, lastUpdate: null, isActive: false };

    // Get current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentStreak = 0;
    let longestStreak = 0;
    let lastUpdate = null;

    // Find the latest entry date
    const latestEntry = data[data.length - 1];
    const latestEntryDate = new Date(latestEntry.createdAt);
    latestEntryDate.setHours(0, 0, 0, 0);

    // Check if the streak is still active (entry made today or yesterday)
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isActive =
      latestEntryDate.getTime() === today.getTime() ||
      latestEntryDate.getTime() === yesterday.getTime();

    // Calculate consecutive days
    let consecutiveDays = 1;
    for (let i = data.length - 1; i > 0; i--) {
      const currDate = new Date(data[i].createdAt);
      const prevDate = new Date(data[i - 1].createdAt);

      currDate.setHours(0, 0, 0, 0);
      prevDate.setHours(0, 0, 0, 0);

      // Check if entries are on consecutive days
      const diffTime = Math.abs(currDate - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        consecutiveDays++;
      } else {
        break;
      }
    }

    // If streak is not active, reset current streak
    currentStreak = isActive ? consecutiveDays : 0;

    // Calculate longest streak
    let tempStreak = 1;
    for (let i = 1; i < data.length; i++) {
      const currDate = new Date(data[i].createdAt);
      const prevDate = new Date(data[i - 1].createdAt);

      currDate.setHours(0, 0, 0, 0);
      prevDate.setHours(0, 0, 0, 0);

      const diffTime = Math.abs(currDate - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);
    lastUpdate = latestEntry.createdAt;

    return {
      current: currentStreak,
      longest: longestStreak,
      lastUpdate,
      isActive,
    };
  };

  // Enhanced details array with streak information
  const details = [
    {
      title: "Month",
      value: `${monthlyHours || 0} Hours`,
      color: "#6366F1",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Week",
      value: `${weeklyHours || 0} Hours`,
      color: "#10B981",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Day",
      value: `${dailyHours || 0} Hours`,
      color: "#EC4899",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Total",
      value: `${totalHours || 0} Hours`,
      color: "#FFBF00",
      icon: <Calendar className="h-5 w-5" />,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = Date.now();
      const data = await getCurrentDay(currentDate);
      const presentDay = data.presentDay;
      const challengeDuration = data.challengeDuration;
      const response = await getChallengeData();

      setChallengeId(response[0]?.challenge);
      const lastDay =
        response.length > 0 ? response[response.length - 1].day : null;

      // Calculate streak from challenge data
      const streakData = calculateStreak(response);
      setStreak(streakData);

      if (lastDay === Number(challengeDuration)) {
        setShowExtendChallengeModal(true);
      }
      setPresentDay(presentDay);

      setUserProfile({
        name: `${user.name}'s`,
        profilePicture: user.imageUrl
          ? user.imageUrl
          : "/api/placeholder/150/150",
      });
    };
    fetchData();
  }, []);

  const updateChallengeTitle = async (additionalDays) => {
    const response = await updateTitle(additionalDays, challengeId);
    toast.success(
      "Challenge extended successfully, please reload the page to see in action!"
    );
  };

  const challengeCompleted = async () => {
    setShowExtendChallengeModal(false);
    await changeChallengeStatus("completed", challengeId);
    toast.success("Wohooooo!! You did it, ready for a new challenge?");
  };

  const getMilestoneStatus = (currentStreak) => {
    const milestones = [
      { days: 7, label: "1 Week" },
      { days: 30, label: "1 Month" },
      { days: 50, label: "50 Days" },
      { days: 100, label: "100 Days" },
    ];

    const nextMilestone = milestones.find((m) => m.days > currentStreak);
    const lastMilestone = [...milestones]
      .reverse()
      .find((m) => m.days <= currentStreak);

    return {
      current: lastMilestone ? lastMilestone.label : "Just Started",
      next: nextMilestone ? nextMilestone.label : "Legend Status",
      progress: nextMilestone
        ? (currentStreak / nextMilestone.days) * 100
        : 100,
    };
  };

  const milestoneStatus = getMilestoneStatus(streak.current);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#080C18] to-[#111827] overflow-auto p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-gray-50 text-2xl">OVERVIEW</h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => toggleModal(true)}
            className="text-gray-200 hover:text-white transition duration-300 cursor-pointer bg-indigo-600 rounded-xl px-4 py-2 font-medium"
          >
            Add
          </button>
          <ShinyButton
            title={"Share"}
            onCLick={() => setShowShareModal(true)}
          />
        </div>
      </div>

      {/* Streak Dashboard */}
      <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-xl p-4 sm:p-6 mb-8 border border-indigo-500/20 backdrop-blur-sm">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div
              className={`mr-4 p-3 rounded-lg ${
                streak.isActive ? "bg-orange-500" : "bg-gray-700"
              } text-white`}
            >
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-gray-300 text-sm font-medium">
                CURRENT STREAK
              </h2>
              <div className="flex items-end">
                <span className="text-white text-3xl font-bold">
                  {streak.current}
                </span>
                <span className="text-gray-400 ml-1 mb-1">days</span>
                {streak.isActive && (
                  <span className="ml-2 text-xs font-medium text-green-400 bg-green-400/20 px-2 py-1 rounded-full">
                    ACTIVE
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center mb-4 sm:mb-0">
            <div className="mr-4 p-3 rounded-lg bg-purple-600 text-white">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-gray-300 text-sm font-medium">
                LONGEST STREAK
              </h2>
              <div className="flex items-end">
                <span className="text-white text-3xl font-bold">
                  {streak.longest}
                </span>
                <span className="text-gray-400 ml-1 mb-1">days</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center">
            <div className="mr-0 sm:mr-4 mb-4 sm:mb-0 w-full sm:w-auto">
              <h2 className="text-gray-300 text-sm font-medium mb-2">
                NEXT MILESTONE: {milestoneStatus.next}
              </h2>
              <div className="w-full sm:w-48 bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
                  style={{ width: `${milestoneStatus.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-center px-3 py-2 bg-gray-800 rounded-lg">
              <span className="text-gray-300 text-xs mr-2">Last coded:</span>
              <span className="text-white text-xs font-medium">
                {streak.lastUpdate
                  ? new Date(streak.lastUpdate).toLocaleDateString()
                  : "Never"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <div key={index} className="bg-[#111827] rounded-xl p-4">
                <Skeleton
                  height={20}
                  width={60}
                  baseColor="#374151"
                  highlightColor="#4B5563"
                  className="mb-2"
                />
                <Skeleton
                  height={30}
                  width={100}
                  baseColor="#374151"
                  highlightColor="#4B5563"
                />
              </div>
            ))
          : details.map((eachItem, index) => (
              <StatisticsCard key={index} itemDetails={eachItem} />
            ))}
      </div>

      {/* Chart section */}
      <div className={`${isLoading ? "relative" : ""}`}>
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-[#111827] rounded-xl p-6"></div>
        )}
        <div className={isLoading ? "invisible" : "visible"}>
          <Chart
            data={challengeData}
            presentDay={presentDay}
            isLoading={isLoading}
            streak={streak}
          />
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <DayModal
          presentDay={presentDay}
          onClose={() => toggleModal(false)}
          streak={streak}
          onStreakUpdate={(updatedData) => {
            const newStreak = calculateStreak(updatedData);
            setStreak(newStreak);
          }}
        />
      )}
      {showExtendChallengeModal && (
        <ExtendChallengeModal
          onClose={challengeCompleted}
          onSubmit={updateChallengeTitle}
          showModalFalse={() => setShowExtendChallengeModal(false)}
        />
      )}
      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          challengeData={challengeData}
          presentDay={presentDay}
          hours={dailyHours}
          userProfile={userProfile}
          streak={streak}
        />
      )}
    </div>
  );
};

export default Overview;
