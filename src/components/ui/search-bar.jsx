// import { Search } from "lucide-react";
// import { useState } from "react";
// const SearchBar = ({className}) => {
//   const [searchValue, setSearchValue] = useState("");

//   const handleInputChange = (e) => {
//     setSearchValue(e.target.value);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Escape") {
//       setIsExpanded(false);
//       setSearchValue("");
//     }
//   };

//   return (
//     <>
//     <div className={`${className} flex justify-start items-center 4xl:h-[60%] lg:h-[60%] bg-[#FFFFFF0F] rounded-full h-fit place-self-center w-full`}>
//       <div className="flex items-center justify-center w-12 h-12 4xl:w-20 4xl:h-20 flex-shrink-0 xl:px-4">
//         <Search className="w-5 h-5 4xl:w-7 4xl:h-7 3xl:w-6 3xl:h-6 2xl:w-5 2xl:h-5 lg:w-4 lg:h-4 text-white stroke-2" />
//       </div>
//       <input
//         type="text"
//         placeholder="Search"
//         value={searchValue}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         className="
//               flex-1 text-white 
//               outline-none text-sm w-full 4xl:text-3xl 3xl:text-xl 2xl:text-lg bg-transparent placeholder-[#B2B2B2]
//             "
//       />
//       </div>
//     </>
//   );
// };

// export default SearchBar;

//   <div className="relative w-full h-full flex justify-start items-center col-span-3">
//   <input type="search" name="" id="" placeholder='Search' className='bg-[#FFFFFF0F] py-2 4xl:py-5 4xl:ps-14 3xl:py-3 2xl:py-3 lg:ps-9 lg:py-2 pe-4 4xl:text-3xl 3xl:text-xl 2xl:text-lg rounded-full xl:w-[100%] lg:w-[90%] placeholder-[#B2B2B2] placeholder:font-urbanistRegular xl:ps-10 ps-2 4xl:placeholder:text-2xl 3xl:placeholder:text-base placeholder:text-sm text-white' />
//   <img src={SearchIcon} alt="" className='w-5 4xl:w-10 3xl:w-6 4xl:top-12 3xl:top-9 lg:top-7 absolute top-[40%] left-3' />
// </div>
// components/SearchBar.jsx
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

      {open && <UniversalSearch setOpen={setOpen} />}
    </>
  );
};

export default SearchBar;
