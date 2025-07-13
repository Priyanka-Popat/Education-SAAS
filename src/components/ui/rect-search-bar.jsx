import { useRef, useEffect, useState } from "react";
import { X, Search } from "lucide-react";

const RectSearchBar = ({ className }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "/" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white opacity-60 pointer-events-none">
        <Search size={16} />
      </div>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full pl-10 pr-10 bg-[#FFFFFF0F] border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs`}
        placeholder="Search..."
      />
      {!value && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2 text-white text-xs opacity-60 pointer-events-none">
          <span className="ml-auto text-xs py-1 items-center bg-primary gap-1 rounded border border-grey/20 bg-muted px-1.5 text-white hidden sm:block">
          /
          </span>
        </div>
      )}
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-red-400"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default RectSearchBar;