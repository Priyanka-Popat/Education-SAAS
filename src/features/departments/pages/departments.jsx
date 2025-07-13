import { useState, useEffect, useMemo } from "react";
// import departments from "@/data/NestedData.json";
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
import RectSearchBar from "@/components/ui/rect-search-bar";
import Loader from "@/components/ui/loader";

const Departments = () => {
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDeptData, setEditDeptData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [isDeptLoading, setIsDeptLoading] = useState(true);

  const selectedDepartment = useMemo(() => {
    return departmentsData.find((d) => d.id === Number(selectedDeptId)) || null;
  }, [selectedDeptId]);

  const selectedCourse = useMemo(() => {
    return (
      selectedDepartment?.courses.find(
        (c) => c.id === Number(selectedCourseId)
      ) || null
    );
  }, [selectedDepartment, selectedCourseId]);

  useEffect(() => {
    if (departmentsData.length > 0 && !selectedDeptId) {
      const firstDept = departmentsData[0];
      setSelectedDeptId(firstDept.id);
      setSelectedCourseId(firstDept.courses?.[0]?.id || null);
      setSelectedSemesterIndex(0);
    }
  }, [departmentsData]);

  useEffect(() => {
    if (selectedDepartment) {
      if (selectedDepartment.courses?.length > 0) {
        setSelectedCourseId(selectedDepartment.courses[0].id);
      } else {
        setSelectedCourseId(null);
      }
      setSelectedSemesterIndex(0);
    }
  }, [selectedDepartment]);

  const handleClose = () => {
    setIsModalOpen(false);
    setIsCourseModalOpen(false);
  };

  const handleEditClick = (dept) => {
    setEditDeptData({
      department: {
        fullForm: dept.fullForm,
        shortForm: dept.shortForm,
      },
      courses: dept.courses || [],
    });
    setEditDialogOpen(true);
  };

  useEffect(() => {
    let isMounted = true;

    import("@/data/NestedData.json").then((mod) => {
      if (isMounted) {
        setDepartmentsData(mod.default);
        setIsDeptLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

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
              <div className="relative col-start-7 row-start-1 col-span-7 gap-x-3 flex px-5 py-5 4xl:p-0 2xl:p-0 lg:p-0 items-end 2xl:items-start lg:items-start justify-end h-full">
                
                <RectSearchBar />
                <AddButton
                  label="Add Department"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>

              <div className="col-start-1 row-start-2 col-span-8 c13 row-span-6 2xl:row-span-7 px-5 pt-3 4xl:pt-3 pb-5">
                {isDeptLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader />
                  </div>
                ) : (
                  <DepartmentList
                    departments={departmentsData}
                    selectedDeptId={selectedDeptId}
                    setSelectedDeptId={setSelectedDeptId}
                    setSelectedCourseId={setSelectedCourseId}
                    onEditClick={handleEditClick}
                  />
                )}
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

      <DepartmentDialog
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={(data) => {
          console.log("New Department Added:", data);
          setIsModalOpen(false);
        }}
      />

      <CourseDialog
        isOpen={isCourseModalOpen}
        onClose={handleClose}
        initialDeptId={selectedDeptId}
      />

      {editDialogOpen && (
        <DepartmentDialog
          isOpen={editDialogOpen}
          mode="edit"
          initialData={editDeptData}
          onSubmit={(data) => {
            console.log("Edited Data:", data);
            setEditDialogOpen(false);
          }}
          onClose={() => setEditDialogOpen(false)}
        />
      )}

      <DepartmentSm
        departments={departmentsData}
        selectedDeptId={selectedDeptId}
        setSelectedDeptId={setSelectedDeptId}
        setSelectedCourseId={setSelectedCourseId}
        selectedDept={selectedDepartment}
        selectedCourseId={selectedCourseId}
        selectedCourse={selectedCourse}
        onAddCourse={() => setIsCourseModalOpen(true)}
        onEditClick={handleEditClick}
      />
    </>
  );
};

export default Departments;
