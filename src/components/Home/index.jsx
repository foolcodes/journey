import AOS from "aos";

import Header from "../Header";
import "aos/dist/aos.css";
AOS.init({
  duration: 1000,
  once: true,
});

const Home = () => {
  return (
    <div className="bg-[#080C18] h-screen w-screen flex flex-col justify center font-sans-serif">
      <div data-aos="fade-down">
        <Header />
      </div>
      <div
        className="h-full flex flex-col justify-center items-center"
        data-aos="fade-up"
      >
        {" "}
        <h1 className="text-neutral-100 text-4xl font-bold text-center">
          Track your <span className="gradient-text">Coding Journey</span> Like
          Never Before
        </h1>
        <p className="text-neutral-100 text-2xl font-medium mt-7 max-w-180 text-center">
          Document your <span className="gradient-text">progress</span>,
          visualize your <span className="gradient-text">growth</span>, stay{" "}
          <span className="gradient-text">motivated</span>, and{" "}
          <span className="gradient-text">inspire others</span>.
        </p>
      </div>
    </div>
  );
};

export default Home;
