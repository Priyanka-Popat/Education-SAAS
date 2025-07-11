import { X } from "lucide-react";
import AddSemester from "@/features/semesters/components/add-subject-dialog.jsx";

export default function SemesterDialog({ isOpen, onClose, mode = "add", semesterToEdit = null }) {
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
        <AddSemester
          onClose={onClose}
          mode={mode}
          semesterToEdit={semesterToEdit}
        />
      </div>
    </div>
  );
}
