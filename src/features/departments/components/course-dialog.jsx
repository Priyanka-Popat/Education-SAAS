import { X } from "lucide-react";
import AddCourse from "./add-course-dialog";

const CourseModal = ({ isOpen, onClose, initialDeptId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-stretch justify-stretch">
      <div className="relative w-full h-full overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <X size={24} />
        </button>
        <AddCourse onClose={onClose} initialDeptId={initialDeptId} />
      </div>
    </div>
  );
};

export default CourseModal;
