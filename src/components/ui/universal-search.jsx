import { useNavigate } from "react-router-dom";
import { routes } from "@/constants/routes";
import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

export const UniversalSearch = ({ setOpen }) => {
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  const handleSelect = (path) => {
    navigate(path);
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  return (
    <div className="fixed inset-0 z-[70] bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
      <div ref={dialogRef} className="bg-primary border border-white/20 rounded-lg w-full max-w-md py-4 shadow-lg">
        <div className="flex items-center gap-2 px-4 pb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white opacity-50" />
            <input
              autoFocus
              type="text"
              placeholder="Type a command or search..."
              onChange={() => {}}
              className="w-full pl-10 pr-3 py-2 rounded bg-transparent text-white placeholder:text-white/50 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setOpen(false)}
            className="ml-2 p-2 hover:bg-white/10 rounded"
            aria-label="Close search"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <ul className="max-h-60 overflow-auto space-y-2 scrollbar-thin">
          {routes.map((route) => (
            <li
              key={route.path}
              onClick={() => handleSelect(route.path)}
              className="cursor-pointer p-2 px-4 hover:bg-black/30 rounded"
            >
              <div className="font-medium text-white text-sm">{route.name}</div>
              <div className="text-sm text-gray-500">
                {route.description ?? route.path}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
