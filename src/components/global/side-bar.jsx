import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building,
  Book,
  GraduationCap,
  Users,
  Notebook,
  ClipboardList,
  FileText,
  User
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Departments", icon: Building, path: "/departments" },
  { name: "Courses", icon: GraduationCap, path: "/courses" },
  { name: "Syllabus", icon: FileText, path: "/syllabus" },
  { name: "Semester", icon: Notebook, path: "/semesters" },
  { name: "Batches", icon: Users, path: "/batches" },
  { name: "Attendance", icon: ClipboardList, path: "/attendance" },
  { name: "Students", icon: User, path: "/students" },
];

const SideBar = () => {
  return (
    <div className="xl:w-full h-full flex flex-col justify-start gap-y-2 items-center">
      {navItems.map((item) => (
        <NavLink key={item.name} to={item.path} className="w-full">
          {({ isActive }) => {
            const Icon = item.icon;
            return (
              <div
                className={`p-3 rounded-[14px] cursor-pointer group flex items-center justify-start gap-x-4 w-full ${
                  isActive
                    ? "bg-secondary text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {/* hover:bg-[#9166f7] */}
                <Icon
                  className={`w-[20px] h-[20px] 4xl:w-[30px] 4xl:h-[30px] 3xl:w-[25px] 3xl:h-[25px] ${
                    isActive
                      ? "stroke-white"
                      : "stroke-gray-400 group-hover:stroke-white"
                  }`}
                />
                <p className="4xl:text-2xl 3xl:text-xl hd:text-sm text-sm">{item.name}</p>
              </div>
            );
          }}
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
