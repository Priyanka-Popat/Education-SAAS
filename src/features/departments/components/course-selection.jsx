import { useEffect, useState } from "react";
import SemesterList from "./semester-list";
import AddButtonSecondary from "@/components/ui/add-button-secondary";
import MdBg from "@/components/ui/md-bg";
import SelectField from "@/components/ui/select-field";
import Loader from "@/components/ui/loader";

const CourseFilterSection = ({
  selectedDept,
  selectedCourseId,
  setSelectedCourseId,
  selectedCourse,
  onAddCourse,
}) => {
  const [isSemesterLoading, setIsSemesterLoading] = useState(true);

  useEffect(() => {
    setIsSemesterLoading(true);
  }, [selectedCourseId]);

  useEffect(() => {
    if (selectedCourse?.semesters !== undefined) {
      setIsSemesterLoading(false);
    }
  }, [selectedCourse]);

  return (
    <>
      <div className="relative col-start-9 row-start-2 row-span-1 col-span-5 px-4 pt-4 2xl:pt-0  hd:pt-0 lg:pt-0">
        <SelectField
          className="h-full flex justify-start 4xl:justify-start 3xl:justify-start 2xl:justify-start hd:justify-start flex-col"
          label="Select Course"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(Number(e.target.value))}
          options={
            selectedDept?.courses?.map((course) => ({
              label: course.shortForm,
              value: course.id,
            })) || []
          }
        />
      </div>

      <div className="h-[65%] lg:h-full lg:mt-0 rounded-2xl relative md:p-0 lg:ps-3 lg:pt-4 3xl:ps-5 4xl:ps-10 4xl:pt-7 4xl:pe-2 col-start-9 row-start-3 col-span-3 row-span-7 w-full">
        <MdBg />

        <div className="w-full h-full relative">
          <div className="flex flex-col justify-between h-full w-full gap-y-8 items-center pt-5 px-5 pb-2 lg:px-3 hd:px-6 lg:pt-5 hd:pt-6 2xl:pt-8 3xl:pt-5">
            <div className="w-full">
              <p className="font-urbanistSemiBold pb-5 2xl:pb-4 text-sm 4xl:text-3xl 3xl:text-xl 2xl:text-lg">
                Semesters
              </p>

              {isSemesterLoading ? (
                <div className="flex justify-center items-center h-24">
                  <Loader />
                </div>
              ) : (
                <SemesterList semesters={selectedCourse?.semesters || []} />
              )}
            </div>

            <AddButtonSecondary label="Add Course" onClick={onAddCourse} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseFilterSection;
