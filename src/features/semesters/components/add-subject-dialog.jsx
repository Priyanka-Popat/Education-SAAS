import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Upload,
  Plus,
  ChevronDown,
  CheckCircle,
  Icon,
} from "lucide-react";

export default function Dialog({ onClose }) {
  const modalRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [courseName, setCourseName] = useState("");
  const [startDate, setStartDate] = useState("May 23, 2025");
  const [endDate, setEndDate] = useState("May 23, 2025");
  const [syllabusFile, setSyllabusFile] = useState(null);

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
    console.log(currentStep)
    console.log("nexttt")
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    console.log(currentStep)
    console.log("backkk")
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

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const [subjectTracks, setSubjectTracks] = useState([
    { fullForm: "", isElective: false },
  ]);

  const [subjects, setSubjects] = useState([
    { subjectTrack: "", subjectCode: "", subjectName: "" },
  ]);

  const addNewTrack = () => {
    setSubjectTracks((prev) => [...prev, { fullForm: "", isElective: false }]);
  };

  const addNewSubject = () => {
    setSubjects((prev) => [
      ...prev,
      { subjectTrack: "", subjectCode: "", subjectName: "" },
    ]);
  };

  const isTrackComplete = (track) => {
    return track.fullForm;
  };

  // const isAddTrackDisabled = !subjectTracks.every(isTrackComplete);

    const isAddTrackDisabled =false

  const isSubjectComplete = (subject) => {
    return (
      subject.fullForm &&
      subject.shortForm &&
      subject.startDate &&
      subject.endDate &&
      subject.syllabusFile
    );
  };

  // const isAddSubjectDisabled = !subjects.every(isSubjectComplete);
const isAddSubjectDisabled = false

  const renderTrackStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white font-urbanistSemiBold">
          Add Subject Track
        </h2>
        <button
          type="button"
          onClick={addNewTrack}
          className={`text-white bg-white/5 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center ${
            isAddTrackDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isAddTrackDisabled}
          title="Add Track"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {subjectTracks.map((track, index) => (
        <div key={index} className="bg-white/5 p-4 rounded-lg space-y-4">
          <label className="block text-white text-sm font-medium mb-2">
            Select Semester <span className="text-red">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none border-gray-600 bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none cursor-pointer"
              value=""
              onChange={(e) => e.target.value}
            >
              <option className="bg-primary">Semester 1</option>
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-white/70" />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Subject Track Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Subject Track Name"
              value={track.fullForm}
              onChange={(e) =>
                setSubjectTracks((prevTracks) => {
                  const updatedTracks = [...prevTracks];
                  updatedTracks[index].fullForm = e.target.value;
                  return updatedTracks;
                })
              }
              className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 placeholder:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id={`elective-${index}`}
              className="w-4 h-4 accent-purple-500"
            />
            <label htmlFor={`elective-${index}`} className="text-sm text-white">
              Elective
            </label>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSubjectStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white font-urbanistSemiBold">
          Add Subjects
        </h2>
        <button
          type="button"
          onClick={addNewSubject}
          className={`text-white bg-white/5 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center ${
            isAddSubjectDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isAddSubjectDisabled}
          title="Add Subject"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {subjects.map((subject, index) => (
        <div key={index} className="bg-white/5 p-4 rounded-lg space-y-4">
          <div className="w-full">
            <label className="block text-white text-sm font-medium mb-2">
              Select Subject Track <span className="text-red">*</span>
            </label>
            <div className="relative">
              <select
                id="learningStyle"
                className="w-full appearance-none border-gray-600 bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none cursor-pointer"
                value={subject.subjectTrack}
                onChange={(e) =>
                  setSubjects((prevSubjects) => {
                    const updatedSubjects = [...prevSubjects];
                    updatedSubjects[index].subjectTrack = e.target.value;
                    return updatedSubjects;
                  })
                }
              >
                <option className="bg-primary" value="">
                  Compulsory
                </option>
                <option className="bg-primary" value="visual">
                  Elective
                </option>
                <option className="bg-primary" value="auditory">
                  Core
                </option>
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-white/70" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Subject Code <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Subject Code"
              value=""
              onChange={(e) =>
                handleCourseChange(index, "fullForm", e.target.value)
              }
              className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 placeholder:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Subject Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Subject Name"
              value={subject.subjectCode}
              onChange={(e) =>
                handleCourseChange(index, "shortForm", e.target.value)
              }
              className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 placeholder:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              className={`flex-1 h-1 rounded-full mb-5 mx-2 ${
                currentStep >= 1 ? "bg-secondary" : "bg-gray-500"
              }`}
            ></div>
            <span
              className={
                currentStep === 1
                  ? "text-secondary font-medium mx-2"
                  : "text-gray-400 mx-2"
              }
            >
              Subject Track
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
                  ? "text-secondary font-medium mx-2"
                  : "text-gray-400 mx-2"
              }
            >
              Subject
            </span>
          </div>
        </div>

        {currentStep === 1 && renderTrackStep()}
        {currentStep === 2 && renderSubjectStep()}

        <div
          className={`flex items-center mt-8 pt-6 ${
            currentStep === 1 ? " justify-between" : " justify-between"
          }`}
        >
          <button
            onClick={handleBack}
            className={`font-medium transition-colors ${
              currentStep === 1 ? "hidden" : "text-secondary"
            }`}
            disabled={currentStep === 1}
          >
            Back
          </button>
          {currentStep === 1 && (
            <button
              onClick={() => setCurrentStep(2)}
              className="text-secondary font-medium transition-colors"
            >
              Skip
            </button>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => {
                onClose();
              }}
              className="text-gray-400 hover:text-gray-300 font-medium px-6 py-2 transition-colors"
            >
              Cancel
            </button>
            {
              <button
              onClick={
                currentStep === totalSteps
                  ? () => alert("Added Successfully")
                  : () => handleNext()
              }
              className="bg-secondary text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              {currentStep === 2 ? "Add" : "Next"}
            </button>
              // <button
              //   onClick={() => {
              //     if (currentStep === totalSteps) {
              //       alert("Added Successfully");
              //     } else {
              //       handleNext();
              //     }
              //   }}
              //   className="bg-secondary text-white font-medium px-6 py-2 rounded-lg transition-colors"
              // >
              //   {currentStep === totalSteps ? "Add" : "Next"}
              // </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
