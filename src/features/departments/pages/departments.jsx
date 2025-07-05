import { useState, useEffect, useMemo } from "react";
import departments from "@/data/NestedData.json";
import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import AttendanceBg from "@/components/ui/attendance-bg";
import Heading from "@/components/ui/heading";
import AddButton from "@/components/ui/add-button";
import CourseSection from "@/features/departments/components/course-selection";
import DepartmentList from "@/features/departments/components/department-list";
import CourseDialog from "@/features/departments/components/course-dialog";
import DepartmentDialog from "@/features/departments/components/department-dialog";
import DepartmentSm from "@/features/departments/components/deparment-sm";


const Departments = () => {
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const selectedDepartment = useMemo(() => {
    return departments.find((d) => d.id === Number(selectedDeptId)) || null;
  }, [selectedDeptId]);

  const selectedCourse = useMemo(() => {
    return (
      selectedDepartment?.courses.find(
        (c) => c.id === Number(selectedCourseId)
      ) || null
    );
  }, [selectedDepartment, selectedCourseId]);

  useEffect(() => {
    if (!selectedDeptId && departments.length > 0) {
      const firstDept = departments[0];
      setSelectedDeptId(firstDept.id);
      setSelectedCourseId(firstDept.courses?.[0]?.id || null);
      setSelectedSemesterIndex(0);
    } else if (selectedDepartment) {
      if (selectedDepartment.courses?.length > 0) {
        setSelectedCourseId(selectedDepartment.courses[0].id);
      } else {
        setSelectedCourseId(null);
      }
      setSelectedSemesterIndex(0);
    }
  }, [selectedDeptId, selectedDepartment]);

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
          { label: "Departments", href: "/departments" },
        ]}
      >
        <div className="lg:col-start-1 xl:row-start-2 lg:row-start-3 lg:col-span-12 lg:row-span-9 col-start-1 row-start-3 col-span-6 row-span-10 relative px-4 hdplus:px-[21px] 2xl:px-5 2xl:pb-5 pb-4 c9 lg:pt-0 xl:pt-[1.5rem] 4xl:pt-[2.5rem] 3xl:pt-[2rem] 2xl:pt-[2rem] text-white hidden lg:block">
          <div className="w-full relative h-full">
            <AttendanceBg />
            <div className="grid grid-cols-11 grid-rows-9 3xl:grid-rows-8 w-full h-full">
              <Heading heading="Departments" />
              <div className="relative col-start-8 row-start-1 col-span-6 gap-x-3 flex px-5 py-5 4xl:p-0 2xl:p-0 lg:p-0 items-end 2xl:items-start lg:items-start justify-end h-full">
                <input type="search" className="p-2 pr-10 bg-[#FFFFFF0F] border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 cursor-pointer text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs"  placeholder="Search..." />
                <AddButton
                  label="Add Department"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>

              
              <div className="col-start-1 row-start-2 col-span-8 c13 row-span-6 2xl:row-span-7 px-5 pt-3 4xl:pt-3 pb-5">
                <DepartmentList
                  departments={departments}
                  selectedDeptId={selectedDeptId}
                  setSelectedDeptId={setSelectedDeptId}
                  setSelectedCourseId={setSelectedCourseId}
                />
              </div>

              <CourseSection
                selectedDept={selectedDepartment}
                selectedCourseId={selectedCourseId}
                setSelectedCourseId={setSelectedCourseId}
                selectedCourse={selectedCourse}
                onAddCourse={() => setIsCourseModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>

      <DepartmentDialog isOpen={isModalOpen} onClose={handleClose} />

      <CourseDialog
        isOpen={isCourseModalOpen}
        onClose={handleClose}
        initialDeptId={selectedDeptId}
      />

      <DepartmentSm
        departments={departments}
        selectedDeptId={selectedDeptId}
        setSelectedDeptId={setSelectedDeptId}
        setSelectedCourseId={setSelectedCourseId}
        selectedDept={selectedDepartment}
        selectedCourseId={selectedCourseId}
        selectedCourse={selectedCourse}
        onAddCourse={() => setIsCourseModalOpen(true)}
      />
    </>
  );
};

export default Departments;
