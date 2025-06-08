import SemesterList from "./semester-list";
import AddButtonSecondary from "@/components/ui/add-button-secondary";
import SelectField from "@/components/ui/select-field";

const CourseFilterSection = ({
  selectedDept,
  selectedCourseId,
  setSelectedCourseId,
  selectedCourse,
  onAddCourse,
}) => {
  return (
    <>
      <div className="col-start-9 row-start-2 col-span-5 px-4">
      <SelectField
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

      <div className="ps-4 pt-4 col-start-9 row-start-3 col-span-3 row-span-5 w-full">
        <div className="w-full h-full qr-code">
          <div className="flex flex-col justify-between h-full gap-y-8 items-center p-5">
            <div className="w-full">
              <p className="font-urbanistSemiBold pb-5 text-sm">Semesters</p>

              <SemesterList semesters={selectedCourse?.semesters || []} />
            </div>

            <AddButtonSecondary label="Add Course" onClick={onAddCourse} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseFilterSection;
