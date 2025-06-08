import { PencilLine, ArrowRight, ArrowUpRight } from "lucide-react";

const DepartmentList = ({
  departments,
  selectedDeptId,
  setSelectedDeptId,
  setSelectedCourseId,
}) => {
  return (
    <div className="overflow-y-auto max-h-[480px]">
      <ul className="space-y-2">
        {departments.map((dept) => (
          <div className="flex items-center gap-x-2" key={dept.id}>
            <div className="p-2 rounded-full border border-secondary">
              <PencilLine size={16} />
            </div>
            <li
              onClick={() => {
                if (dept.id !== selectedDeptId) {
                  setSelectedDeptId(dept.id);
                  setSelectedCourseId(dept.courses?.[0]?.id || "");
                }
              }}
              className={`flex items-center w-full justify-between gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                selectedDeptId === dept.id
                  ? "bg-secondary"
                  : "bg-white/5 hover:bg-white/10"
              } text-white`}
            >
              {dept.shortForm} : {dept.fullForm}
              {selectedDeptId === dept.id ? (
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

export default DepartmentList;
