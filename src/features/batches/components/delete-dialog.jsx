
import { useEffect, useRef } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import ReactDOM from "react-dom";

export default function DeleteCourseConfirmation({
  isOpen,
  onClose,
  courseToDelete,
  onConfirmDelete,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !courseToDelete) return null;

  const dangerColor = "#FF4560";
  const bgColor = "#131313";

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        style={{ backgroundColor: bgColor }}
        className="rounded-3xl w-full max-w-md p-8 relative shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <div
            style={{ backgroundColor: "rgba(255, 69, 96, 0.1)" }}
            className="w-16 h-16 rounded-full flex items-center justify-center"
          >
            <AlertTriangle size={32} style={{ color: dangerColor }} />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-white text-xl font-bold mb-2">Delete Course</h2>
          <p className="text-gray-400 text-sm">
            Are you sure you want to delete this course? This action cannot be
            undone.
          </p>
        </div>

        <div className="border-t border-[#ff2f4e1d] my-8"></div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirmDelete}
            className="bg-[#FF4560] px-6 py-3 text-sm rounded-lg w-fit text-white font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <Trash2 size={18} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
