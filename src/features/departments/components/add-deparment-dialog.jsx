import { useState, useEffect, useRef } from "react";
import { Calendar, Upload, Plus } from "lucide-react";

export default function Dialog({ onClose }) {
  const modalRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [courses, setCourses] = useState([
    {
      fullForm: "",
      shortForm: "",
      startDate: "",
      endDate: "",
      syllabusFile: null,
    },
  ]);

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
  const [Department, setDepartment] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const totalSteps = 2;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addNewCourse = () => {
    setCourses((prev) => [
      {
        fullForm: "",
        shortForm: "",
        startDate: "",
        endDate: "",
        syllabusFile: null,
      },
      ...prev,
    ]);
  };

  const isCourseComplete = (course) => {
    return (
      course.fullForm &&
      course.shortForm &&
      course.startDate &&
      course.endDate &&
      course.syllabusFile
    );
  };

  const isAddCourseDisabled = !courses.every(isCourseComplete);

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const renderDepartmentStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-white mb-2 font-urbanistSemiBold">
          Department
        </h2>
      </div>

      {!isOnline && (
        <>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Department Full Form <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Department Full Form"
              value={Department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Department Short Form <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Department Short Form"
              className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 placeholder:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
        </>
      )}

      {isOnline && (
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Meeting Link
          </label>
          <input
            type="url"
            placeholder="https://zoom.us/j/..."
            className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}
    </div>
  );

  const renderCourseStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white font-urbanistSemiBold">
          Courses
        </h2>
        <button
          type="button"
          onClick={addNewCourse}
          className={`text-white bg-white/5 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center ${
            isAddCourseDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Add Course"
          disabled={isAddCourseDisabled}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {courses.map((course, index) => (
        <div key={index} className="bg-white/5 p-4 rounded-lg space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Course Department Full Form <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Course Full Form"
              value={course.fullForm}
              onChange={(e) =>
                handleCourseChange(index, "fullForm", e.target.value)
              }
              className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 placeholder:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Course Short Form <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Course Short Form"
              value={course.shortForm}
              onChange={(e) =>
                handleCourseChange(index, "shortForm", e.target.value)
              }
              className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 placeholder:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                From <span className="text-red">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  step="1"
                  value={course.startDate || ""}
                  onChange={(e) =>
                    handleCourseChange(index, "startDate", e.target.value)
                  }
                  className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white pr-10 placeholder:text-sm"
                  placeholder="2024"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                To <span className="text-red">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  step="1"
                  value={course.endDate || ""}
                  onChange={(e) =>
                    handleCourseChange(index, "endDate", e.target.value)
                  }
                  className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 placeholder:text-sm text-white pr-10"
                  placeholder="2025"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Syllabus <span className="text-red">*</span>
            </label>
            <input
              id={`syllabus-${index}`}
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                handleCourseChange(index, "syllabusFile", e.target.files[0])
              }
              className="hidden"
            />
            <label
              htmlFor={`syllabus-${index}`}
              className="w-full inline-flex items-center px-4 py-2 bg-white/5 text-white border border-gray-600 rounded-lg cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              {course.syllabusFile ? "Change File" : "Upload File"}
            </label>
            {course.syllabusFile && (
              <p className="mt-2 text-sm text-gray-400">
                Selected: {course.syllabusFile.name}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="w-full max-w-[38rem] bg-primary rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="w-full">
            <div
              className={`flex-1 h-1 rounded-full mb-5 ${
                currentStep >= 1 ? "bg-secondary" : "bg-gray-500"
              }`}
            ></div>
            <span
              className={
                currentStep === 1
                  ? "text-secondary font-medium"
                  : "text-gray-400"
              }
            >
              Department
            </span>
          </div>
          <div className="w-full">
            <div
              className={`flex-1 h-1 rounded-full mb-5 mx-2 ${
                currentStep >= 2 ? "bg-secondary" : "bg-gray-500"
              }`}
            ></div>
            <span
              className={
                currentStep === 2
                  ? "text-secondary font-medium"
                  : "text-gray-400"
              }
            >
              Course
            </span>
          </div>
        </div>

        {currentStep === 1 && renderDepartmentStep()}
        {currentStep === 2 && renderCourseStep()}

        <div
          className={`flex items-center mt-8 pt-6 ${
            currentStep === 1 ? " justify-end" : " justify-between"
          }`}
        >
          <button
            onClick={handleBack}
            className={`font-medium transition-colors ${
              currentStep === 1
                ? "hidden"
                : "text-secondary hover:text-blue-300"
            }`}
            disabled={currentStep === 1}
          >
            Back
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => {
                onClose();
              }}
              className="text-gray-400 hover:text-gray-300 font-medium px-6 py-2 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={
                currentStep === totalSteps
                  ? () => alert("Added Successfully")
                  : handleNext
              }
              className="bg-secondary text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              {currentStep === 2 ? "Add" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
