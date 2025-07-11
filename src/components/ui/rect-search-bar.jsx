import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";

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
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full p-2 pr-10 bg-[#FFFFFF0F] border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs`}
        placeholder="Search..."
      />
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
