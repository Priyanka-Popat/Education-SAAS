import { ChevronDown } from "lucide-react";
const dateOptions = [
  "1 July 2025",
  "2 July 2025",
  "3 July 2025",
  "4 July 2025",
  "5 July 2025",
];

const DateFilter = ({ selected, setFilters, showLabel = true }) => {
  return (
    <div className="flex flex-col gap-1">
      {showLabel && <label className="text-white text-sm">Date :</label>}
      <div className="relative">
        <select
          value={selected}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, date: e.target.value }))
          }
          className="w-full appearance-none p-2 pr-10 bg-white/10 border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 cursor-pointer text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs"
        >
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <ChevronDown className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
