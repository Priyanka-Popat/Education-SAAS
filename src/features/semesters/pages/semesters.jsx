import { useState, useEffect } from "react";
import nestedData from "@/data/NestedData.json";
import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import DepartmentFilter from "@/components/ui/department-filter";
import CourseFilter from "@/components/ui/course-filter";
import AddButton from "@/components/ui/add-button";
import Heading from "@/components/ui/heading";
import AttendanceBg from "@/components/ui/attendance-bg";
import SemesterList from "@/features/semesters/components/semester-list";
import TrackSelection from "@/features/semesters/components/track-selection";
import SemDialog from "@/features/semesters/components/semester-dialog.jsx";
import SemesterSm from "@/features/semesters/components/semester-sm";
import RectSearchBar from "@/components/ui/rect-search-bar";
import SubjectDialog from "@/features/semesters/components/subject-dialog";
import Loader from "@/components/ui/loader";

const Semesters = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);
  const [selectedTrackName, setSelectedTrackName] = useState("Compulsory");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSemDialogOpen, setIsSemDialogOpen] = useState(false);
  const semesters = selectedCourse?.semesters || [];
  const selectedSemester = semesters[selectedSemesterIndex] || null;
  const selectedTrack = selectedSemester?.tracks?.find(
    (track) => track.name === selectedTrackName
  );
  const [editSemesterData, setEditSemesterData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);
  const [subjectDialogMode, setSubjectDialogMode] = useState("add");
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditSemester = (semesterObj) => {
    setEditSemesterData(semesterObj);
    setIsEditMode(true);
    setIsSemDialogOpen(true);
  };

  useEffect(() => {
    if (nestedData.length > 0) {
      setSelectedDepartment(nestedData[0]);
      if (nestedData[0].courses?.length > 0) {
        setSelectedCourse(nestedData[0].courses[0]);
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (nestedData.length > 0) {
      setSelectedDepartment(nestedData[0]);

      if (nestedData[0].courses?.length > 0) {
        setSelectedCourse(nestedData[0].courses[0]);
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedDepartment?.courses?.length > 0) {
      setSelectedCourse(selectedDepartment.courses[0]);
      setSelectedSemesterIndex(0);
    } else {
      setSelectedCourse(null);
      setSelectedSemesterIndex(0);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    setSelectedSemesterIndex(0);
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedSemester?.tracks?.length > 0) {
      setSelectedTrackName(selectedSemester.tracks[0].name);
    } else {
      setSelectedTrackName("");
    }
  }, [selectedSemester]);

  useEffect(() => {
    console.log("Selected course changed:", selectedCourse);
  }, [selectedCourse]);

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
  };

  const handleCourseChange = (courseObj) => {
    setSelectedCourse(courseObj);
    setSelectedSemesterIndex(0);
  };

  return (
    <>
      <DashboardLayout
        className="bg-[#131313]"
        headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Semesters", href: "/semesters" },
        ]}
      >
        <div className="lg:col-start-1 lg:row-start-3 xl:row-start-2 lg:col-span-12 lg:row-span-9 col-start-1 row-start-3 col-span-6 row-span-10 relative px-4 hdplus:px-[21px] 2xl:px-5 2xl:pb-5 pb-4 c9 xl:pt-[1.5rem] lg:pt-0 4xl:pt-[2.5rem] 3xl:pt-[2rem] 2xl:pt-[2rem] text-white hidden lg:block">
          <div className="w-full relative h-full">
            <AttendanceBg />
            <div className="grid grid-cols-11 grid-rows-9 3xl:grid-rows-8 w-full h-full">
              <Heading heading="Semesters" />

              <div className="relative col-start-4 row-start-1 col-span-8 flex px-5 py-5 4xl:p-0 2xl:p-0 lg:p-0 items-end 2xl:items-start lg:items-start justify-end h-full gap-x-3">
                <RectSearchBar />
                <DepartmentFilter
                  selectedDepartment={selectedDepartment}
                  setSelectedDepartment={handleDepartmentChange}
                  setSelectedDeptId={null}
                />

                <CourseFilter
                  selectedCourse={selectedCourse}
                  setSelectedCourse={handleCourseChange}
                  courses={selectedDepartment?.courses || []}
                />

                <AddButton
                  label="Add Semester"
                  onClick={() => {
                    setEditSemesterData(null);
                    setIsEditMode(false);
                    setIsSemDialogOpen(true);
                  }}
                />
              </div>

              <TrackSelection
                tracks={selectedSemester?.tracks || []}
                selectedTrackName={selectedTrackName}
                setSelectedTrackName={setSelectedTrackName}
                subjects={selectedTrack?.subjects || []}
                onAddSubject={() => {
                  setSubjectDialogMode("add");
                  setSubjectToEdit(null);
                  setIsSubjectDialogOpen(true);
                }}
              />

              <div className="col-start-1 row-start-2 col-span-8 row-span-7 px-5 pt-3 4xl:pt-3 pb-5 c13">
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader />
                  </div>
                ) : (
                  <SemesterList
                    semesters={semesters}
                    selectedSemesterIndex={selectedSemesterIndex}
                    onSelectSemester={setSelectedSemesterIndex}
                    onEditSemester={handleEditSemester}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SemDialog
        isOpen={isSemDialogOpen}
        onClose={() => setIsSemDialogOpen(false)}
        isEditMode={isEditMode}
        editSemesterData={editSemesterData}
      />

      <SubjectDialog
        isOpen={isSubjectDialogOpen}
        onClose={() => setIsSubjectDialogOpen(false)}
        mode={subjectDialogMode}
        semesterToEdit={subjectToEdit}
      />

      <SemesterSm
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={handleDepartmentChange}
        selectedCourse={selectedCourse}
        setSelectedCourse={handleCourseChange}
        selectedSemesterIndex={selectedSemesterIndex}
        setSelectedSemesterIndex={setSelectedSemesterIndex}
        selectedTrackName={selectedTrackName}
        setSelectedTrackName={setSelectedTrackName}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsSemDialogOpen={setIsSemDialogOpen}
        setEditSemesterData={setEditSemesterData}
        setIsEditMode={setIsEditMode}
        onEditSemester={handleEditSemester}
        onAddSubject={() => {
          setSubjectDialogMode("add");
          setSubjectToEdit(null);
          setIsSubjectDialogOpen(true);
        }}
      />
    </>
  );
};

export default Semesters;
