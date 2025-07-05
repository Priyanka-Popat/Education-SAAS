import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";

const SyllabusActionMenu = ({ uniqueKey }) => {
  const [activeMenuKey, setActiveMenuKey] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !menuBtnRef.current.contains(e.target)
    ) {
      setActiveMenuKey(null);
    }
  };

  useEffect(() => {
    if (activeMenuKey) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeMenuKey]);

   const handleToggleMenu = () => {
    if (activeMenuKey === uniqueKey) {
      setActiveMenuKey(null);
    } else {
      const rect = menuBtnRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 120 + window.scrollX,
      });
      setActiveMenuKey(uniqueKey);
    }
  };

  return (
    <>
      <MoreVertical
        ref={menuBtnRef}
        className="w-5 h-5 text-white cursor-pointer"
        onClick={handleToggleMenu}
      />

      {activeMenuKey === uniqueKey &&
        createPortal(
          <div
            ref={menuRef}
            className="absolute z-[9999] w-28 bg-[#1C1C1C] border border-[#606060] rounded-md shadow-md py-2 text-sm text-white"
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
            <div
              className="px-4 py-2 hover:bg-white/10 cursor-pointer"
              onClick={() => {
                setActiveMenuKey(null);
                console.log("Edit clicked");
              }}
            >
              Edit
            </div>
            <div
              className="px-4 py-2 hover:bg-white/10 cursor-pointer text-red-500"
              onClick={() => {
                setActiveMenuKey(null);
                console.log("Delete clicked");
              }}
            >
              Delete
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default SyllabusActionMenu;
