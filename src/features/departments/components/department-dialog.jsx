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
          className="fixed top-6 right-6 z-[100] hover:text-gray-300 text-white"
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
