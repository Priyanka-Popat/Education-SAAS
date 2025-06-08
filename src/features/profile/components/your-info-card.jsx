const YourInfoCard = () => {
  return (
    <div className="col-start-1 row-start-1 col-span-5 row-span-4">
      <div className="your-info grid grid-cols-3 grid-rows-3 w-full h-full">
        <div className="col-start-1 row-start-1 col-span-2 ps-7 py-5 flex justify-start items-end">
          <p className="text-xl font-urbanistSemiBold">Your Information</p>
        </div>

        <div className="col-start-1 row-start-2 row-span-2 pt-4 pb-6">
          <img
            src="/assets/img/profile-pic.svg"
            alt=""
            className="w-full h-full"
          />
        </div>

        <div className="col-start-2 row-start-2 col-span-2 row-span-2 py-4">
          <div className="flex flex-col gap-y-3">
            <p className="font-urbanistSemiBold text-[22px]">Adam Thompson</p>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-urbanistMedium">
                Senior Mathematics Faculty
              </p>
              <div className="flex flex-col gap-y-1">
                <p className="font-urbanistMedium text-sm text-white">
                  <span className="font-urbanistRegular text-sm text-grey">
                    Experience:
                  </span>{" "}
                  12+ Years
                </p>
                <p className="font-urbanistMedium text-sm text-white">
                  <span className="font-urbanistRegular text-sm text-grey">
                    Email address:
                  </span>{" "}
                  Adamtson@gmail.com
                </p>
                <p className="font-urbanistMedium text-sm text-white">
                  <span className="font-urbanistRegular text-sm text-grey">
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
