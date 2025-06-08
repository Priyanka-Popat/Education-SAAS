import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import Profile from "@/features/profile/pages/Profile";
import Attendance from "@/features/attendance/pages/Attendance";
import Courses from "@/features/courses/pages/Courses";
import Departments from "@/features/departments/pages/departments";
import Semesters from "@/features/semesters/pages/semesters";
import Batches from "./features/batches/pages/Batches";
import Syllabus from "./features/syllabus/pages/Syllabus";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/semesters" element={<Semesters />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/syllabus" element={<Syllabus />} />
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
