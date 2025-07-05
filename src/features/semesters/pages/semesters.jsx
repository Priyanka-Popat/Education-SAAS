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
import SemesterDialog from "@/features/semesters/components/semester-dialog";
import SemesterSm from "@/features/semesters/components/semester-sm";
import SearchBar from "@/components/ui/search-bar";

const Semesters = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);
  const [selectedTrackName, setSelectedTrackName] = useState("Compulsory");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const semesters = selectedCourse?.semesters || [];
  const selectedSemester = semesters[selectedSemesterIndex] || null;
  const selectedTrack = selectedSemester?.tracks?.find(
    (track) => track.name === selectedTrackName
  );

  useEffect(() => {
    if (nestedData.length > 0) {
      setSelectedDepartment(nestedData[0]);
      if (nestedData[0].courses?.length > 0) {
        setSelectedCourse(nestedData[0].courses[0]);
      }
    }
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

              <div className="relative col-start-5 row-start-1 col-span-7 flex px-5 py-5 4xl:p-0 2xl:p-0 lg:p-0 items-end 2xl:items-start lg:items-start justify-end h-full gap-x-3">
                <input type="search" className="p-2 pr-10 bg-[#FFFFFF0F] border border-white/20 text-white font-urbanistRegular rounded-[6px] 4xl:rounded-[10px] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 cursor-pointer text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs"  placeholder="Search..." />
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
                  onClick={() => setIsModalOpen(true)}
                />
              </div>

              <TrackSelection
                tracks={selectedSemester?.tracks || []}
                selectedTrackName={selectedTrackName}
                setSelectedTrackName={setSelectedTrackName}
                subjects={selectedTrack?.subjects || []}
                onAddSubject={() => setIsModalOpen(true)}
              />

              

              <div className="col-start-1 row-start-2 col-span-8 row-span-7 px-5 pt-3 4xl:pt-3 pb-5 c13">
                <SemesterList
                  semesters={semesters}
                  selectedSemesterIndex={selectedSemesterIndex}
                  onSelectSemester={setSelectedSemesterIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SemesterDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
      />
    </>
  );
};

export default Semesters;
