import React from "react";
import { PencilLine, ArrowRight, ArrowUpRight } from "lucide-react";

const SemesterList = ({
  semesters,
  selectedSemesterIndex,
  onSelectSemester,
}) => {
  return (
    <div className="relative max-h-[430px] 4xl:max-h-[775px] 3xl:max-h-[540px] hdplus:max-h-[485px] hd:max-h-[380px] 2xl:max-h-[540px] lg:max-h-[380px] overflow-y-auto scrollbar-thin">
    <ul className="space-y-2">
      {semesters.map((sem, index) => (
        <div className="flex items-center gap-x-2" key={sem.id}>
          <div className="p-2 4xl:p-4 3xl:p-2 2xl:p-2 rounded-full border border-secondary">
            <PencilLine className="w-5 h-5 4xl:w-7 4xl:h-7 3xl:w-6 3xl:h-6 2xl:w-5 2xl:h-5 lg:w-4 lg:h-4 " />
          </div>
          <li
            onClick={() => onSelectSemester(index)}
            className={`flex items-center w-full justify-between gap-2 px-4 py-3 4xl:py-4 4xl:px-6 2xl:py-3 2xl:px-4 hd:py-2 hd:px-4 lg:py-2 text-sm 4xl:text-2xl 3xl:text-xl hd:text-sm 2xl:text-base rounded-lg cursor-pointer transition-colors ${
              selectedSemesterIndex === index
                ? "bg-secondary"
                : "bg-white/5 hover:bg-white/10"
            } text-white`}
          >
            {sem.semesterName}
            {selectedSemesterIndex === index ? (
              <ArrowRight className="w-5 h-5 4xl:w-7 4xl:h-7 3xl:w-6 3xl:h-6 2xl:w-5 2xl:h-5 lg:w-4 lg:h-4 " />
            ) : (
              <ArrowUpRight className="w-5 h-5 4xl:w-7 4xl:h-7 3xl:w-6 3xl:h-6 2xl:w-5 2xl:h-5 lg:w-4 lg:h-4 " />
            )}
          </li>
        </div>
      ))}
    </ul>
    </div>
  );
};

export default SemesterList;
