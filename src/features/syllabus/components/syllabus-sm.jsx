import SmLayout from "@/components/global/sm-layout";
import GreetingHeader from "@/components/global/greeting-header";
import AddButtonSecondary from "@/components/ui/add-button-secondary";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";
import DepartmentFilter from "@/components/ui/department-filter";
import CourseFilter from "@/components/ui/course-filter";
import { useState, useEffect, useMemo } from "react";
import Table from "@/components/global/table";
import FilterSidebar from "@/components/ui/filter-sidebar";
import SyllabusBgMd from "@/features/syllabus/components/syllabus-bg-md";
import SmBg from "@/components/ui/sm-bg";

const SyllabusSm = ({
  SyllabusData,
  isModalOpen,
  setIsModalOpen,
  selectedDepartment,
  setSelectedDepartment,
  selectedCourse,
  setSelectedCourse,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const headers = [
    { key: "Course", label: "Course", align: "left", width: "35%" },
    { key: "From", label: "From", align: "center", width: "15%" },
    { key: "To", label: "To", align: "center", width: "15%" },
    {
      key: "syllabusPdf",
      label: "Syllabus",
      align: "center",
      width: "15%",
      render: (value, row) => (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className=" text-sm 4xl:text-2xl 3xl:text-lg text-center hd:text-sm font-urbanistRegular text-secondary hover:underline cursor-pointer"
        >
          View Syllabus
        </a>
      ),
    },
  ];

  useEffect(() => {
    setSelectedCourseId(null);
  }, [selectedDepartment, selectedCourse]);

  const filteredSyllabus = useMemo(() => {
    if (!selectedDepartment) return [];

    const seen = new Set();
    const results = [];

    SyllabusData.forEach((dept) => {
      if (dept.id !== selectedDepartment.id) return;
      if (!Array.isArray(dept.courses)) return;

      dept.courses.forEach((course) => {
        if (selectedCourse && course.id !== selectedCourse.id) return;

        if (!Array.isArray(course.semesters)) return;

        course.semesters.forEach((sem) => {
          const key = `${course.fullForm}_${course.from}_${course.to}_${sem.syllabusPdf}`;

          if (!seen.has(key)) {
            seen.add(key);
            results.push({
              Course: `${course.shortForm} : ${course.fullForm}`,
              From: course.from,
              To: course.to,
              syllabusPdf: sem.syllabusPdf || "",
            });
          }
        });
      });
    });

    return results;
  }, [selectedDepartment, selectedCourse]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedCourseId(null);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <SmLayout
      headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Syllabus", href: "/syllabus" },
      ]}
    >
      <div className="px-5">
        <div className="grid md:grid-cols-1 grid-cols-1 gap-x-4 gap-y-4 text-white pt-7 min-h-screen">
          <div className="relative">
            <div className="hidden md:block">
              <div className="hidden md:block">
                <SyllabusBgMd />
              </div>
            </div>
            <div className="md:hidden">
              <div className="md:hidden">
                <SmBg />
              </div>
            </div>

            <div className="relative grid grid-cols-3 gap-y-3 h-full grid-rows-[auto_auto_1fr_1fr_1fr_1fr]">
              <div className="flex col-span-2 pt-5 px-5">
              <p className="font-urbanistSemiBold text-lg">Syllabus</p>
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
              {/* tablet */}
              <div className="col-span-3 row-start-3 row-span-4 px-5 pb-5 flex-col gap-y-3 overflow-y-auto max-h-[550px] relative z-10  hidden scrollbar-thin md:flex">
                {filteredSyllabus.length > 0 ? (
                  <Table
                    data={filteredSyllabus}
                    headers={headers}
                    showActions={true}
                  />
                ) : (
                  <p className="text-center text-white text-lg mt-10">
                    No syllabus exists.
                  </p>
                )}
              </div>

              {/* mobile */}
              <div className="col-span-3 flex flex-col row-start-3 row-span-4 gap-y-3 px-5 pb-5 overflow-y-auto max-h-[600px] h-[100%] scrollbar-thin flex-1 md:hidden">
                <ul className="space-y-2">
                  {selectedDepartment?.courses
                    ?.filter(
                      (course) =>
                        !selectedCourse || course.id === selectedCourse.id
                    )
                    .map((course) => {
                      const syllabusPdf =
                        course.semesters?.find((sem) => sem.syllabusPdf)
                          ?.syllabusPdf || "";

                      return (
                        <li
                          className="flex flex-col items-center gap-x-2"
                          key={course.id}
                        >
                          <div
                            onClick={() =>
                              setSelectedCourseId(
                                selectedCourseId === course.id
                                  ? null
                                  : course.id
                              )
                            }
                            className={`flex items-center w-full justify-between gap-2 px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors ${
                              selectedCourseId === course.id
                                ? "bg-secondary"
                                : "bg-white/5 hover:bg-white/10"
                            } text-white`}
                          >
                            <div className="flex flex-col">
                              <span className="font-semibold">
                                {course.shortForm} : {course.fullForm}
                              </span>
                            </div>
                            <div className="h-[40px] flex items-center justify-center">
                              {selectedCourseId === course.id ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </div>
                          </div>

                          {selectedCourseId === course.id && (
                            <div className="mt-2 px-4 w-full flex items-center justify-between border-b border-white/20 py-2">
                              <div className="flex flex-col gap-y-2">
                                <p className="text-white text-sm">
                                  From:{" "}
                                  <span className="text-grey">
                                    {course.from}
                                  </span>
                                </p>
                                <p className="text-white text-sm">
                                  To:{" "}
                                  <span className="text-grey">{course.to}</span>
                                </p>
                              </div>
                              {syllabusPdf ? (
                                <a
                                  href={syllabusPdf}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-secondary underline"
                                >
                                  View Syllabus
                                </a>
                              ) : (
                                <p className="text-sm text-gray-400">
                                  No syllabus available
                                </p>
                              )}
                            </div>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
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
  );
};

export default SyllabusSm;
