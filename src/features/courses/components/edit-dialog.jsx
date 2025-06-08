import { useEffect, useState, useRef } from "react";
import { X, Save, Book, Clock, User } from "lucide-react";
import ReactDOM from "react-dom";

export default function EditCourseModal({
  isOpen,
  onClose,
  courseToEdit,
  onSubmitEdit,
}) {
  const [formData, setFormData] = useState(courseToEdit || {});
  const modalRef = useRef(null);

  useEffect(() => {
    setFormData(courseToEdit || {});
  }, [courseToEdit]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmitEdit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        style={{ backgroundColor: "#131313" }}
        className="rounded-3xl w-full max-w-lg p-8 relative shadow-2xl"
      >
        <div className="border-l-4 border-[#713CE9] pl-4 mb-8">
          <h2 className="text-white text-2xl font-bold">
            {courseToEdit ? "Edit Course" : "Add Course"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {courseToEdit
              ? "Update course information"
              : "Fill in course details"}
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="courseCode"
                className="text-sm text-gray-300 mb-2 block"
              >
                Course Code
              </label>
              <div className="relative">
                <input
                  id="courseCode"
                  name="courseCode"
                  value={formData.courseCode || ""}
                  onChange={handleChange}
                  className="w-full bg-white/5 text-white rounded-lg px-4 pl-10 py-3 focus:outline-none"
                  placeholder="Enter course code"
                />
                <Book
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="grade"
                className="text-sm text-gray-300 mb-2 block"
              >
                Grade
              </label>
              <div className="relative">
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade || ""}
                  onChange={handleChange}
                  className="w-full bg-white/5 text-white rounded-lg px-4 pl-10 py-3 cursor-pointer focus:outline-none"
                >
                  {["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <User
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="courseTitle"
              className="text-sm text-gray-300 mb-2 block"
            >
              Course Title
            </label>
            <input
              id="courseTitle"
              name="courseTitle"
              value={formData.courseTitle || ""}
              onChange={handleChange}
              className="w-full bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none"
              placeholder="Enter course title"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="department"
                className="text-sm text-gray-300 mb-2 block"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department || ""}
                onChange={handleChange}
                className="w-full bg-white/5 text-white rounded-lg px-4 py-3 cursor-pointer focus:outline-none"
              >
                {[
                  "Science",
                  "Mathematics",
                  "English",
                  "History",
                  "Art",
                  "Physical Education",
                ].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="schedule"
                className="text-sm text-gray-300 mb-2 block"
              >
                Schedule
              </label>
              <div className="relative">
                <input
                  id="schedule"
                  name="schedule"
                  value={formData.schedule || ""}
                  onChange={handleChange}
                  className="w-full bg-white/5 text-white rounded-lg px-4 pl-10 py-3 focus:outline-none"
                  placeholder="Enter schedule"
                />
                <Clock
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="instructor"
              className="text-sm text-gray-300 mb-2 block"
            >
              Instructor
            </label>
            <div className="relative">
              <input
                id="instructor"
                name="instructor"
                value={formData.instructor || ""}
                onChange={handleChange}
                className="w-full bg-white/5 text-white rounded-lg px-4 pl-10 py-3 focus:outline-none"
                placeholder="Enter instructor name"
              />
              <User
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8"></div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-[#713CE9] text-white px-6 py-3 rounded-lg shadow hover:opacity-90 flex items-center gap-2"
          >
            <Save size={18} />
            {courseToEdit ? "Save Changes" : "Add Course"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
