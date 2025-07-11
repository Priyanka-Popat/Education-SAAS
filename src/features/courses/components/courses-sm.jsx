import { useState, useMemo, useEffect, useRef } from "react";
import GreetingHeader from "@/components/global/greeting-header";
import SemesterSection from "@/features/courses/components/semester-selection";
import DepartmentFilter from "@/components/ui/department-filter";
import CourseDialog from "@/features/departments/components/course-dialog";
import { MoreVertical, Filter } from "lucide-react";
import SmLayout from "@/components/global/sm-layout";
import {
  PencilLine,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AddButtonSecondary from "@/components/ui/add-button-secondary";
import MdListBg from "@/components/ui/md-list-bg";
import SmBg from "@/components/ui/sm-bg";
import SubjectDialog from "@/features/semesters/components/semester-dialog.jsx";
import FilterSidebar from "@/components/ui/filter-sidebar";
import RectSearchBar from "@/components/ui/rect-search-bar";

const CoursesSm = ({
  selectedDeptId,
  setSelectedDeptId,
  setSelectedCourseId,
  selectedCourseId,
  selectedSemesterName,
  setSelectedSemesterName,
  selectedCourse,
  selectedSemester,
  courses,
  selectedDepartment,
  setSelectedDepartment,
  onEdit
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  const handleClose = () => {
    setIsModalOpen(false);
    setIsCourseModalOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setExpandedCourseId(null);
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
          { label: "Courses", href: "/courses" },
        ]}
      >
        {/* tablet code */}
        <div className="hidden md:flex px-4 pb-4 flex-1 flex-col h-full pt-7 md:pt-0">
          <div className="relative min-h-screen">
            <div className="grid md:grid-cols-[1fr_0.5fr_1fr] grid-cols-1 gap-x-4 gap-y-4 text-white pt-7 md:pt-0 min-h-screen  h-full">
              <div className="relative col-span-2 h-full">
                <MdListBg />

                <div className="relative grid grid-cols-3 gap-y-3 h-full grid-rows-[auto_auto_1fr_1fr_1fr_1fr]">
                  <div className="flex col-span-2 pt-5 px-5">
                    <p className="font-urbanistSemiBold text-lg 2xl:text-lg 4xl:text-3xl 3xl:text-2xl hd:text-base lg:text-base">
                      Courses
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
                      icon={true}
                      className={"h-[60%]"}
                      label="Add"
                      onClick={() => setIsCourseModalOpen(true)}
                    />
                  </div>

                  <div className="flex justify-end  col-span-3 mb-2 px-5">
                    <RectSearchBar className={"w-full"} />
                  </div>

                  <div className="col-span-3 flex flex-col row-start-3 row-span-4 gap-y-3 px-5 pb-5 overflow-y-auto max-h-[600px] h-[100%] scrollbar-thin flex-1">
                    <ul className="space-y-2">
                      {courses.map((course) => (
                        <div
                          className="flex items-center gap-x-2"
                          key={course.id}
                        >
                          <button
                            onClick={() => onEdit(course)}
                            className="relative btn-slide p-2.5 4xl:p-4 3xl:p-3 2xl:p-3 rounded-full border border-secondary transition-colors duration-300 text-white group"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <PencilLine className="w-5 h-5 4xl:w-6 4xl:h-6" />
                            </span>
                          </button>
                          <li
                            onClick={() => {
                              setSelectedCourseId(course.id);
                              setSelectedSemesterName(
                                course.semesters?.[0]?.semesterName || ""
                              );
                            }}
                            className={`flex items-center w-full justify-between gap-2 px-4 py-3 4xl:py-4 4xl:px-6 2xl:py-3 2xl:px-4 hd:py-2 hd:px-4 lg:py-2 text-sm 4xl:text-2xl 3xl:text-xl hd:text-sm 2xl:text-base rounded-lg cursor-pointer transition-colors ${
                              selectedCourseId === course.id
                                ? "bg-secondary"
                                : "bg-white/5 hover:bg-white/10"
                            } text-white`}
                          >
                            {course.shortForm} : {course.fullForm}
                            {selectedCourseId === course.id ? (
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
                  <SemesterSection
                    selectedSemesterName={selectedSemesterName}
                    setSelectedSemesterName={setSelectedSemesterName}
                    selectedCourse={selectedCourse}
                    selectedSemester={selectedSemester}
                    onAddSemester={() => setIsModalOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="px-5 pt-7 md:hidden h-full">
          <div className="relative min-h-screen h-full">
            <div className="">
              <SmBg />
            </div>

            <div className="relative grid grid-cols-3 gap-y-3 h-full grid-rows-[auto_auto_1fr_1fr_1fr_1fr] min-h-screen">
              <div className="flex col-span-2 pt-5 px-5">
                <p className="font-urbanistSemiBold text-white text-lg 2xl:text-lg 4xl:text-3xl 3xl:text-2xl hd:text-base lg:text-base">
                  Courses
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
                  icon={true}
                  className={"h-[60%]"}
                  label="Add"
                  onClick={() => setIsCourseModalOpen(true)}
                />
              </div>

              <div className="flex justify-end  col-span-3 mb-2 px-5">
                <RectSearchBar className={"w-full"} />
              </div>

              <div className="col-span-3 flex flex-col row-start-3 row-span-4 gap-y-3 px-5 pb-5 overflow-y-auto max-h-[600px] h-[100%] scrollbar-thin flex-1 ">
                <ul className="space-y-2">
                  {courses.map((course) => (
                    <div className="flex gap-x-2 items-center" key={course.id}>
                      <button onClick={() => onEdit(course)} className="">
                        <PencilLine className="w-5 h-5 4xl:w-6 4xl:h-6 text-white" />
                      </button>
                      <li
                        className="flex flex-col items-center gap-x-2 w-full"
                        key={course.id}
                      >
                        <div
                          onClick={() => {
                            if (expandedCourseId === course.id) {
                              setExpandedCourseId(null);
                            } else {
                              setExpandedCourseId(course.id);
                              setSelectedCourseId(course.id);
                              setSelectedSemesterName(
                                course.semesters?.[0]?.semesterName || ""
                              );
                            }
                          }}
                          className={`flex items-center w-full justify-between gap-2 px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors ${
                            expandedCourseId === course.id
                              ? "bg-secondary"
                              : "bg-white/5 hover:bg-white/10"
                          } text-white`}
                        >
                          {course.shortForm} : {course.fullForm}
                          <div className="h-[40px] flex items-center justify-center">
                            {expandedCourseId === course.id ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </div>

                        {/* Accordion Content */}
                        {expandedCourseId === course.id && (
                          <div className="mt-4 space-y-4 w-full px-4">
                            {course.semesters?.map((sem) => (
                              <div
                                key={sem.id}
                                className="border-b border-white/20 py-2"
                              >
                                <p className="text-sm font-semibold text-[#9e7ceb]">
                                  {sem.semesterName}
                                </p>

                                <ul className="list-disc text-sm text-white mt-2 ml-4">
                                  {sem.tracks?.map((track) => (
                                    <li key={track.id} className="mb-2">
                                      <span className="text-secondary font-medium">
                                        {track.name}:
                                      </span>
                                      <ul className="ml-4 mt-1 list-square">
                                        {track.subjects.map((subj) => (
                                          <li key={subj.id}>
                                            {subj.code} - {subj.name}
                                          </li>
                                        ))}
                                      </ul>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    </div>
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
            setSelectedDeptId={setSelectedDeptId}
          />
        </FilterSidebar>
      </SmLayout>

      <SubjectDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <CourseDialog
        isOpen={isCourseModalOpen}
        onClose={handleClose}
        initialDeptId={selectedDeptId}
      />
    </>
  );
};

export default CoursesSm;
