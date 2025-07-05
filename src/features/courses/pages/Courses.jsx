import { useState, useMemo, useEffect } from "react";
import courses from "@/data/NestedData.json";
import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import Heading from "@/components/ui/heading";
import SearchBar from "@/components/ui/search-bar";
import AddButton from "@/components/ui/add-button";
import DepartmentFilter from "@/components/ui/department-filter";
import AttendanceBg from "@/components/ui/attendance-bg";
import SubjectDialog from "@/features/courses/components/subject-dialog.jsx";
import SemesterSection from "@/features/courses/components/semester-selection";
import CourseList from "@/features/courses/components/course-list";
import CourseDialog from "@/features/departments/components/course-dialog";
import CoursesSm from "@/features/courses/components/courses-sm";

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

  return (
    <>
      <DashboardLayout
        className="bg-[#131313] relative hidden lg:grid"
        headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Courses", href: "/courses" },
        ]}
      >

        <div className="lg:col-start-1 xl:row-start-2 lg:row-start-3 lg:col-span-12 lg:row-span-9 col-start-1 row-start-3 col-span-6 row-span-10 relative px-4 hdplus:px-[21px] 2xl:px-5 2xl:pb-5 pb-4 c9 lg:pt-0 xl:pt-[1.5rem] 4xl:pt-[2.5rem] 3xl:pt-[2rem] 2xl:pt-[2rem] text-white hidden lg:block">
          <div className="w-full relative h-full">
            <AttendanceBg />
            <div className="grid grid-cols-11 grid-rows-9 3xl:grid-rows-8 w-full h-full">
              <Heading heading="Courses" />

              <div className="relative col-start-7 row-start-1 col-span-5 flex px-5 py-5 4xl:p-0 2xl:p-0 lg:p-0 items-end 2xl:items-start lg:items-start justify-end h-full gap-x-3">
                <input type="search" className="p-2 pr-10 bg-[#FFFFFF0F] border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 cursor-pointer text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs"  placeholder="Search..." />
                <DepartmentFilter
                  selectedDepartment={selectedDepartment}
                  setSelectedDepartment={setSelectedDepartment}
                  setSelectedDeptId={setSelectedDeptId}
                />

                <AddButton
                  label="Add  Course"
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
              

              <div className="col-start-1 row-start-2 col-span-8 row-span-7 px-5 pt-3 4xl:pt-3 pb-5 c13">
                <CourseList
                  courses={filteredCourses}
                  selectedCourseId={selectedCourseId}
                  setSelectedCourseId={setSelectedCourseId}
                  setSelectedSemesterName={setSelectedSemesterName}
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SubjectDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <CourseDialog
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        initialDeptId={selectedDeptId}
      />

      <CoursesSm
        selectedSemesterName={selectedSemesterName}
        setSelectedSemesterName={setSelectedSemesterName}
        selectedCourse={selectedCourse}
        selectedSemester={selectedSemester}
        onAddSemester={() => setIsModalOpen(true)}
        courses={filteredCourses}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        setSelectedDeptId={setSelectedDeptId}
      />
    </>
  );
};

export default Courses;
