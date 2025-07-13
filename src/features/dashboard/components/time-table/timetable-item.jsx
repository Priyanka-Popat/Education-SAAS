const TimetableItem = ({ status, icon, time, subject }) => {
  return (
    <div className="lg:p-3 p-2 bg-white/10 backdrop-blur-md rounded-lg">
      <div className="flex items-start flex-col justify-between text-[11px] lg:text-[10px] hd:text-[11px] 2xl:text-[11px] 4xl:text-lg 3xl:text-base font-urbanistRegular text-white">
        <div className="flex items-center gap-x-2 mb-2">
          <img src={icon} className="w-3 4xl:w-4 2xl:w-3" alt="" />
          <p>{status}</p>
        </div>
        <div className="flex items-center gap-x-2 mb-2">
          <img
            src="/assets/icons/clock.svg"
            className="w-3 4xl:w-4 2xl:w-3"
            alt=""
          />
          <p>{time}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <img
            src="/assets/icons/clipboard-tick.svg"
            className="w-3 4xl:w-4 2xl:w-3"
            alt=""
          />
          <p>{subject}</p>
        </div>
      </div>
    </div>
  );
};

export default TimetableItem;
