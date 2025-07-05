import React, { useRef, useEffect } from "react";

const LogoutDialog = ({ onClose, handleLogout }) => {
    const logoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
  return (
    <div className="min-h-screen inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div ref={logoutRef} className="rounded-xl p-6 max-w-sm w-full mx-4 bg-primary">
        <div className="text-center">
          <h2 className="text-white text-2xl font-normal mb-8 font-urbanistSemiBold">
            Logout
          </h2>

          <p className="text-gray-400 text-base mb-12 leading-relaxed font-light">
            Are you sure you want to logout?
          </p>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 text-gray-400 hover:text-gray-300 font-mediumtext-base"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-secondary text-white font-medium  rounded-lg transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
