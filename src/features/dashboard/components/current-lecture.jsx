import RoundButton from "@/components/ui/round-button";
import { useNavigate } from "react-router-dom";

const CurrentLecture = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="c8 w-full h-full relative cut-out-two p-5 text-white hidden lg:block">
        <Content />
        <div className="cut-out bottom-0 right-0 absolute h-[85px] w-[85px] flex justify-center items-center rounded-tl-[50px] lg:bg-white bg-primary p-12">
          <RoundButton className="" onClick={() => navigate("/attendance")} />
        </div>
      </div>

      {/* mobile screen  */}
      <div className="h-full relative lg:hidden">
        <div className="bottom-right-parent p-0.5 bg-secondary rounded-[20px] h-full">
          <div className="bottom-right bg-[#17141B] h-full rounded-[20px]">
            <div className="absolute -bottom-36 right-16 h-full w-full">
              <img
                src="/assets/img/cube.png"
                alt=""
                className="w-full h-full"
              />
            </div>
            <div className="">
              <div className="p-5 text-white ">
                <Content />
              </div>
            </div>
          </div>
        </div>

        <RoundButton
          className="absolute right-2 bottom-0 !h-[45px] !w-[45px]"
          onClick={() => navigate("/attendance")}
        />
      </div>
    </>
  );
};

export default CurrentLecture;

const Content = () => {
  return (
    <div className="flex flex-col md:gap-y-4 gap-y-2">
      <p className="urbanistSemiBold font-urbanistSemiBold text-lg 4xl:text-4xl 2xl:text-2xl 3xl:text-3xl hd:text-xl lg:text-lg">
        Current Lecture
      </p>
      <div className="grid grid-cols-2">
        <div className="flex items-center gap-x-2">
          <img
            src="/assets/icons/location-icon.svg"
            alt=""
            className="w-4 4xl:w-6 3xl:w-4 2xl:w-3"
          />
          <p className="text-sm lg:text-[10px] hd:text-xs 2xl:text-xs 4xl:text-xl 3xl:text-base font-urbanistRegular text-white">
            Room 204
          </p>
        </div>

        <div className="flex items-center gap-x-2">
          <img
            src="/assets/icons/clock.svg"
            alt=""
            className="w-4 4xl:w-6 3xl:w-4 2xl:w-3"
          />
          <p className="text-sm lg:text-[10px] hd:text-xs 2xl:text-xs 4xl:text-xl 3xl:text-base font-urbanistRegular text-white">
            9:00 - 9:45 AM
          </p>
        </div>
      </div>

      <p className="text-base 2xl:text-sm 4xl:text-2xl 3xl:text-lg hd:text-sm lg:text-sm font-urbanistSemiBold">
        Grade 7B
      </p>
      <p className="font-urbanistRegular text-base 2xl:text-sm 4xl:text-2xl 3xl:text-lg hd:text-sm lg:text-sm">
        <span className="font-urbanistSemiBold">Mathematics –</span>{" "}
        Understanding the Fundamentals of Linear Expression
      </p>
    </div>
  );
};
