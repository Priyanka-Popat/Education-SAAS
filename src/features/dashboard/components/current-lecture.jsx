import RoundButton from "@/components/ui/round-button";
import { useNavigate } from "react-router-dom";

const CurrentLecture = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="c8 w-full h-full relative cut-out-two p-5 text-white">
        <div className="flex flex-col gap-y-4">
          <p className="urbanistSemiBold text-[24px]">Current Lecture</p>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-x-2">
              <img src="/assets/icons/location-icon.svg" alt="" />
              <p className="text-sm font-urbanistRegular">Room 204</p>
            </div>

            <div className="flex items-center gap-x-2">
              <img src="/assets/icons/clock.svg" alt="" />
              <p className="text-sm font-urbanistRegular">9:00 - 9:45 AM</p>
            </div>
          </div>

          <p className="text-base font-urbanistSemiBold">Grade 7B</p>
          <p className="text-base font-urbanistRegular">
            <span className="font-urbanistSemiBold">Mathematics –</span>{" "}
            Understanding the Fundamentals of Linear Expression
          </p>
        </div>
        <div className="cut-out bottom-0 right-0 absolute h-[85px] w-[85px] flex justify-center items-center rounded-tl-[50px] bg-white p-12">
          <RoundButton className="" onClick={() => navigate("/attendance")} />
        </div>
      </div>
    </>
  );
};

export default CurrentLecture;
