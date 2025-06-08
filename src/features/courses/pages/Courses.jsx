import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import courses from "@/data/NestedData.json";
import { useState, useMemo, useEffect } from "react";
import SubjectDialog from "@/features/courses/components/subject-dialog.jsx";
import Heading from "@/components/ui/heading";
import AddButton from "@/components/ui/add-button";
import SemesterSection from "../components/semester-selection";
import CourseList from "@/features/courses/components/course-list";
import DepartmentFilter from "@/components/ui/department-filter";
import CourseDialog from "@/features/departments/components/course-dialog";

const Courses = () => {
  const [selectedDeptId, setSelectedDeptId] = useState(courses[0]?.id);
  const [selectedDepartment, setSelectedDepartment] = useState(courses[0]);
  const [selectedCourseId, setSelectedCourseId] = useState(
    courses[0]?.courses[0]?.id
  );
  const [selectedSemesterName, setSelectedSemesterName] = useState("");

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    return selectedDepartment?.courses || [];
  }, [selectedDepartment]);

  const selectedCourse = useMemo(() => {
    return selectedDepartment?.courses?.find(
      (course) => course.id === selectedCourseId
    );
  }, [selectedDepartment, selectedCourseId]);

  const selectedSemester = selectedCourse?.semesters?.find(
    (semester) => semester.semesterName === selectedSemesterName
  );

  useEffect(() => {
    if (selectedDepartment) {
      const firstCourse = selectedDepartment.courses?.[0];
      setSelectedCourseId(firstCourse?.id || "");
      setSelectedSemesterName(firstCourse?.semesters?.[0]?.semesterName || "");
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedCourse && !selectedSemesterName) {
      setSelectedSemesterName(
        selectedCourse.semesters?.[0]?.semesterName || ""
      );
    }
  }, [selectedCourse]);

  const handleClose = () => {
    setIsModalOpen(false);
    setIsCourseModalOpen(false);
  };

  return (
    <>
      <DashboardLayout
        className="bg-[#131313] relative"
        headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Courses", href: "/courses" },
        ]}
      >
        <div className="col-start-1 row-start-2 col-span-12 row-span-9 relative px-4 pb-4 c9 text-white">
          <div className="attendance-info grid grid-cols-11 grid-rows-7 w-full h-full">
            <Heading heading="Courses" />

            <div className="col-start-7 row-start-1 col-span-5 flex px-5 py-5 gap-x-3 items-end justify-end h-full">
              <DepartmentFilter
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                setSelectedDeptId={setSelectedDeptId}
              />

              <AddButton
                label="Add new Course"
                onClick={() => setIsCourseModalOpen(true)}
              />
            </div>

            <SemesterSection
              selectedSemesterName={selectedSemesterName}
              setSelectedSemesterName={setSelectedSemesterName}
              selectedCourse={selectedCourse}
              selectedSemester={selectedSemester}
              onAddSemester={() => setIsModalOpen(true)}
            />

            <div className="col-start-1 row-start-2 col-span-8 c13 row-span-6 px-5 pt-8 pb-5">
              <CourseList
                courses={filteredCourses}
                selectedCourseId={selectedCourseId}
                setSelectedCourseId={setSelectedCourseId}
                setSelectedSemesterName={setSelectedSemesterName}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SubjectDialog isOpen={isModalOpen} onClose={handleClose} />

      <CourseDialog
        isOpen={isCourseModalOpen}
        onClose={handleClose}
        initialDeptId={selectedDeptId}
      />
    </>
  );
};

export default Courses;
