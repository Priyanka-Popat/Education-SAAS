const YourInfoCard = () => {
  return (
    <div className="relative col-start-1 row-start-1 col-span-5 row-span-4">
      <div className="grid grid-cols-3 grid-rows-4 4xl:grid-rows-5 w-full h-full">
        <div className="col-start-1 row-start-1 col-span-2 ps-5 py-3 4xl:py-8 4xl:px-8 3xl:py-8 flex justify-start items-end 4xl:items-start">
          <p className="text-xl text-[20px] 4xl:text-4xl 3xl:text-3xl 2xl:text-2xl hd:text-xl xl:text-lg lg:text-lg font-urbanistSemiBold">Your Information</p>
        </div>

        <div className="col-start-1 row-start-2 row-span-3 4xl:row-span-4 ps-5 4xl:ps-8 flex justify-start">
          <img
            src="/assets/img/profile-pic.svg"
            alt=""
            className="w-full h-full 4xl:w-[80%] 4xl:h-[85%] 3xl:w-[85%] 3xl:h-[85%] 2xl:h-[90%] 2xl:w-[85%] hd:w-[85%] hd:h-full lg:w-[90%] lg:h-[90%]"
          />
        </div>

        <div className="col-start-2 row-start-2 col-span-2 row-span-2 4xl:row-span-3 2xl:ps-2 3xl:ps-0 lg:ps-3 hd:ps-0">
          <div className="flex flex-col gap-y-3 4xl:gap-y-4 h-full hd:gap-y-2">
            <p className="font-urbanistSemiBold text-[22px] 2xl:text-[22px] text-xl 4xl:text-4xl 3xl:text-3xl hd:text-lg xl:text-base lg:text-lg">Adam Thompson</p>
            <div className="flex flex-col gap-y-4 4xl:gap-y-7 h-full">
              <p className="text-lg hd:text-base 2xl:text-xl 4xl:text-3xl 3xl:text-2xl font-urbanistMedium">
                Senior Mathematics Faculty
              </p>
              <div className="flex flex-col gap-y-1 4xl:gap-y-3">
                <p className="font-urbanistMedium text-sm hd:text-sm 2xl:text-base 4xl:text-2xl 3xl:text-xl text-white">
                  <span className="font-urbanistRegular text-sm hd:text-sm 2xl:text-lg 4xl:text-2xl 3xl:text-xl text-grey">
                    Experience:
                  </span>{" "}
                  12+ Years
                </p>
                <p className="font-urbanistMedium text-sm hd:text-sm 2xl:text-base 4xl:text-2xl 3xl:text-xl text-white">
                  <span className="font-urbanistRegular text-sm hd:text-sm 2xl:text-base 4xl:text-2xl 3xl:text-xl text-grey">
                    Email address:
                  </span>{" "}
                  Adamtson@gmail.com
                </p>
                <p className="font-urbanistMedium text-sm hd:text-sm 2xl:text-base 4xl:text-2xl 3xl:text-xl text-white">
                  <span className="font-urbanistRegular text-sm hd:text-sm 2xl:text-base 4xl:text-2xl 3xl:text-xl text-grey">
                    Phone Number:
                  </span>{" "}
                  +91 5688 5678 57
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourInfoCard;
