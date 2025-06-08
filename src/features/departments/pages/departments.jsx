import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import departments from "@/data/NestedData.json";
import { useState, useEffect, useMemo } from "react";
import Heading from "@/components/ui/heading";
import AddButton from "@/components/ui/add-button";
import CourseSection from "../components/course-selection";
import DepartmentList from "../components/department-list";
import CourseDialog from "@/features/departments/components/course-dialog";
import DepartmentDialog from "@/features/departments/components/department-dialog";

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
        <div className="col-start-1 row-start-2 col-span-12 row-span-9 relative px-4 pb-4 c9 text-white">
          <div className="attendance-info grid grid-cols-11 grid-rows-7 w-full h-full">
            <Heading heading="Departments" />
            <div className="col-start-9 row-start-1 col-span-5 flex px-5 py-5 items-end justify-end h-full">
              <AddButton
                label="Add new Department"
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            <div className="col-start-1 row-start-2 col-span-8 c13 row-span-6 px-5 pt-8 pb-5">
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
      </DashboardLayout>

      <DepartmentDialog isOpen={isModalOpen} onClose={handleClose} />

      <CourseDialog
        isOpen={isCourseModalOpen}
        onClose={handleClose}
        initialDeptId={selectedDeptId}
      />
    </>
  );
};

export default Departments;
