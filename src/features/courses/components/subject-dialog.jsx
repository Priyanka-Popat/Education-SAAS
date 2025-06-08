import { X } from "lucide-react";
import AddSubject from "./add-subject-dialog";

const SubjectModal = ({ isOpen, onClose }) => {
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
        <AddSubject onClose={onClose} />
      </div>
    </div>
  );
};

export default SubjectModal;
