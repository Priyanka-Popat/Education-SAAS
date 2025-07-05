import GreetingHeader from "@/components/global/greeting-header";
import { useState, useEffect } from "react";
import CourseSection from "@/features/departments/components/course-selection";
import CourseDialog from "@/features/departments/components/course-dialog";
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
import DepartmentDialog from "@/features/departments/components/department-dialog";

const DepartmentSm = ({
  departments,
  selectedDeptId,
  setSelectedDeptId,
  setSelectedCourseId,
  selectedDept,
  selectedCourseId,
  selectedCourse,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [expandedDeptId, setExpandedDeptId] = useState(null);

  const handleClose = () => {
    setIsModalOpen(false);
    setIsCourseModalOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setExpandedDeptId(null);
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
          { label: "Departments", href: "/departments" },
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
                      Departments
                    </p>
                  </div>
                  <div className="flex justify-end">
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
                      {departments.map((dept) => (
                        <div
                          className="flex items-center gap-x-2"
                          key={dept.id}
                        >
                          <div className="p-2 rounded-full border border-secondary">
                            <PencilLine className="w-5 h-5 " />
                          </div>
                          <li
                            onClick={() => {
                              if (dept.id !== selectedDeptId) {
                                setSelectedDeptId(dept.id);
                                setSelectedCourseId(
                                  dept.courses?.[0]?.id || ""
                                );
                              }
                            }}
                            className={`flex items-center w-full justify-between gap-2 px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors ${
                              selectedDeptId === dept.id
                                ? "bg-secondary"
                                : "bg-white/5 hover:bg-white/10"
                            } text-white`}
                          >
                            {dept.shortForm} : {dept.fullForm}
                            <div className="h-[40px] flex items-center justify-center">
                              {selectedDeptId === dept.id ? (
                                <ArrowRight className="w-5 h-5 " />
                              ) : (
                                <ArrowUpRight className="w-5 h-5 " />
                              )}
                            </div>
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="h-full flex flex-col gap-y-5">
                  <CourseSection
                    selectedDept={selectedDept}
                    selectedCourseId={selectedCourseId}
                    setSelectedCourseId={setSelectedCourseId}
                    selectedCourse={selectedCourse}
                    onAddCourse={() => setIsCourseModalOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="px-5 pt-7 md:hidden">
          <div className="relative min-h-screen h-full">
            <div className="">
              <SmBg />
            </div>

            <div className="relative grid grid-cols-3 gap-y-3 h-full grid-rows-[auto_auto_1fr_1fr_1fr_1fr] min-h-screen">
              <div className="flex col-span-2 pt-5 px-5">
                <p className="font-urbanistSemiBold text-lg 2xl:text-lg 4xl:text-3xl 3xl:text-2xl hd:text-base text-white lg:text-base">
                  Departments
                </p>
              </div>
              <div className="flex justify-end">
                <AddButtonSecondary
                  icon={true}
                  className={"h-[60%]"}
                  label="Add"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
              <div className="flex justify-end  col-span-3 mb-2 px-5">
                    <input type="search" className="p-2 pr-10 bg-[#FFFFFF0F] border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 cursor-pointer text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs"  placeholder="Search..." />
                  </div>
              <div className="col-span-3 flex flex-col row-start-3 row-span-4 gap-y-3 px-5 pb-5 overflow-y-auto max-h-[600px] h-[100%] scrollbar-thin flex-1 ">
                <ul className="space-y-2">
                  {departments.map((dept) => (
                    <li
                      className="flex flex-col items-center gap-x-2"
                      key={dept.id}
                    >
                      <div
                        onClick={() => {
                          if (expandedDeptId === dept.id) {
                            setExpandedDeptId(null);
                          } else {
                            setExpandedDeptId(dept.id);
                            setSelectedDeptId(dept.id);
                            setSelectedCourseId(dept.courses?.[0]?.id || "");
                          }
                        }}
                        className={`flex items-center w-full justify-between gap-2 px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors ${
                          expandedDeptId === dept.id
                            ? "bg-secondary"
                            : "bg-white/5 hover:bg-white/10"
                        } text-white`}
                      >
                        {dept.shortForm} : {dept.fullForm}
                        <div className="h-[40px] flex items-center justify-center">
                          {expandedDeptId === dept.id ? (
                            <ChevronUp className="w-5 h-5 " />
                          ) : (
                            <ChevronDown className="w-5 h-5 " />
                          )}
                        </div>
                      </div>

                      {/* accordionn */}
                      {expandedDeptId === dept.id && (
                        <div className="mt-4 space-y-2 w-full">
                          {dept.courses.map((course) => (
                            <div key={course.id} className=" px-4">
                              <p className="text-sm font-semibold text-[#9e7ceb]">
                                {course.shortForm} - {course.fullForm}
                              </p>
                              <ul className="list-disc text-sm text-white mt-2">
                                {course.semesters?.map((sem) => (
                                  <li
                                    key={sem.id}
                                    className="flex items-center justify-between border-b border-white/20 py-2"
                                  >
                                    <span>{sem.semesterName}</span>
                                    <a
                                      href={sem.syllabusPdf}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-secondary hover:underline ml-2 px-2 py-0.5 rounded"
                                    >
                                      View Syllabus
                                    </a>
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

      <DepartmentDialog isOpen={isModalOpen} onClose={handleClose} />

      <CourseDialog
        isOpen={isCourseModalOpen}
        onClose={handleClose}
        initialDeptId={selectedDeptId}
      />
    </>
  );
};

export default DepartmentSm;
