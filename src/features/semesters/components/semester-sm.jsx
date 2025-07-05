import { useState, useEffect, useRef } from "react";
import GreetingHeader from "@/components/global/greeting-header";
import DepartmentFilter from "@/components/ui/department-filter";
import CourseFilter from "@/components/ui/course-filter";
import SemesterDialog from "@/features/semesters/components/semester-dialog";
import {
  Filter,
  ChevronDown,
  ChevronUp,
  PencilLine,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import AddButtonSecondary from "@/components/ui/add-button-secondary";
import MdListBg from "@/components/ui/md-list-bg";
import SmBg from "@/components/ui/sm-bg";
import SmLayout from "@/components/global/sm-layout";
import TrackSelection from "@/features/semesters/components/track-selection";
import FilterSidebar from "@/components/ui/filter-sidebar";

const SemesterSm = ({
  selectedDepartment,
  setSelectedDepartment,
  selectedCourse,
  setSelectedCourse,
  selectedSemesterIndex,
  setSelectedSemesterIndex,
  selectedTrackName,
  setSelectedTrackName,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const semesters = selectedCourse?.semesters || [];
  const selectedSemester = semesters[selectedSemesterIndex];
  const selectedTrack = selectedSemester?.tracks?.find(
    (track) => track.name === selectedTrackName
  );
  const [expandedSemesterIndex, setExpandedSemesterIndex] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setExpandedSemesterIndex(null);
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
          { label: "Semesters", href: "/semesters" },
        ]}
      >
        {/* Tablet View */}
        <div className="hidden md:flex px-4 pb-4 flex-1 flex-col h-full pt-7 md:pt-0">
          <div className="relative min-h-screen">
            <div className="grid md:grid-cols-[1fr_0.5fr_1fr] grid-cols-1 gap-x-4 gap-y-4 text-white pt-7 md:pt-0 min-h-screen h-full">
              <div className="relative col-span-2 h-full">
                <MdListBg />
                <div className="relative grid grid-cols-3 gap-y-3 h-full grid-rows-[auto_auto_1fr_1fr_1fr_1fr]">
                  <div className="flex col-span-2 pt-5 px-5">
                    <p className="font-urbanistSemiBold text-lg">Semesters</p>
                  </div>
                  <div className="flex justify-end gap-x-2">
                    <div
                      className="bg-[#1C1C1C] w-7 h-7 flex items-center justify-center rounded-full border border-[#606060]"
                      onClick={() => setIsFilterOpen(true)}
                    >
                      <Filter className="w-4 h-4 text-white" />
                    </div>
                    <AddButtonSecondary
                      icon={true}
                      className={"h-[60%]"}
                      label="Add"
                      onClick={() => setIsModalOpen(true)}
                    />
                  </div>

                  <div className="flex justify-end  col-span-3 mb-2 px-5">
                    <input
                      type="search"
                      className="p-2 pr-10 bg-[#FFFFFF0F] border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 cursor-pointer text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs"
                      placeholder="Search..."
                    />
                  </div>

                  <div className="col-span-3 flex flex-col row-start-3 row-span-4 gap-y-3 px-5 pb-5 overflow-y-auto max-h-[600px] h-[100%] scrollbar-thin flex-1">
                    <ul className="space-y-2">
                      {semesters.map((semester, index) => (
                        <div
                          className="flex items-center gap-x-2"
                          key={semester.id}
                        >
                          <div className="p-2 4xl:p-4 3xl:p-3 2xl:p-3 rounded-full border border-secondary">
                            <PencilLine className="w-5 h-5 4xl:w-7 4xl:h-7 3xl:w-6 3xl:h-6 2xl:w-5 2xl:h-5 lg:w-4 lg:h-4 " />
                          </div>
                          <li
                            onClick={() => {
                              setSelectedSemesterIndex(index);
                              setSelectedTrackName(
                                semester.tracks?.[0]?.name || ""
                              );
                            }}
                            className={`flex items-center w-full justify-between gap-2 px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors ${
                              selectedSemesterIndex === index
                                ? "bg-secondary"
                                : "bg-white/5 hover:bg-white/10"
                            }`}
                          >
                            {semester.semesterName}
                            {selectedSemesterIndex === index ? (
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
                <TrackSelection
                  tracks={selectedSemester?.tracks || []}
                  selectedTrackName={selectedTrackName}
                  setSelectedTrackName={setSelectedTrackName}
                  subjects={selectedTrack?.subjects || []}
                  onAddSubject={() => {}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="px-5 pt-7 md:hidden">
          <div className="relative min-h-screen h-full">
            <SmBg />

            <div className="relative grid grid-cols-3 gap-y-3 h-full grid-rows-[auto_auto_1fr_1fr_1fr_1fr] min-h-screen">
              <div className="flex col-span-2 pt-5 px-5">
                <p className="font-urbanistSemiBold text-white text-lg">
                  Semesters
                </p>
              </div>
              <div className="flex justify-end gap-x-2">
                <div
                  className="bg-[#1C1C1C] w-7 h-7 flex items-center justify-center rounded-full border border-[#606060]"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <AddButtonSecondary
                  icon={true}
                  label="Add"
                  className={"h-[60%]"}
                  onClick={() => setIsModalOpen(true)}
                />
              </div>

              <div className="flex justify-end  col-span-3 mb-2 px-5">
                <input
                  type="search"
                  className="p-2 pr-10 bg-[#FFFFFF0F] border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 cursor-pointer text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs"
                  placeholder="Search..."
                />
              </div>

              <div className="col-span-3 flex flex-col row-start-3 row-span-4 gap-y-3 px-5 pb-5 overflow-y-auto max-h-[600px] h-[100%] scrollbar-thin flex-1 ">
                <ul className="space-y-2">
                  {semesters.map((semester, index) => (
                    <li key={semester.id} className="flex flex-col gap-y-2">
                      <div
                        onClick={() => {
                          if (expandedSemesterIndex === index) {
                            setExpandedSemesterIndex(null);
                          } else {
                            setExpandedSemesterIndex(index);
                            setSelectedSemesterIndex(index);
                            setSelectedTrackName(
                              semester.tracks?.[0]?.name || ""
                            );
                          }
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors text-white text-sm ${
                          expandedSemesterIndex === index
                            ? "bg-secondary"
                            : "bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        {semester.semesterName}
                        {expandedSemesterIndex === index ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>

                      {expandedSemesterIndex === index && (
                        <div className="mt-2 space-y-4 px-4">
                          {(semester.tracks || []).map((track) => (
                            <div key={track.id}>
                              <p className="text-sm font-semibold text-[#9e7ceb]">
                                {track.name}
                              </p>
                              <ul className="list-disc ml-4 mt-1 text-sm text-white">
                                {(track.subjects || []).map((subj) => (
                                  <li key={subj.id}>
                                    {subj.code} - {subj.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SmLayout>

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

      <SemesterDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SemesterSm;
