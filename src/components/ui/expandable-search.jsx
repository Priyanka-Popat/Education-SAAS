import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { UniversalSearch } from "./universal-search";

export default function ExpandableSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="">
        <div className="search-container relative w-40 flex justify-end">
          <div
            onClick={() => setOpen(true)}
            className={`
           flex items-center justify-center 
            w-9 h-9 bg-neutral-900 rounded-full cursor-pointer
            transition-all duration-300 ease-in-out
            hover:bg-neutral-800
          `}
          >
            <Search className="w-5 h-5 text-white stroke-2" />
          </div>
        </div>
      </div>
      {open && <UniversalSearch setOpen={setOpen} />}
    </>
  );
}
