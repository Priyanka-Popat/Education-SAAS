import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import Table from "@/components/global/table";
import SyllabusData from "@/data/NestedData.json";
import { useEffect, useMemo, useState } from "react";
import DepartmentFilter from "@/components/ui/department-filter";
import Heading from "@/components/ui/heading";
import AddButton from "@/components/ui/add-button";
import CourseFilter from "@/components/ui/course-filter";
import SyllabusDialog from "../components/syllabus-dialog";

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
        className="text-sm text-secondary hover:underline cursor-pointer"
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
        <div className="col-start-1 row-start-2 col-span-12 row-span-9 relative px-4 pb-4 c9 text-white">
          <div className="courses-bg grid grid-cols-11 grid-rows-7 w-full h-full">
            <Heading heading="Syllabus" />

            <div className="col-start-6 row-start-1 col-span-6 flex px-5 py-5 gap-x-3 items-end justify-end h-full">
              <DepartmentFilter
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={(dept) => {
                  setSelectedDepartment(dept);
                  setSelectedDeptId(dept?.id || null);

                  // setSelectedCourse(dept?.courses[0]?.fullForm || "");
                }}
                setSelectedDeptId={setSelectedDeptId}
              />

              <CourseFilter
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                courses={selectedDepartment?.courses || []}
              />

              <AddButton
                label="Add new Syllabus"
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            <div className="col-start-1 row-start-2 col-span-12 c13 row-span-8 px-5 pt-8 pb-5">
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
      </DashboardLayout>

      <SyllabusDialog
        isOpen={isModalOpen}
        onClose={handleClose}
        initialDeptId={selectedDeptId}
      />
    </>
  );
};

export default Syllabus;
