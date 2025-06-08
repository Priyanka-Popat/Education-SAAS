import { ChevronDown } from "lucide-react";

const CourseFilter = ({ selectedCourse, setSelectedCourse, courses = [] }) => {
  return (
    <div className="flex items-baseline gap-x-2">
      <label className="block text-white font-medium mb-2 text-sm">
        Course:
      </label>
      <div className="relative w-full">
        <select
          value={selectedCourse?.id || ""}
          onChange={(e) => {
            const selected = courses.find(
              (c) => c.id === Number(e.target.value)
            );
            setSelectedCourse(selected);
          }}
          className="w-full appearance-none p-2 pr-10 rounded bg-white/10 border border-white/20 text-white font-urbanistRegular text-xs"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "white",
          }}
        >
          {courses.map((course) => (
            <option
              key={course.id}
              value={course.id}
              style={{ backgroundColor: "#131313", color: "white" }}
            >
              {course.shortForm}
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

export default CourseFilter;
