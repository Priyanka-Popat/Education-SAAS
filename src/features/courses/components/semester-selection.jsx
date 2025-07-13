import SelectField from "@/components/ui/select-field";
import SubjectList from "../components/subject-list";
import AddButtonSecondary from "@/components/ui/add-button-secondary";
import MdBg from "@/components/ui/md-bg";
import Loader from "@/components/ui/loader";
import { useEffect, useState } from "react";

const SemesterFilterSection = ({
  selectedSemesterName,
  setSelectedSemesterName,
  selectedCourse,
  selectedSemester,
  onAddSemester,
}) => {
  const [isSubject, setIsSubject] = useState(true);
  useEffect(() => {
    if (selectedSemester) {
      setIsSubject(false);
    } else {
      setIsSubject(true);
    }
  }, [selectedSemester]);

  return (
    <>
      <div className="relative col-start-9 row-start-2 row-span-1 3xl:row-span-1 col-span-5 px-4 pt-4 2xl:pt-0  hd:pt-0 lg:pt-0">
        <SelectField
          className="h-full flex justify-start 4xl:justify-start 3xl:justify-start 2xl:justify-start hd:justify-start flex-col"
          label="Select Semester"
          value={selectedSemesterName}
          onChange={(e) => setSelectedSemesterName(e.target.value)}
          options={
            selectedCourse?.semesters?.map((semester) => ({
              label: semester.semesterName,
              value: semester.semesterName,
            })) || []
          }
        />
      </div>

      <div className="h-[65%] lg:h-full lg:mt-0 rounded-2xl relative md:p-0 lg:ps-3 lg:pt-4 3xl:ps-5 4xl:ps-10 4xl:pt-7 4xl:pe-2 col-start-9 row-start-3 col-span-3 row-span-7 w-full">
        <MdBg />
        <div className="w-full h-full relative">
          <div className="flex flex-col justify-between h-full gap-y-8 items-center pt-5 px-5 pb-2 lg:px-3 hd:px-6 lg:pt-5 hd:pt-6 2xl:pt-8 3xl:pt-5">
            <div className="w-full">
              <p className="font-urbanistSemiBold pb-5 2xl:pb-4 text-sm 4xl:text-3xl 3xl:text-xl 2xl:text-lg">
                Subjects
              </p>

              {isSubject ? (
                <div className="flex justify-center items-center h-24">
                  <Loader />
                </div>
              ) : (
                <SubjectList selectedSemester={selectedSemester} />
              )}
            </div>

            <AddButtonSecondary label="Add Semester" onClick={onAddSemester} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SemesterFilterSection;
