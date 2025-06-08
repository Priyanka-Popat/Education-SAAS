import { useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import coursesData from "@/data/CoursesData.json";
import DeleteCourseConfirmation from "@/features/courses/components/delete-dialog";
import EditCourseModal from "@/features/courses/components/edit-dialog";

const Table = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsEditOpen(true);
  };

  const handleDelete = (course) => {
    setSelectedCourse(course);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Delete confirmed:", selectedCourse);
    setIsDeleteOpen(false);
    setSelectedCourse(null);
  };

  const handleSubmitEdit = (updatedCourse) => {
    console.log("Edited course:", updatedCourse);
  };

  return (
    <>
      <div className="w-full rounded-xl overflow-hidden">
        <table className="min-w-full table-auto border-collapse text-white ">
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th className="px-6 py-2 text-left font-urbanistSemiBold text-base">
                Course Code
              </th>
              <th className="text-base px-6 py-2 text-center font-urbanistSemiBold">
                Course Title
              </th>
              <th className="text-base px-6 py-2 text-center font-urbanistSemiBold">
                Department
              </th>
              <th className="text-base px-6 py-2 text-center font-urbanistSemiBold">
                Grade
              </th>
              <th className="text-base px-6 py-2 text-right font-urbanistSemiBold">
                Actions
              </th>
            </tr>
          </thead>
        </table>

        <div className="max-h-[430px] overflow-y-auto">
          <table className="min-w-full table-auto  border-separate border-spacing-y-2 text-white">
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <tbody>
              {coursesData.map((course, index) => (
                <tr key={index} className="bg-[#ffffff0a] mb-3">
                  <td className="px-6 py-3 text-sm text-left rounded-l-xl">
                    {course.courseCode}
                  </td>
                  <td className="px-6 py-3 text-sm text-center">
                    {course.courseTitle}
                  </td>
                  <td className="px-6 py-3 text-sm text-center">
                    {course.department}
                  </td>
                  <td className="px-6 py-3 text-sm text-center">
                    {course.grade}
                  </td>
                  <td className="px-6 py-3 text-right rounded-r-xl">
                    <div className="flex gap-4 items-center justify-end">
                      <Edit3
                        className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => handleEdit(course)}
                      />
                      <Trash2
                        className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => handleDelete(course)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteCourseConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        courseToDelete={selectedCourse}
        onConfirmDelete={handleConfirmDelete}
      />

      <EditCourseModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        courseToEdit={editingCourse}
        onSubmitEdit={handleSubmitEdit}
      />
    </>
  );
};

export default Table;
{
  /* <div className="overflow-y-auto">
        <table className="min-w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-white">
              <th className="px-6 py-2 font-urbanistSemiBold text-left">Course Code</th>
              <th className="px-6 py-2 font-urbanistSemiBold text-center">Course Title</th>
              <th className="px-6 py-2 font-urbanistSemiBold text-center">Department</th>
              <th className="px-6 py-2 font-urbanistSemiBold text-center">Grade</th>
              <th className="px-6 py-2 font-urbanistSemiBold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coursesData.map((course, index) => (
              <tr key={index} className="bg-[#ffffff0a] rounded-xl text-white">
                <td className="px-6 py-3 font-urbanistRegular text-sm rounded-l-xl text-left">
                  {course.courseCode}
                </td>
                <td className="px-6 py-3 font-urbanistRegular text-sm text-center">
                  {course.courseTitle}
                </td>
                <td className="px-6 py-3 font-urbanistRegular text-sm text-center">
                  {course.department}
                </td>
                <td className="px-6 py-3 font-urbanistRegular text-sm text-center">
                  {course.grade}
                </td>
                <td className="px-6 py-3 flex gap-4 items-center justify-end rounded-r-xl">
                  <Edit3
                    className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => handleEdit(course)}
                  />
                  <Trash2
                    className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => handleDelete(course)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */
}
