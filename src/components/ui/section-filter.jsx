import { ChevronDown } from "lucide-react";
const sectionOptions = ["A", "B", "C", "D", "E"];

const SectionFilter = ({ selected, setFilters, showLabel = true }) => {
  return (
    <div className="flex flex-col gap-1">
      {showLabel && <label className="text-white text-sm">Section :</label>}
      <div className="relative">
        <select
          value={selected}
          className="w-full appearance-none p-2 pr-10 bg-white/10 border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 cursor-pointer text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs"
        >
          {sectionOptions.map((section) => (
            <option key={section} value={section} style={{ backgroundColor: "#131313", color: "white" }}>
              {section}
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

export default SectionFilter;
