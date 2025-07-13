import { useState, useRef } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { useEffect } from "react";
import nestedData from "@/data/NestedData.json";
import { toast } from "react-hot-toast";

export default function Dialog({ onClose, mode = "add", semesterToEdit }) {
  const modalRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const [subjectTracks, setSubjectTracks] = useState([
    { fullForm: "", isElective: false, selectedSemester: "Semester 1" },
  ]);

  const [subjects, setSubjects] = useState([
    { subjectTrack: "", subjectCode: "", subjectName: "" },
  ]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addNewTrack = () => {
    setSubjectTracks((prev) => [
      ...prev,
      { fullForm: "", isElective: false, selectedSemester: "Semester 1" },
    ]);
  };

  const addNewSubject = () => {
    setSubjects((prev) => [
      ...prev,
      { subjectTrack: "", subjectCode: "", subjectName: "" },
    ]);
  };

  const getTracks = () => {
    const trackSet = new Set();

    nestedData.forEach((college) => {
      college.courses.forEach((course) => {
        course.semesters?.forEach((semester) => {
          semester.tracks?.forEach((track) => {
            if (track.name) trackSet.add(track.name);
          });
        });
      });
    });

    return Array.from(trackSet);
  };

  const [trackName, setTrackName] = useState([]);

  useEffect(() => {
    setTrackName(getTracks());
  }, []);

  useEffect(() => {
    if (mode === "edit" && semesterToEdit) {
      const tracks = semesterToEdit.tracks || [];

      setSubjectTracks(
        tracks.map((track) => ({
          fullForm: track.name || "",
          isElective: track.isElective || false,
          selectedSemester: semesterToEdit.semesterName || "Semester 1",
        }))
      );

      const flatSubjects = tracks.flatMap((track) =>
        (track.subjects || []).map((subject) => ({
          subjectTrack: track.name || "",
          subjectCode: subject.code || "",
          subjectName: subject.name || "",
        }))
      );

      setSubjects(flatSubjects);
    }
  }, [mode, semesterToEdit]);

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

  const renderTrackStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white font-urbanistSemiBold">
          {mode === "edit" ? "Edit Subject Track" : "Add Subject Track"}
        </h2>
        <button
          type="button"
          onClick={addNewTrack}
          className={`text-white bg-white/5 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center`}
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
              onChange={(e) => {}}
            >
              <option className="bg-primary">Semester 1</option>
              <option className="bg-primary">Semester 2</option>
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
              checked={track.isElective}
              onChange={(e) =>
                setSubjectTracks((prev) => {
                  const updated = [...prev];
                  updated[index].isElective = e.target.checked;
                  return updated;
                })
              }
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
          {mode === "edit" ? "Edit Subjects" : "Add Subjects"}
        </h2>
        <button
          type="button"
          onClick={addNewSubject}
          className={`text-white bg-white/5 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center`}
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
                className="w-full appearance-none border-gray-600 bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none cursor-pointer"
                value={subject.subjectTrack}
                onChange={(e) => {
                  const updatedSubjects = [...subjects];
                  updatedSubjects[index].subjectTrack = e.target.value;
                  setSubjects(updatedSubjects);
                }}
              >
                <option value="">Select</option>

                {subjectTracks
                  .filter((track) => track.fullForm.trim() !== "")
                  .map((track, idx) => (
                    <option key={`user-${idx}`} value={track.fullForm}>
                      {track.fullForm}
                    </option>
                  ))}

                {trackName
                  .filter((name) => name.trim() !== "")
                  .map((name, idx) => (
                    <option key={`json-${idx}`} value={name}>
                      {name}
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
              Subject Code <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Subject Code"
              value={subject.subjectCode}
              onChange={(e) =>
                setSubjects((prevSubjects) => {
                  const updatedSubjects = [...prevSubjects];
                  updatedSubjects[index].subjectCode = e.target.value;
                  return updatedSubjects;
                })
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
                setSubjects((prevSubjects) => {
                  const updatedSubjects = [...prevSubjects];
                  updatedSubjects[index].subjectName = e.target.value;
                  return updatedSubjects;
                })
              }
              className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 placeholder:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
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
              className={`mx-2 ${
                currentStep === 1
                  ? "text-secondary font-medium"
                  : "text-gray-400"
              }`}
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
              className={`mx-2 ${
                currentStep === 2
                  ? "text-secondary font-medium"
                  : "text-gray-400"
              }`}
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
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 font-medium px-6 py-2 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={
                currentStep === totalSteps
                  ? () => {
                      toast.success(
                        mode === "edit"
                          ? "Subject updated successfully!"
                          : "Subject added successfully!"
                      );
                      onClose(); 
                    }
                  : handleNext
              }
              className="bg-secondary text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              {currentStep === totalSteps
                ? mode === "edit"
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
