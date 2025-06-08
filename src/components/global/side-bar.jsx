import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building,
  Book,
  GraduationCap,
  Users,
  Notebook,
  ClipboardList,
  FileText
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Departments", icon: Building, path: "/departments" },
  { name: "Courses", icon: GraduationCap, path: "/courses" },
  { name: "Syllabus", icon: FileText, path: "/syllabus" },
  { name: "Semester", icon: Notebook, path: "/semesters" },
  { name: "Batches", icon: Users, path: "/batches" },
  { name: "Attendance", icon: ClipboardList, path: "/attendance" },
];

const SideBar = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start gap-y-2 items-center">
      {navItems.map((item) => (
        <NavLink key={item.name} to={item.path} className="w-full">
          {({ isActive }) => {
            const Icon = item.icon;
            return (
              <div
                className={`p-3 rounded-[14px] cursor-pointer group flex items-center justify-start gap-x-4 w-full ${
                  isActive
                    ? "bg-secondary text-white"
                    : "text-gray-400 hover:text-white hover:bg-secondary"
                }`}
              >
                <Icon
                  className={`w-[20px] h-[20px] ${
                    isActive
                      ? "stroke-white"
                      : "stroke-gray-400 group-hover:stroke-white"
                  }`}
                />
                <p className="">{item.name}</p>
              </div>
            );
          }}
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
