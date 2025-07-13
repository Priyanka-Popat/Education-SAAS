import { useEffect, useRef, useState } from "react";
import { PencilLine, ArrowRight, ArrowUpRight } from "lucide-react";

const DepartmentList = ({
  departments,
  selectedDeptId,
  setSelectedDeptId,
  setSelectedCourseId,
  onEditClick,
}) => {
  const listRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(
    departments.findIndex((dept) => dept.id === selectedDeptId) || 0
  );

  useEffect(() => {
    if (departments.length > 0 && focusedIndex >= 0) {
      const dept = departments[focusedIndex];
      if (dept?.id !== selectedDeptId) {
        setSelectedDeptId(dept.id);
        setSelectedCourseId(dept.courses?.[0]?.id || "");
      }

      const listItems = listRef.current?.querySelectorAll("li");
      listItems?.[focusedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIndex, departments, selectedDeptId, setSelectedDeptId, setSelectedCourseId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, departments.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [departments]);

  return (
    <div
      ref={listRef}
      className="relative max-h-[430px] overflow-y-auto scrollbar-thin"
    >
      <ul className="space-y-2">
        {departments.map((dept, index) => (
          <div className="flex items-center gap-x-2" key={dept.id}>
            <button
              onClick={() => onEditClick(dept)}
              className="relative btn-slide p-2.5 rounded-full border border-secondary transition-colors duration-300 text-white group"
            >
              <span className="relative z-10 flex items-center justify-center">
                <PencilLine className="w-5 h-5 4xl:w-6 4xl:h-6 3xl:w-5 3xl:h-5 2xl:w-4 2xl:h-4 lg:w-4 lg:h-4" />
              </span>
            </button>

            <li
              onClick={() => {
                if (dept.id !== selectedDeptId) {
                  setSelectedDeptId(dept.id);
                  setSelectedCourseId(dept.courses?.[0]?.id || "");
                  setFocusedIndex(index); 
                }
              }}
              className={`flex items-center w-full justify-between gap-2 px-4 py-3 4xl:py-4 4xl:px-6 2xl:py-3 2xl:px-4 hd:py-2 hd:px-4 lg:py-2 text-sm 4xl:text-2xl 3xl:text-xl hd:text-sm 2xl:text-base rounded-lg cursor-pointer transition-colors
                ${
                  selectedDeptId === dept.id
                    ? "bg-secondary"
                    : focusedIndex === index
                    ? "bg-white/10"
                    : "bg-white/5 hover:bg-white/10"
                }
                text-white`}
            >
              {dept.shortForm} : {dept.fullForm}
              {selectedDeptId === dept.id ? (
                <ArrowRight className="w-5 h-5 4xl:w-6 4xl:h-6 3xl:w-5 3xl:h-5 2xl:w-4 2xl:h-4 lg:w-4 lg:h-4" />
              ) : (
                <ArrowUpRight className="w-5 h-5 4xl:w-6 4xl:h-6 3xl:w-5 3xl:h-5 2xl:w-4 2xl:h-4 lg:w-4 lg:h-4" />
              )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
