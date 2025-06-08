// import { useState } from "react";
// import { ChevronLeft } from "lucide-react";

// const defaultItems = [
//   { label: "Dashboard", href: "/" },
//   { label: "Courses", href: "/courses" },
// ];

// export default function Breadcrumbs({ items = defaultItems }) {
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   return (
//     <div className="w-full h-full items-center flex justify-end p-4" style={{ backgroundColor: "transparent" }}>
//       <nav aria-label="Breadcrumb" className="max-w-full overflow-x-auto">
//         <ol className="flex items-center space-x-1 whitespace-nowrap">
//           {items.map((item, index) => (
//             <li key={index} className="flex items-center">
//               {index !== 0 && (
//                 <ChevronLeft 
//                   size={14} 
//                   className="mx-1 text-gray-500" 
//                 />
//               )}
//               <a 
//                 href={item.href}
//                 className={`px-2 py-1 rounded-md text-sm transition-all duration-200 ${
//                   index === items.length - 1 
//                     ? "font-medium" 
//                     : "font-normal"
//                 }`}
//                 style={{
//                   backgroundColor: hoveredIndex === index ? "rgba(113, 60, 233, 0.15)" : "transparent",
//                   color: index === items.length - 1 
//                     ? "#713CE9" 
//                     : hoveredIndex === index 
//                       ? "rgba(255, 255, 255, 0.95)" 
//                       : "rgba(255, 255, 255, 0.7)"
//                 }}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//               >
//                 {item.label}
//               </a>
//             </li>
//           ))}
//         </ol>
//       </nav>
//     </div>
//   );
// }


import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items = [] }) {

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full lg:flex justify-end p-6 overflow-x-auto hidden "
    >
      <ol className="flex items-center space-x-1 text-sm text-white/80">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {index !== 0 && (
                <ChevronRight size={14} className="mx-1 text-white/40" />
              )}
              {!isLast ? (
                <a
                  href={item.href}
                  className="hover:text-white/95 transition-colors duration-150"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-[#713CE9] font-medium">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
