import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

export default function ExpandableSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
      setSearchValue("");
    }
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-container")) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="search-container relative w-40">
        <div
          className={`
            absolute top-0 right-0 z-10 flex items-center justify-center 
            w-11 h-11 bg-neutral-900 rounded-full cursor-pointer
            transition-all duration-300 ease-in-out
            hover:bg-neutral-800
            ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
          onClick={handleToggle}
        >
       
          <Search className="w-5 h-5 text-white stroke-2" />
        </div>

        <div
          className={`
            flex items-center bg-neutral-900 rounded-full
            transition-all duration-100 ease-in-out
            ${
              isExpanded
                ? "w-40 h-10 opacity-100"
                : "w-10 h-10 opacity-0 pointer-events-none"
            }
          `}
        >
          <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
            <Search className="w-5 h-5 text-white stroke-2" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="
              flex-1 h-full bg-transparent text-white placeholder-gray-400 
              outline-none pr-4 text-sm
            "
          />
        </div>
      </div>
    </div>
  );
}
