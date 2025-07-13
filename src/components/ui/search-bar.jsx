import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { UniversalSearch } from "./universal-search";

const SearchBar = ({ className }) => {
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
      <div
        onClick={() => setOpen(true)}
        className={`${className} cursor-pointer flex justify-start items-center 4xl:h-[55%] lg:h-[55%] bg-[#FFFFFF0F] rounded-full h-fit place-self-center w-full`}
      >
        <div className="flex items-center justify-center w-12 h-12 4xl:w-20 4xl:h-20 flex-shrink-0 xl:px-4">
          <Search className="w-5 h-5 4xl:w-7 4xl:h-7 3xl:w-6 3xl:h-6 2xl:w-5 2xl:h-5 lg:w-4 lg:h-4 text-white stroke-2" />
        </div>
        <span className="text-white text-sm opacity-60">Search...</span>
        <span className="ml-auto mr-4 text-xs py-1 items-center bg-primary gap-1 rounded border border-grey/20 bg-muted px-1.5 text-grey hidden sm:block">
          ⌘ K
        </span>
      </div>

      {open && (
  <div
    className="fixed inset-0 flex items-start justify-center z-[70] transition-all duration-300 ease-out animate-in fade-in-0 zoom-in-95"
  >
    <UniversalSearch setOpen={setOpen} />
  </div>
)}

    </>
  );
};

export default SearchBar;
