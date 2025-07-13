import { X } from "lucide-react";
import AddSem from "@/features/semesters/components/add-sem-dialog";

const SemDialog = ({ isOpen, onClose, isEditMode, editSemesterData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-stretch justify-stretch">
      <div className="relative w-full h-full overflow-auto">
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-[100] hover:text-gray-300 text-white"
        >
          <X size={24} />
        </button>
        <AddSem
          onClose={onClose}
          isEditMode={isEditMode}
          editSemesterData={editSemesterData}
        />
      </div>
    </div>
  );
};

export default SemDialog;
