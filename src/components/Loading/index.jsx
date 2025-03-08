import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-screen bg-[#080C18] flex justify-center items-center">
      <TailSpin color="indigo" height={80} width={80} />
    </div>
  );
};

export default Loading;
