import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import nestedData from "@/data/NestedData.json";
import { useState, useEffect } from "react";
import DepartmentFilter from "@/components/ui/department-filter";
import CourseFilter from "@/components/ui/course-filter";
import AddButton from "@/components/ui/add-button";
import Heading from "@/components/ui/heading";
import SemesterList from "@/features/semesters/components/semester-list";
import TrackSelection from "../components/track-selection";
import SemesterDialog from "../components/semester-dialog";

const Semesters = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);
  const [selectedTrackName, setSelectedTrackName] = useState("Compulsory");

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const semesters = selectedCourse?.semesters || [];
  const selectedSemester = semesters[selectedSemesterIndex] || null;

  useEffect(() => {
    if (selectedSemester?.tracks?.length > 0) {
      setSelectedTrackName(selectedSemester.tracks[0].name);
    } else {
      setSelectedTrackName("");
    }
  }, [selectedSemester]);

  const selectedTrack = selectedSemester?.tracks?.find(
    (track) => track.name === selectedTrackName
  );

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
  };

  const handleCourseChange = (courseObj) => {
    setSelectedCourse(courseObj);
    setSelectedSemesterIndex(0);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("Selected course changed:", selectedCourse);
  }, [selectedCourse]);

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
        <div className="col-start-1 row-start-2 col-span-12 row-span-9 relative px-4 pb-4 c9 text-white">
          <div className="attendance-info grid grid-cols-11 grid-rows-7 w-full h-full">
            <Heading heading="Semesters" />

            <div className="col-start-6 row-start-1 col-span-6 flex px-5 py-5 items-end justify-end h-full gap-6">
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
                label="Add new Semester"
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

            <div className="col-start-1 row-start-2 col-span-8 c13 row-span-5 px-5 pt-8 pb-5 overflow-y-auto max-h-[480px]">
              <SemesterList
                semesters={semesters}
                selectedSemesterIndex={selectedSemesterIndex}
                onSelectSemester={setSelectedSemesterIndex}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SemesterDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Semesters;
