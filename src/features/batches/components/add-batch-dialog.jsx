import { useState, useEffect, useRef } from "react";
import { Calendar, Upload, Plus, ChevronDown } from "lucide-react";

export default function BatchDialog({ onClose, initialDeptId }) {
  const modalRef = useRef(null);
  const [selectedDeptId, setSelectedDeptId] = useState(initialDeptId);
  const [batches, setBatches] = useState([
    {
      syllabusId: "",
      fromYear: "",
      toYear: "",
      studentsFile: null,
    },
  ]);

  const addNewBatch = () => {
    setBatches((prev) => [
      {
        syllabusId: "",
        fromYear: "",
        toYear: "",
        studentsFile: null,
      },
      ...prev,
    ]);
  };

  const handleBatchChange = (index, field, value) => {
    const updated = [...batches];
    updated[index][field] = value;
    setBatches(updated);
  };

  const isBatchComplete = (batch) => {
    return (
      batch.syllabusId &&
      batch.fromYear &&
      batch.toYear &&
      batch.studentsFile
    );
  };

  const isAddBatchDisabled = !batches.every(isBatchComplete);

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

  const renderBatchStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-semibold text-white font-urbanistSemiBold">
          Add Batches
        </h2>
      </div>

      {batches.map((batch, index) => (
        <div key={index} className="bg-white/5 p-4 rounded-lg space-y-4">
          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2">
              Select Syllabus <span className="text-red">*</span>
            </label>
            <select
              value={batch.syllabusId}
              onChange={(e) =>
                handleBatchChange(index, "syllabusId", e.target.value)
              }
              className="w-full bg-white/5 appearance-none border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option className="bg-primary" value="">2025</option>
              <option className="bg-primary" value="">2026</option>
              <option className="bg-primary" value="">2027</option>
              <option className="bg-primary" value="">2028</option>

              {/* {syllabuses.map((syllabus) => (
                <option key={syllabus.id} value={syllabus.id}>
                  {syllabus.name}
                </option>
              ))} */}
            </select>
             <div className="absolute inset-y-0 right-2 top-7 flex items-center pointer-events-none">
                  <ChevronDown size={18} className="text-white/70" />
                </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                From Year <span className="text-red">*</span>
              </label>
              <input
                type="number"
                placeholder="2020"
                value={batch.fromYear}
                onChange={(e) =>
                  handleBatchChange(index, "fromYear", e.target.value)
                }
                className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 placeholder:text-sm"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                To Year <span className="text-red">*</span>
              </label>
              <input
                type="number"
                placeholder="2024"
                value={batch.toYear}
                onChange={(e) =>
                  handleBatchChange(index, "toYear", e.target.value)
                }
                className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 placeholder:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Upload Students (Excel) <span className="text-red">*</span>
            </label>
            <input
              id={`students-${index}`}
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) =>
                handleBatchChange(index, "studentsFile", e.target.files[0])
              }
              className="hidden"
            />
            <label
              htmlFor={`students-${index}`}
              className="w-full inline-flex items-center px-4 py-2 bg-white/5 text-white border border-gray-600 rounded-lg cursor-pointer transition-colors placeholder:text-sm"
            >
              <Upload className="w-4 h-4 mr-2" />
              {batch.studentsFile ? "Change File" : "Upload File"}
            </label>
            {batch.studentsFile && (
              <p className="mt-2 text-sm text-gray-400">
                Selected: {batch.studentsFile.name}
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
            <div className={`flex-1 h-1 rounded-full mb-5 bg-secondary`}></div>
            <span className="text-secondary font-medium">
              Batch
            </span>
          </div>
        </div>

        {renderBatchStep()}

        <div className="flex items-center mt-8 pt-6 justify-between">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 font-medium px-6 py-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => alert("Batch Added Successfully")}
            className="bg-secondary text-white font-medium px-6 py-2 rounded-lg transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
