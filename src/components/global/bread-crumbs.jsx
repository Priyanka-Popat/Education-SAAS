import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [] }) {

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full md:flex justify-end p-6 overflow-x-auto hidden relative z-10"
    >
      <ol className="flex items-center space-x-1 text-sm 2xl:text-sm 3xl:text-sm 4xl:text-2xl text-white/80">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {index !== 0 && (
                <ChevronRight size={14} className="mx-1 text-white/40" />
              )}
              {!isLast ? (
                <Link
                  to={item.href}
                  className="hover:text-white/95 hover:underline transition-colors duration-150"
                >
                  {item.label}
                </Link>
              ) : (
                <Link to="#" className="text-[#713CE9] font-medium cursor-pointer">{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
