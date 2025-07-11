import { X } from "lucide-react";
import AddSyllabus from "@/features/syllabus/components/add-syllabus-dialog.jsx";

export default function SyllabusModal({
  isOpen,
  onClose,
  initialDeptId,
  isEditMode = false,
  editData = null,
}) {
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
        <AddSyllabus
          onClose={onClose}
          initialDeptId={initialDeptId}
          isEditMode={isEditMode}
          editData={editData}
        />
      </div>
    </div>
  );
}
