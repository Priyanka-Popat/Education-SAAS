import { useState } from "react";
import EditCourseModal from "@/features/courses/components/edit-dialog";

const Filters = ({ visibleFilters = [], className, onAddCourse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCourse = (newCourse) => {
    onAddCourse?.(newCourse);
  };

  return (
    <>
      <div className={` ${className} flex px-5 py-5 items-end h-full`}>
        {visibleFilters.includes("date") && (
          <div className="flex items-center gap-x-2 px-2 py-2" style={filterStyle}>
            <p className="text-xs">Apr 28, 2025</p>
            <img src="/assets/icons/arrow-down.svg" alt="" className="w-3" />
          </div>
        )}

        {visibleFilters.includes("grade") && (
          <div className="flex items-center gap-x-2 px-2 py-2" style={filterStyle}>
            <p className="text-xs">Grade 12</p>
            <img src="/assets/icons/arrow-down.svg" alt="" className="w-3" />
          </div>
        )}

        {visibleFilters.includes("filter") && (
          <div className="flex items-center gap-x-2 px-2 py-2" style={filterStyle}>
            <p className="text-xs">Filter</p>
            <img src="/assets/icons/filter.svg" alt="" className="w-3" />
          </div>
        )}

        {visibleFilters.includes("addCourse") && (
          <div
            className="flex items-center gap-x-2 border-[1px] border-[#713CE9]  rounded-[6px] bg-[#713CE9] py-2 px-4 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img src="/assets/icons/add-circle.svg" alt="" />
            <p className="text-xs font-urbanistSemiBold">Add new Course</p>
          </div>
        )}
      </div>

      <EditCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseToEdit={null}
        onSubmitEdit={handleAddCourse}
      />
    </>
  );
};

const filterStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "6px",
};

export default Filters;
