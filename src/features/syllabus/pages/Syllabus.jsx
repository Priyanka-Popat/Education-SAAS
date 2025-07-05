import { useEffect, useMemo, useState, useRef } from "react";
import SyllabusData from "@/data/NestedData.json";
import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import Table from "@/components/global/table";
import DepartmentFilter from "@/components/ui/department-filter";
import Heading from "@/components/ui/heading";
import AddButton from "@/components/ui/add-button";
import CourseFilter from "@/components/ui/course-filter";
import SyllabusBg from "@/components/ui/syllabus-bg";
import SyllabusDialog from "@/features/syllabus/components/syllabus-dialog";
import SyllabusSm from "@/features/syllabus/components/syllabus-sm";
import SearchBar from "@/components/ui/search-bar";

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

const Syllabus = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (SyllabusData.length > 0) {
      setSelectedDepartment(SyllabusData[0]);
      setSelectedDeptId(SyllabusData[0].id);
      setSelectedCourse(SyllabusData[0].courses[0] || null);
    }
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      setSelectedCourse(selectedDepartment.courses[0] || null);
      setSelectedDeptId(selectedDepartment.id);
    }
  }, [selectedDepartment]);

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

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  return (
    <>
      <DashboardLayout
        className="bg-[#131313]"
        headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Syllabus", href: "/syllabus" },
        ]}
      >
        <div className="lg:col-start-1 xl:row-start-2 lg:row-start-3 lg:col-span-12 lg:row-span-9 col-start-1 row-start-3 col-span-6 row-span-10 relative px-4 hdplus:px-[21px] 2xl:px-5 2xl:pb-5 pb-4 c9 lg:pt-0 xl:pt-[1.5rem] 4xl:pt-[2.5rem] 3xl:pt-[2rem] 2xl:pt-[2rem] text-white hidden lg:block">
          <div className="w-full relative h-full">
            <SyllabusBg />
            <div className="grid grid-cols-11 grid-rows-9 3xl:grid-rows-8 w-full h-full">
              <Heading heading="Syllabus" />

              <div className="relative col-start-5 row-start-1 col-span-7 flex px-5 py-5 4xl:p-0 2xl:p-0 lg:p-0 items-end 2xl:items-start lg:items-start justify-end h-full gap-x-3">
                <input type="search" className="p-2 pr-10 bg-[#FFFFFF0F] border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 cursor-pointer text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs"  placeholder="Search..." />
                <DepartmentFilter
                  selectedDepartment={selectedDepartment}
                  setSelectedDepartment={(dept) => {
                    setSelectedDepartment(dept);
                    setSelectedDeptId(dept?.id || null);
                  }}
                  setSelectedDeptId={setSelectedDeptId}
                />

                <CourseFilter
                  selectedCourse={selectedCourse}
                  setSelectedCourse={setSelectedCourse}
                  courses={selectedDepartment?.courses || []}
                />

                <AddButton
                  label="Add Syllabus"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>

              

              <div className="col-start-1 row-start-2 col-span-12 c13 row-span-7 px-5 pt-3 4xl:pt-3 pb-5">
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
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SyllabusDialog
        isOpen={isModalOpen}
        onClose={handleClose}
        initialDeptId={selectedDeptId}
      />

      <SyllabusSm
        SyllabusData={SyllabusData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
      />
    </>
  );
};

export default Syllabus;
