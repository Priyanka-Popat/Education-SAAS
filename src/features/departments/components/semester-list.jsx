const SemesterList = ({ semesters = [] }) => {
  if (semesters.length === 0) {
    return <p className="text-white/50">No semesters available</p>;
  }

  return (
    <div className="space-y-3 w-full">
      {semesters.map((semester, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-lg cursor-pointer text-white"
        >
          <p className="font-urbanistMedium text-xs">
            {semester.semesterName}
          </p>
          {semester.syllabusPdf ? (
            <a
              href={semester.syllabusPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:underline cursor-pointer"
            >
              View Syllabus
            </a>
          ) : (
            <p className="text-sm text-white/50">No syllabus available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SemesterList;
