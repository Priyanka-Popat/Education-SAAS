import { useState, useEffect, useRef } from "react";
import { Calendar, Upload, ChevronDown } from "lucide-react";
import departments from "@/data/NestedData.json";

export default function Dialog({ onClose, initialDeptId }) {
  const modalRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const [selectedDeptId, setSelectedDeptId] = useState(initialDeptId);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [syllabusFile, setSyllabusFile] = useState(null);

  const selectedDepartment = departments.find(
    (dept) => dept.id === selectedDeptId
  );
  const departmentName = selectedDepartment
    ? selectedDepartment.shortForm
    : "Unknown Department";

  const courses = selectedDepartment?.courses || [];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="min-h-screen inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="w-full max-w-[38rem] bg-primary rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="w-full">
            <div className={`flex-1 h-1 rounded-full mb-5 bg-secondary`}></div>
            <span className="text-secondary font-medium">
              Syllabus
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-white font-urbanistSemiBold mb-4">
          Add Syllabus
        </h2>

        <div className="space-y-6">
          <div className="w-full">
            <label className="block text-white text-sm font-medium mb-2">
              Select Department <span className="text-red">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none border-gray-600 bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none cursor-pointer"
                value={selectedDeptId}
                onChange={(e) => {
                  setSelectedDeptId(e.target.value);
                  setSelectedCourseId("");
                }}
              >
                <option value="" className="bg-primary">
                  Select Department
                </option>
                {departments.map((dept) => (
                  <option
                    key={dept.id}
                    value={dept.id}
                    className="bg-primary"
                  >
                    {dept.shortForm}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-white/70" />
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="block text-white text-sm font-medium mb-2">
              Select Course <span className="text-red">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none border-gray-600 bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none cursor-pointer"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                <option value="" className="bg-primary">
                  Select Course
                </option>
                {courses.map((course) => (
                  <option
                    key={course.id}
                    value={course.id}
                    className="bg-primary"
                  >
                    {course.shortForm}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-white/70" />
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="block text-white text-sm font-medium mb-2">
              From Year <span className="text-red">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none border-gray-600 bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none cursor-pointer"
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
              >
                <option value="" className="bg-primary">
                  Select Year
                </option>
                {yearOptions.map((year) => (
                  <option key={year} value={year} className="bg-primary">
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-white/70" />
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="block text-white text-sm font-medium mb-2">
              To Year <span className="text-red">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none border-gray-600 bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none cursor-pointer"
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
              >
                <option value="" className="bg-primary">
                  Select Year
                </option>
                {yearOptions.map((year) => (
                  <option key={year} value={year} className="bg-primary">
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-white/70" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Syllabus <span className="text-red">*</span>
            </label>
            <input
              id="syllabus-upload"
              type="file"
              accept="application/pdf"
              onChange={(e) => setSyllabusFile(e.target.files[0])}
              className="hidden"
            />
            <label
              htmlFor="syllabus-upload"
              className="w-full inline-flex items-center px-4 py-2 bg-white/5 text-white border border-gray-600 rounded-lg cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              {syllabusFile ? "Change File" : "Upload File"}
            </label>
            {syllabusFile && (
              <p className="mt-2 text-sm text-gray-400">
                Selected: {syllabusFile.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center mt-8 pt-6 justify-between">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 font-medium px-6 py-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => alert("Syllabus Added Successfully")}
            className="bg-secondary text-white font-medium px-6 py-2 rounded-lg transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
