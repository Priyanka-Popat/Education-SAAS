import { PencilLine, ArrowRight, ArrowUpRight } from "lucide-react";

const CourseList = ({
  courses,
  selectedCourseId,
  setSelectedCourseId,
  setSelectedSemesterName,
}) => {
  return (
    <div className="overflow-y-auto max-h-[480px]">
      <ul className="space-y-2">
        {courses.map((course) => (
          <div className="flex items-center gap-x-2" key={course.id}>
            <div className="p-2 rounded-full border border-secondary">
              <PencilLine size={16} />
            </div>
            <li
              onClick={() => {
                setSelectedCourseId(course.id);
                setSelectedSemesterName(course.semesters?.[0]?.semesterName || "");
              }}
              className={`flex items-center w-full justify-between gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                selectedCourseId === course.id
                  ? "bg-secondary"
                  : "bg-white/5 hover:bg-white/10"
              } text-white`}
            >
              {course.shortForm} : {course.fullForm}
              {selectedCourseId === course.id ? (
                <ArrowRight size={16} />
              ) : (
                <ArrowUpRight size={16} />
              )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
