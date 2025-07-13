import { useState, useEffect, useRef } from "react";
import { Calendar, Plus, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AddSem({ onClose, isEditMode, editSemesterData }) {
  const modalRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [Department, setDepartment] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [semesterName, setSemesterName] = useState("");

  const totalSteps = 3;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (isEditMode && editSemesterData) {
      setDepartment(editSemesterData.department || "");
      setSemesterName(editSemesterData.semesterName || "");

      // Set tracks as-is
      setSubjectTracks(
        (editSemesterData.tracks || []).map((track) => ({
          fullForm: track.name,
          isElective: track.name?.toLowerCase().includes("optional"),
        }))
      );

      // 🔥 Flatten subjects from tracks
      const extractedSubjects = (editSemesterData.tracks || []).flatMap(
        (track) =>
          (track.subjects || []).map((subject) => ({
            subjectTrack: track.name || "", // e.g., "Compulsory"
            subjectCode: subject.code || "",
            subjectName: subject.name || "",
          }))
      );

      setSubjects(extractedSubjects);
    }
  }, [isEditMode, editSemesterData]);

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

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
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

  const isAddTrackDisabled = !subjectTracks.every(isTrackComplete);

  const isSubjectComplete = (subject) => {
    return subject.subjectTrack && subject.subjectCode && subject.subjectName;
  };

  const isAddSubjectDisabled = !subjects.every(isSubjectComplete);

  const renderSemesterStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-white mb-2 font-urbanistSemiBold">
          {isEditMode ? "Edit Semester" : "Add Semester"}
        </h2>
      </div>

      {!isOnline && (
        <>
          <div className="flex justify-between md:flex-row flex-col gap-4">
            <div className="w-full">
              <label className="block text-white text-sm font-medium mb-2">
                From <span className="text-red">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  step="1"
                  value=""
                  onChange={(e) =>
                    handleSubjectChange(index, "startDate", e.target.value)
                  }
                  className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white pr-10 placeholder:text-sm"
                  placeholder="2024"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-white text-sm font-medium mb-2">
                To <span className="text-red">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  step="1"
                  value=""
                  onChange={(e) =>
                    handleSubjectChange(index, "endDate", e.target.value)
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
              Semester Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Semester Name"
              value={semesterName}
              onChange={(e) => setSemesterName(e.target.value)}
              className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 placeholder:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
        </>
      )}
    </div>
  );

  const renderTrackStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white font-urbanistSemiBold">
          {isEditMode ? "Edit Subject Track" : "Add Subject Track"}
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
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Subject Track Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Subject Track Name"
              value={track.name}
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
          {isEditMode ? "Edit Subjects" : "Add Subjects"}
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
              value={subject.subjectCode}
              onChange={(e) =>
                handleSubjectChange(index, "subjectCode", e.target.value)
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
              value={subject.subjectName}
              onChange={(e) =>
                handleSubjectChange(index, "subjectName", e.target.value)
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
              Semester
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
              Subject Track
            </span>
          </div>
          <div className="w-full">
            <div
              className={`flex-1 h-1 rounded-full mb-5 ${
                currentStep >= 3 ? "bg-secondary" : "bg-gray-500"
              }`}
            ></div>
            <span
              className={
                currentStep === 3
                  ? "text-secondary font-medium"
                  : "text-gray-400"
              }
            >
              Subject
            </span>
          </div>
        </div>

        {currentStep === 1 && renderSemesterStep()}
        {currentStep === 2 && renderTrackStep()}
        {currentStep === 3 && renderSubjectStep()}

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
                  ? () => {
                      toast.success(
                        isEditMode ? "Semesters updated!" : "Semesters added!"
                      );
                      onClose();
                    }
                  : handleNext
              }
              className="bg-secondary text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              {currentStep === totalSteps
                ? isEditMode
                  ? "Update"
                  : "Add"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
