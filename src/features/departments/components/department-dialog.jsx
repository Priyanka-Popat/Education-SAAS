import { X } from "lucide-react";
import AddDepartment from "./add-deparment-dialog";

const DepartmentModal = ({
  isOpen,
  onClose,
  mode = "add",
  initialData = {},
  onSubmit,
}) => {
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
        <AddDepartment
          onClose={onClose}
          mode={mode}
          initialData={initialData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default DepartmentModal;
