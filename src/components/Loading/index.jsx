import { TailSpin } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";

const Loading = () => {
  return (
    <div className="w-full h-screen bg-[#080C18] flex justify-center items-center">
      <Skeleton />
    </div>
  );
};

export default Loading;
