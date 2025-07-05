import { useEffect, useRef } from "react";

const FilterSidebar = ({ isOpen, onClose, children }) => {
  const filterRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-64 bg-[#1C1C1C] z-50 border-l border-[#606060] p-4 transition-transform duration-300 shadow-lg"
        ref={filterRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Filters</h2>
          <button className="text-white" onClick={onClose}>✕</button>
        </div>

        <div className="space-y-3 text-white text-sm">{children}</div>
      </div>
    </>
  );
};

export default FilterSidebar;
