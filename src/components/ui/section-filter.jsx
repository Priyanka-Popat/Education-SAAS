import { ChevronDown } from "lucide-react";
const sectionOptions = ["A", "B", "C", "D", "E"];

const SectionFilter = ({ selected, setFilters }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white text-sm">Section :</label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, section: e.target.value }))
          }
          className="bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-md appearance-none w-full"
        >
          {sectionOptions.map((section) => (
            <option key={section} value={section}>
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
