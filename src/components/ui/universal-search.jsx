import { useNavigate } from "react-router-dom";
import { routes } from "@/constants/routes";
import { Search, X, CornerDownLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const UniversalSearch = ({ setOpen }) => {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const listRef = useRef([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (path) => {
    navigate(path);
    setOpen(false);
  };

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const filteredRoutes = routes.filter(
    (route) =>
      route.name?.toLowerCase().includes(trimmedQuery) ||
      route.description?.toLowerCase().includes(trimmedQuery)
  );

  useEffect(() => {
    if (listRef.current[selectedIndex]) {
      listRef.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredRoutes.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredRoutes.length - 1
        );
      } else if (e.key === "Enter") {
        if (filteredRoutes[selectedIndex]) {
          handleSelect(filteredRoutes[selectedIndex].path);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filteredRoutes, selectedIndex, setOpen]);

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
      <div
        ref={dialogRef}
        className="bg-primary border border-white/20 rounded-2xl w-full max-w-md py-4 shadow-lg m-5"
      >
        <div className="flex items-center gap-2 px-4 pb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white opacity-50" />
            <input
              autoFocus
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
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

        <ul className="max-h-60 overflow-auto space-y-2 scrollbar-thin px-4">
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route, idx) => (
              <li
                key={route.path}
                ref={(el) => (listRef.current[idx] = el)}
                onClick={() => handleSelect(route.path)}
                className={`cursor-pointer p-2 px-4 rounded-[4px] bg-black/50 ${
                  selectedIndex === idx
                    ? "bg-secondary text-white"
                    : "hover:bg-black/30 text-white"
                }`}
              >
                <div className="font-medium text-sm">{route.name}</div>
                <div className="text-sm text-gray-400">
                  {route.description ?? route.path}
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-white text-sm p-4">
              No results found
            </li>
          )}
        </ul>

        <div className="border-t border-white/10 mt-4 px-4 pt-2 flex items-center justify-between text-xs text-white/60">
          <div>Go to Page</div>
          <div className="flex items-center gap-1">
            <span className="ml-auto text-xs py-1 items-center bg-primary gap-1 rounded border border-grey/20 bg-muted px-1.5 text-white hidden sm:block">
              <CornerDownLeft className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
