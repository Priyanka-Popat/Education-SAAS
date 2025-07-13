import { lazy } from "react";

const Dashboard = lazy(() => import("@/features/dashboard/pages/dashboard"));
const Profile = lazy(() => import("@/features/profile/pages/profile"));
const Attendance = lazy(() => import("@/features/attendance/pages/attendance"));
const Courses = lazy(() => import("@/features/courses/pages/courses"));
const Departments = lazy(() => import("@/features/departments/pages/departments"));
const Semesters = lazy(() => import("@/features/semesters/pages/semesters"));
const Batches = lazy(() => import("@/features/batches/pages/batches"));
const Syllabus = lazy(() => import("@/features/syllabus/pages/syllabus"));
const Students = lazy(() => import("@/features/students/pages/students"));
const Login = lazy(() => import("@/features/login/pages/login"));

export const routes = [
  { name: "Dashboard", path: "/", element: <Dashboard /> },
  { name: "Profile", path: "/profile", element: <Profile /> },
  { name: "Attendance", path: "/attendance", element: <Attendance /> },
  { name: "Courses", description: "All Courses are listed here", path: "/courses", element: <Courses /> },
  { name: "Departments", description: "All Deparments are listed here", path: "/departments", element: <Departments /> },
  { name: "Semesters", description: "All Semesters are listed here", path: "/semesters", element: <Semesters /> },
  { name: "Batches", description: "All Batches are listed here", path: "/batches", element: <Batches /> },
  { name: "Syllabus", description: "All Syllabus are listed here", path: "/syllabus", element: <Syllabus /> },
  { name: "Students", description: "All Students are listed here", path: "/students", element: <Students /> },
  { name: "Login", description: "Login", path: "/login", element: <Login /> },
];
