import { useState, useEffect, useRef } from "react";
import GreetingHeader from "@/components/global/greeting-header";
import DepartmentFilter from "@/components/ui/department-filter";
import AddBatch from "@/features/batches/components/add-batch-dialog.jsx";
import AddButtonSecondary from "@/components/ui/add-button-secondary";
import BatchSelection from "@/features/batches/components/batch-selection";
import MdListBg from "@/components/ui/md-list-bg";
import SmBg from "@/components/ui/sm-bg";
import SmLayout from "@/components/global/sm-layout";
import {
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  PencilLine,
  ArrowUpRight,
} from "lucide-react";
import CourseFilter from "@/components/ui/course-filter";
import FilterSidebar from "@/components/ui/filter-sidebar";
import RectSearchBar from "@/components/ui/rect-search-bar";

const BatchesSm = ({
  selectedDepartment,
  setSelectedDepartment,
  selectedCourse,
  setSelectedCourse,
  selectedBatchId,
  setSelectedBatchId,
  isModalOpen,
  setIsModalOpen,
  nestedData,
  onEdit,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedBatchId, setExpandedBatchId] = useState(null);

  const handleClose = () => setIsModalOpen(false);
  const batches = selectedCourse?.batches || [];
  const selectedBatch = batches.find((b) => b.id === selectedBatchId);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setExpandedBatchId(null);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <SmLayout
        headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Batches", href: "/batches" },
        ]}
      >
        {/* Tablet */}
        <div className="hidden md:flex px-4 pb-4 flex-1 flex-col h-full pt-7 md:pt-0">
          <div className="relative min-h-screen">
            <div className="grid md:grid-cols-[1fr_0.5fr_1fr] grid-cols-1 gap-x-4 gap-y-4 text-white pt-7 md:pt-0 min-h-screen h-full">
              <div className="relative col-span-2 h-full">
                <MdListBg />
                <div className="relative grid grid-cols-3 gap-y-3 h-full grid-rows-[auto_auto_1fr_1fr_1fr_1fr]">
                  <div className="flex col-span-2 pt-5 px-5">
                    <p className="font-urbanistSemiBold text-lg text-white">
                      Batches
                    </p>
                  </div>
                  <div className="flex justify-end px-1 gap-x-2">
                    <div
                      className="bg-[#1C1C1C] w-7 h-7 flex items-center justify-center rounded-full border border-[#606060]"
                      onClick={() => setIsFilterOpen(true)}
                    >
                      <Filter className="w-4 h-4 text-white" />
                    </div>
                    <AddButtonSecondary
                      icon="/assets/icons/add-circle.svg"
                      label="Add"
                      className={"h-[60%]"}
                      onClick={() => setIsModalOpen(true)}
                    />
                  </div>
                  <div className="flex justify-end  col-span-3 mb-2 px-5">
                    <RectSearchBar className="w-full" />
                  </div>

                  <div className="col-span-3 flex flex-col row-start-3 row-span-4 gap-y-3 px-5 pb-5 overflow-y-auto max-h-[600px] h-[100%] scrollbar-thin flex-1">
                    <ul className="space-y-2">
                      {batches.map((batch) => (
                        <div
                          className="flex items-center gap-x-2"
                          key={batch.id}
                        >
                          <button
                            onClick={() => onEdit(batch)}
                            className="relative btn-slide p-2.5 4xl:p-4 3xl:p-3 2xl:p-3 rounded-full border border-secondary transition-colors duration-300 text-white group"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <PencilLine className="w-5 h-5 4xl:w-6 4xl:h-6 ..." />
                            </span>
                          </button>
                          <li
                            className={`flex items-center w-full justify-between gap-2 px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors ${
                              selectedBatchId === batch.id
                                ? "bg-secondary"
                                : "bg-white/5 hover:bg-white/10"
                            } text-white`}
                            onClick={() => setSelectedBatchId(batch.id)}
                          >
                            {batch.batchName}
                            {selectedBatchId === batch.id ? (
                              <ArrowRight className="w-5 h-5 4xl:w-7 4xl:h-7 3xl:w-6 3xl:h-6 2xl:w-5 2xl:h-5 lg:w-4 lg:h-4 " />
                            ) : (
                              <ArrowUpRight className="w-5 h-5 4xl:w-7 4xl:h-7 3xl:w-6 3xl:h-6 2xl:w-5 2xl:h-5 lg:w-4 lg:h-4 " />
                            )}
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="h-full flex flex-col gap-y-5">
                  <BatchSelection
                    selectedCourse={selectedCourse}
                    selectedBatchId={selectedBatchId}
                    setSelectedBatchId={setSelectedBatchId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="px-5 pt-7 md:hidden">
          <div className="relative min-h-screen h-full">
            <SmBg />
            <div className="relative grid grid-cols-3 gap-y-3 h-full grid-rows-[auto_auto_1fr_1fr_1fr_1fr] min-h-screen">
              <div className="flex col-span-2 pt-5 px-5">
                <p className="font-urbanistSemiBold text-white text-lg">
                  Batches
                </p>
              </div>
              <div className="flex justify-end px-1 gap-x-2">
                <div
                  className="bg-[#1C1C1C] w-7 h-7 flex items-center justify-center rounded-full border border-[#606060]"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <AddButtonSecondary
                  icon="/assets/icons/add-circle.svg"
                  label="Add"
                  className={"h-[60%]"}
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
              <div className="flex justify-end  col-span-3 mb-2 px-5">
                <RectSearchBar className="w-full" />
              </div>
              <div className="col-span-3 flex flex-col row-start-3 row-span-4 gap-y-3 px-5 pb-5 overflow-y-auto max-h-[600px] h-[100%] scrollbar-thin flex-1 ">
                <ul className="space-y-2">
                  {batches.map((batch) => (
                    <li
                      key={batch.id}
                      className={`flex flex-col items-center gap-x-2 w-full`}
                    >
                      <div
                        onClick={() => {
                          if (expandedBatchId === batch.id) {
                            setExpandedBatchId(null);
                          } else {
                            setExpandedBatchId(batch.id);
                            setSelectedBatchId(batch.id);
                          }
                        }}
                        className={`flex items-center w-full justify-between gap-2 px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors ${
                          expandedBatchId === batch.id
                            ? "bg-secondary"
                            : "bg-white/5 hover:bg-white/10"
                        } text-white`}
                      >
                        {batch.batchName}
                        <div className="h-[40px] flex items-center justify-center">
                          {expandedBatchId === batch.id ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </div>

                      {expandedBatchId === batch.id &&
                        selectedBatch?.students?.length > 0 && (
                          <div className="mt-4 space-y-2 w-full px-4">
                            <div className="flex justify-end">
                              <AddButtonSecondary
                                icon={
                                  <PencilLine className="w-4 4xl:w-7 2xl:w-5 lg:w-3" />
                                }
                                className={"!py-1"}
                                label="Edit"
                                onClick={() => onEdit(batch)}
                              />
                            </div>
                            <p className="text-sm font-semibold text-[#9e7ceb]">
                              Students
                            </p>
                            <ul className="list-disc text-sm text-white mt-2 ml-4">
                              {selectedBatch.students.map((s) => (
                                <li key={s.id}>{s.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        >
          <DepartmentFilter
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
          <CourseFilter
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            courses={selectedDepartment?.courses || []}
          />
        </FilterSidebar>
      </SmLayout>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-stretch justify-stretch">
          <div className="relative w-full h-full overflow-auto">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>
            <AddBatch onClose={handleClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default BatchesSm;
