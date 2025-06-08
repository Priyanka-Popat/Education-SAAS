import { ChevronDown } from "lucide-react";
import courses from "@/data/NestedData.json";

const DepartmentFilter = ({ selectedDepartment, setSelectedDepartment, setSelectedDeptId }) => {
  const handleChange = (e) => {
    const dept = courses.find((d) => d.shortForm === e.target.value);
    setSelectedDepartment(dept);
    setSelectedDeptId?.(dept?.id || "");
  };

  return (
    <div className="flex items-baseline gap-x-2">
      <label className="block text-white font-medium mb-2 text-sm">Department:</label>
      <div className="relative w-full">
        <select
          value={selectedDepartment?.shortForm}
          onChange={handleChange}
          className="w-full appearance-none p-2 pr-10 rounded bg-white/10 border border-white/20 text-white font-urbanistRegular text-xs"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "white",
          }}
        >
          {courses.map((dept) => (
            <option
              key={dept.id}
              value={dept.shortForm}
              style={{ backgroundColor: "#131313", color: "white" }}
            >
              {dept.shortForm}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <ChevronDown size={18} className="text-white/70" />
        </div>
      </div>
    </div>
  );
};

export default DepartmentFilter;
