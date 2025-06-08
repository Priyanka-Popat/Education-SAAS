import React from "react";
import { PencilLine, ArrowRight, ArrowUpRight } from "lucide-react";

const SemesterList = ({
  semesters,
  selectedSemesterIndex,
  onSelectSemester,
}) => {
  return (
    <ul className="space-y-2">
      {semesters.map((sem, index) => (
        <div className="flex items-center gap-x-2" key={sem.id}>
          <div className="p-2 rounded-full border border-secondary">
            <PencilLine size={16} />
          </div>
          <li
            onClick={() => onSelectSemester(index)}
            className={`flex items-center w-full justify-between gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              selectedSemesterIndex === index
                ? "bg-secondary"
                : "bg-white/5 hover:bg-white/10"
            } text-white`}
          >
            {sem.semesterName}
            {selectedSemesterIndex === index ? (
              <ArrowRight size={16} />
            ) : (
              <ArrowUpRight size={16} />
            )}
          </li>
        </div>
      ))}
    </ul>
  );
};

export default SemesterList;
