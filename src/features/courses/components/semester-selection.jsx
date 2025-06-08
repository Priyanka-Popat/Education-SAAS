import SelectField from "@/components/ui/select-field";
import SubjectList from "../components/subject-list";
import AddButtonSecondary from "@/components/ui/add-button-secondary";

const SemesterFilterSection = ({
  selectedSemesterName,
  setSelectedSemesterName,
  selectedCourse,
  selectedSemester,
  onAddSemester,
}) => {
  return (
    <>
      <div className="col-start-9 row-start-2 col-span-5 px-4">
        <SelectField
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

      <div className="ps-4 pt-4 col-start-9 row-start-3 col-span-3 row-span-5 w-full">
        <div className="w-full h-full qr-code">
          <div className="flex flex-col justify-between h-full gap-y-8 items-center p-5">
            <div className="w-full">
              <p className="font-urbanistSemiBold pb-5 text-sm">Subjects</p>

              <SubjectList selectedSemester={selectedSemester} />
            </div>

            <AddButtonSecondary label="Add Semester" onClick={onAddSemester} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SemesterFilterSection;
