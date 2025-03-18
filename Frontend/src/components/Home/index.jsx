import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import Header from "../Header";
import "aos/dist/aos.css";
import { ArrowRight, Code, Terminal, Zap, Trophy } from "lucide-react";

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    AOS.init({
      duration: 800,
      once: false,
      easing: "cubic-bezier(0.165, 0.84, 0.44, 1)",
      mirror: true,
      offset: 100,
    });

    const refreshHandler = () => AOS.refresh();
    window.addEventListener("resize", refreshHandler);

    return () => {
      window.removeEventListener("resize", refreshHandler);
    };
  }, []);

  return (
    <div className="custom-scrollbar bg-gradient-to-b from-[#080C18] to-[#0F172A] min-h-screen w-full flex flex-col overflow-x-hidden overflow-y-auto relative">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row items-center px-6 md:px-12 py-8 lg:py-12 max-w-7xl mx-auto">
        {/* Left side - Hero content */}
        <div
          className="w-full lg:w-3/5 z-10 mb-16 lg:mb-0"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <div className="inline-block mb-4 py-1 px-3 bg-blue-500/10 border border-blue-500/20 rounded-full animate-pulse">
            <span className="text-blue-400 text-sm font-medium flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              Optimize Your Coding Journey
            </span>
          </div>

          <h1 className="text-neutral-100 text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
            Document Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
              Coding Journey
            </span>{" "}
            Like Never Before
          </h1>

          <p
            className="text-neutral-300 text-xl md:text-2xl mt-6 max-w-xl leading-relaxed opacity-90"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Transform your learning experience with powerful tracking tools that{" "}
            <span className="font-medium text-white">visualize progress</span>,{" "}
            <span className="font-medium text-white">boost motivation</span>,
            and{" "}
            <span className="font-medium text-white">accelerate growth</span>.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-medium flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all group"
            >
              Start Tracking Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <span className="text-white font-bold text-xl mb-1">
                Coding Challenges
              </span>
              <span className="text-neutral-400 text-sm text-center">
                Personalized milestones
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <span className="font-bold text-2xl text-white mb-1">Easy</span>
              <span className="text-neutral-400 text-sm">
                Progress Tracking
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <span className="font-bold text-2xl text-white mb-1">Smart</span>
              <span className="text-neutral-400 text-sm">Analytics</span>
            </div>
          </div>
        </div>

        {/* Right side - Visual elements (hidden on mobile) */}
        <div
          className="hidden lg:block w-full lg:w-2/5 z-10 relative mx-auto"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <div className="relative w-full max-w-md mx-auto lg:max-w-full h-[300px] sm:h-[350px] md:h-[400px]">
            <div
              className={`absolute top-0 left-0 right-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 p-6 rounded-2xl backdrop-blur-lg shadow-xl border border-white/20 
              ${isMounted ? "animate-float" : ""}`}
              style={{
                transform: "rotate(3deg) scale(0.95)",
                zIndex: 30,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Terminal className="h-5 w-5 text-white mr-2" />
                  <span className="text-white font-medium">
                    Day 42: React Hooks
                  </span>
                </div>
                <div className="bg-white/20 px-2 py-1 rounded text-xs text-white">
                  Completed
                </div>
              </div>
              <div className="h-2 bg-white/20 rounded-full mb-4">
                <div className="h-2 bg-white rounded-full w-3/4 animate-progress"></div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-white/20 rounded-full w-full"></div>
                <div className="h-3 bg-white/20 rounded-full w-4/5"></div>
                <div className="h-3 bg-white/20 rounded-full w-5/6"></div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center text-white text-sm">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span>42 Day Streak</span>
                </div>
                <span className="text-white text-sm">+120 XP</span>
              </div>
            </div>

            <div
              className={`absolute bg-gradient-to-br from-purple-600/50 to-pink-600/50 rounded-2xl backdrop-blur border border-white/10 
              ${isMounted ? "animate-float-delayed-1" : ""}`}
              style={{
                top: "20%",
                left: "10%",
                right: "10%",
                height: "45%",
                transform: "rotate(-6deg) scale(0.85)",
                zIndex: 20,
              }}
            ></div>

            <div
              className={`absolute bg-gradient-to-br from-pink-600/30 to-blue-600/30 rounded-2xl backdrop-blur border border-white/10 
              ${isMounted ? "animate-float-delayed-2" : ""}`}
              style={{
                top: "35%",
                left: "20%",
                right: "20%",
                height: "35%",
                transform: "rotate(12deg) scale(0.65)",
                zIndex: 10,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="hidden lg:block absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
        data-aos="zoom-in"
        data-aos-delay="200"
        style={{ transform: "translateZ(-10px)" }}
      ></div>
      <div
        className="hidden lg:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"
        data-aos="zoom-in"
        data-aos-delay="400"
        style={{ transform: "translateZ(-20px)" }}
      ></div>

      {/* Feature highlights */}
      <div className="w-full bg-black/30 backdrop-blur-sm border-t border-white/5 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <Code className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  #100DaysOfCode
                </h3>
                <p className="text-neutral-400">
                  Join the popular challenge and track your progress with
                  advanced analytics.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <Zap className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  Smart Insights
                </h3>
                <p className="text-neutral-400">
                  Analyze your progress and discover patterns to help you grow
                  as a developer.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <Trophy className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  Achievement System
                </h3>
                <p className="text-neutral-400">
                  Stay motivated with streaks, and milestones that showcase your
                  journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
