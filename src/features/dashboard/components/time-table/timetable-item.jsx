

const TimetableItem = ({ status, icon, time, subject }) => {
  return (
    <div className="p-3 bg-white/10 backdrop-blur-md rounded-lg">
      <div className="flex items-start flex-col justify-between text-[11px] font-urbanistRegular text-white">
        <div className="flex items-center gap-x-2 mb-2">
          <img src={icon} className="w-3" alt="" />
          <p>{status}</p>
        </div>
        <div className="flex items-center gap-x-2 mb-2">
          <img src="/assets/icons/clock.svg" className="w-3" alt="" />
          <p>{time}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <img src="/assets/icons/clipboard-tick.svg" className="w-3" alt="" />
          <p>{subject}</p>
        </div>
      </div>
    </div>
  );
};

export default TimetableItem;
