import React, { useState, useEffect } from "react";
import { User, GraduationCap, CheckCircle, Brain, Book } from "lucide-react";
import DepartmentData from "@/data/DepartmentsData.json";

const StepFormCollection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    department: "",
    lastName: "",
    email: "",
    phone: "",
    currentLevel: "",
    institution: "",
    fieldOfStudy: "",
    graduationYear: "",
    subjects: [],
    learningStyle: "",
    timeCommitment: "",
    goals: "",
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setDepartments(DepartmentData);
  }, []);

  const totalSteps = 4;

  const steps = [
    {
      id: 1,
      title: "Department",
      icon: User,
    },
    {
      id: 2,
      title: "Course",
      icon: GraduationCap,
    },
  ];

  const nextStep = () =>
    currentStep < totalSteps && setCurrentStep((prev) => prev + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep((prev) => prev - 1);

  return (
    <TimelineForm
      steps={steps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      nextStep={nextStep}
      prevStep={prevStep}
      formData={formData}
      setFormData={setFormData}
      totalSteps={totalSteps}
    />
  );
};

const TimelineForm = ({
  steps,
  currentStep,
  nextStep,
  prevStep,
  formData,
  totalSteps,
}) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-white">
            <label className="text-sm text-gray-300 mb-2 block">
              Select Department
            </label>
            <div className="relative">
              <select
                className="w-full bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none"
                value={formData.department || ""}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              >
                <option value="" disabled>
                  -- Choose Department --
                </option>
                {DepartmentData.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 gap-6 text-white">
            <div>
              <label
                htmlFor="institution"
                className="text-sm text-gray-300 mb-2 block"
              >
                Institution
              </label>
              <div className="relative">
                <input
                  id="institution"
                  placeholder="Enter institution name"
                  className="w-full bg-white/5 text-white rounded-lg px-4 pl-10 py-3 focus:outline-none"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      institution: e.target.value,
                    }))
                  }
                />
                <GraduationCap
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="fieldOfStudy"
                className="text-sm text-gray-300 mb-2 block"
              >
                Field of Study
              </label>
              <div className="relative">
                <input
                  id="fieldOfStudy"
                  placeholder="Enter field of study"
                  className="w-full bg-white/5 text-white rounded-lg px-4 pl-10 py-3 focus:outline-none"
                  value={formData.fieldOfStudy}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fieldOfStudy: e.target.value,
                    }))
                  }
                />
                <Book
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-white">
            <label htmlFor="goals" className="text-sm text-gray-300 mb-2 block">
              Learning Goals
            </label>
            <textarea
              id="goals"
              placeholder="What do you want to achieve?"
              className="w-full bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none min-h-[120px]"
              value={formData.goals}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, goals: e.target.value }))
              }
            />
          </div>
        );
      case 4:
        return (
          <div className="text-white">
            <label
              htmlFor="learningStyle"
              className="text-sm text-gray-300 mb-2 block"
            >
              Preferred Learning Style
            </label>
            <div className="relative">
              <select
                id="learningStyle"
                className="w-full bg-white/5 text-white rounded-lg px-4 pl-10 py-3 focus:outline-none cursor-pointer"
                value={formData.learningStyle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    learningStyle: e.target.value,
                  }))
                }
              >
                <option value="">Select</option>
                <option value="visual">Visual</option>
                <option value="auditory">Auditory</option>
                <option value="kinesthetic">Kinesthetic</option>
              </select>
              <Brain
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto h-full flex justify-center items-center">
        <div className="flex w-full">
          {/* Sidebar */}
          <div className="w-1/3 pr-8 relative">
            <div className="sticky top-8 h-full">
              <h1 className="text-2xl font-bold text-white py-8">
                Department Details
              </h1>
              <div className="relative flex flex-col justify-between">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-700" />
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;

                  return (
                    <div
                      key={step.id}
                      className="relative flex items-start mb-8"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isActive
                            ? "text-white shadow-xl"
                            : "bg-gray-800 text-gray-400"
                        }`}
                        style={{
                          backgroundColor:
                            isActive && !isCompleted ? "#713ce9" : undefined,
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Icon size={20} />
                        )}
                      </div>
                      <div className="ml-4">
                        <h3
                          className={`font-semibold ${
                            isActive ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {step.description}
                        </p>
                        {isActive && (
                          <div className="mt-2 px-3 py-1 bg-secondary/20 rounded-full text-xs text-white inline-block">
                            Current Step
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-2/3">
            <div className="bg-primary rounded-2xl p-8">
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <div className="border-l-4 border-secondary h-6"></div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {steps[currentStep - 1].title}
                  </h2>
                </div>
              </div>

              {renderStepContent()}

              <div className="flex justify-end mt-8 space-x-4">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 rounded-lg text-gray-300 hover:text-white transition-all duration-200"
                  >
                    ← Previous
                  </button>
                )}
                <button
                  onClick={
                    currentStep === totalSteps
                      ? () => alert("Completed!")
                      : nextStep
                  }
                  className="px-8 py-3 rounded-lg font-medium text-white transition-all duration-200"
                  style={{ backgroundColor: "#713ce9" }}
                >
                  {currentStep === totalSteps
                    ? "Complete Setup"
                    : "Next Step →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFormCollection;
