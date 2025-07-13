import { useState, useMemo, useEffect } from "react";
// import courses from "@/data/NestedData.json";
import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import Heading from "@/components/ui/heading";
import AddButton from "@/components/ui/add-button";
import DepartmentFilter from "@/components/ui/department-filter";
import AttendanceBg from "@/components/ui/attendance-bg";
import SemDialog from "@/features/semesters/components/semester-dialog.jsx";
import SemesterSection from "@/features/courses/components/semester-selection";
import CourseList from "@/features/courses/components/course-list";
import CourseDialog from "@/features/departments/components/course-dialog";
import CoursesSm from "@/features/courses/components/courses-sm";
import RectSearchBar from "@/components/ui/rect-search-bar";
import Loader from "@/components/ui/loader";

const Courses = () => {
  const [isCourseLoading, setIsCourseLoading] = useState(true);
  const [departmentsData, setDepartmentsData] = useState([]);

  const [selectedDeptId, setSelectedDeptId] = useState(departmentsData[0]?.id);
  const [selectedDepartment, setSelectedDepartment] = useState(
    departmentsData[0]
  );
  const [selectedCourseId, setSelectedCourseId] = useState(
    departmentsData[0]?.courses[0]?.id
  );
  const [selectedSemesterName, setSelectedSemesterName] = useState("");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCourseData, setEditCourseData] = useState(null);
  const [courseDialogMode, setCourseDialogMode] = useState("add");

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
    let isMounted = true;

    import("@/data/NestedData.json").then((mod) => {
      if (isMounted) {
        const data = mod.default;
        setDepartmentsData(data);
        setSelectedDepartment(data[0]);
        setSelectedDeptId(data[0]?.id);
        setSelectedCourseId(data[0]?.courses?.[0]?.id);
        setSelectedSemesterName(
          data[0]?.courses?.[0]?.semesters?.[0]?.semesterName || ""
        );
        setIsCourseLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

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

              <div className="relative col-start-6 row-start-1 col-span-6 flex px-5 py-5 4xl:p-0 2xl:p-0 lg:p-0 items-end 2xl:items-start lg:items-start justify-end h-full gap-x-3">
                <RectSearchBar />
                <DepartmentFilter
                  selectedDepartment={selectedDepartment}
                  setSelectedDepartment={setSelectedDepartment}
                  setSelectedDeptId={setSelectedDeptId}
                />

                <AddButton
                  label="Add Course"
                  onClick={() => {
                    setCourseDialogMode("add");
                    setEditCourseData(null);
                    setIsCourseModalOpen(true);
                  }}
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
                {isCourseLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader />
                  </div>
                ) : (
                  <CourseList
                    courses={filteredCourses}
                    selectedCourseId={selectedCourseId}
                    setSelectedCourseId={setSelectedCourseId}
                    setSelectedSemesterName={setSelectedSemesterName}
                    onEdit={(course) => {
                      setEditCourseData(course);
                      setCourseDialogMode("edit");
                      setIsCourseModalOpen(true);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SemDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <CourseDialog
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        initialDeptId={selectedDeptId}
        mode={courseDialogMode}
        initialData={editCourseData}
        onSubmit={(data) => {
          console.log("Course submitted:", data);
          setIsCourseModalOpen(false);
        }}
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
        onEdit={(course) => {
          setEditCourseData(course);
          setCourseDialogMode("edit");
          setIsCourseModalOpen(true);
        }}
      />
    </>
  );
};

export default Courses;
