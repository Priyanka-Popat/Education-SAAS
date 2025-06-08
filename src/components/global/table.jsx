// import { useState } from "react";
// import { Edit3, Trash2 } from "lucide-react";
// import DeleteCourseConfirmation from "../DeleteDialogue";
// import EditCourseModal from "../EditDialogue";

// const Table = ({ headers, data }) => {
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setIsEditOpen(true);
//   };

//   const handleDelete = (item) => {
//     setSelectedItem(item);
//     setIsDeleteOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     console.log("Delete confirmed:", selectedItem);
//     setIsDeleteOpen(false);
//     setSelectedItem(null);
//   };

//   const handleSubmitEdit = (updatedItem) => {
//     console.log("Edited item:", updatedItem);
//   };

//   return (
//     <>
//       <div className="w-full rounded-xl overflow-hidden">

//         <table className="min-w-full table-auto border-collapse text-white">
//           <colgroup>
//             {headers.map((_, i) => (
//               <col key={i} style={{ width: `${100 / headers.length}%` }} />
//             ))}
//           </colgroup>
//           <thead>
//             <tr>
//               {headers.map(({ label, align }, i) => (
//                 <th
//                   key={i}
//                   className={`px-6 py-2 font-urbanistSemiBold text-base text-${align || "center"}`}
//                 >
//                   {label}
//                 </th>
//               ))}
//               <th className="px-6 py-2 font-urbanistSemiBold text-base text-right">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="max-h-[430px] overflow-y-auto">
//           <table className="min-w-full table-auto border-separate border-spacing-y-2 text-white">
//             <colgroup>
//               {headers.map((_, i) => (
//                 <col key={i} style={{ width: `${100 / headers.length}%` }} />
//               ))}
//               <col style={{ width: "15%" }} />
//             </colgroup>
//             <tbody>
//               {data.map((row, index) => (
//                 <tr key={index} className="bg-[#ffffff0a] mb-3">
//                   {headers.map(({ key, align }, i) => (
//                     <td
//                       key={i}
//                       className={`px-6 py-3 text-sm text-${align || "center"} ${
//                         i === 0 ? "rounded-l-xl text-left" : ""
//                       }`}
//                     >
//                       {row[key]}
//                     </td>
//                   ))}
//                   <td className="px-6 py-3 text-right rounded-r-xl">
//                     <div className="flex gap-4 items-center justify-end">
//                       <Edit3
//                         className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
//                         onClick={() => handleEdit(row)}
//                       />
//                       <Trash2
//                         className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
//                         onClick={() => handleDelete(row)}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <DeleteCourseConfirmation
//         isOpen={isDeleteOpen}
//         onClose={() => setIsDeleteOpen(false)}
//         courseToDelete={selectedItem}
//         onConfirmDelete={handleConfirmDelete}
//       />

//       <EditCourseModal
//         isOpen={isEditOpen}
//         onClose={() => setIsEditOpen(false)}
//         courseToEdit={editingItem}
//         onSubmitEdit={handleSubmitEdit}
//       />
//     </>
//   );
// };

// export default Table;

import { useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import DeleteCourseConfirmation from "../../features/courses/components/delete-dialog";
import EditCourseModal from "../../features/courses/components/edit-dialog";

const Table = ({ data = [], headers = [], showActions = true, actionsPosition = "end" }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const handleEdit = (row) => {
    setEditingRow(row);
    setIsEditOpen(true);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Delete confirmed:", selectedRow);
    setIsDeleteOpen(false);
    setSelectedRow(null);
  };

  const handleSubmitEdit = (updatedRow) => {
    console.log("Edited row:", updatedRow);
  };

  return (
    <>
      <div className="w-full rounded-xl overflow-hidden">
        <table className="min-w-full table-auto border-collapse text-white">
          <colgroup>
            {headers.map((col, i) => (
              <col key={i} style={{ width: col.width || `${100 / headers.length}%` }} />
            ))}
            {showActions && <col style={{ width: "15%" }} />}
          </colgroup>
          <thead className="bg-secondary">
            <tr>
              {headers.map((col, i) => (
                <th
                  key={i}
                  className={`px-6 py-2 text-base font-urbanistSemiBold ${
                    col.align === "left"
                      ? "text-left"
                      : col.align === "right"
                      ? "text-right"
                      : "text-center"
                  }`}
                >
                  {col.label}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-2 text-base font-urbanistSemiBold text-right">Actions</th>
              )}
            </tr>
          </thead>
        </table>

        <div className="max-h-[430px] overflow-y-auto">
          <table className="min-w-full table-auto border-separate border-spacing-y-2 text-white">
            <colgroup>
              {headers.map((col, i) => (
                <col key={i} style={{ width: col.width || `${100 / headers.length}%` }} />
              ))}
              {showActions && <col style={{ width: "15%" }} />}
            </colgroup>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="bg-[#ffffff0a]">
                  {headers.map((col, i) => (
                    <td
                      key={i}
                      className={`px-6 py-3 text-sm ${
                        col.align === "left"
                          ? "text-left"
                          : col.align === "center"
                          ? "text-center"
                          : "text-right"
                      } ${i === 0 ? "rounded-l-xl" : ""}`}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-6 py-3 text-right rounded-r-xl">
                      <div className="flex gap-4 items-center justify-end">
                        <Edit3
                          className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handleEdit(row)}
                        />
                        <Trash2
                          className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handleDelete(row)}
                        />
                      </div>
                    </td>
                  )}
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteCourseConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        courseToDelete={selectedRow}
        onConfirmDelete={handleConfirmDelete}
      />

      <EditCourseModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        courseToEdit={editingRow}
        onSubmitEdit={handleSubmitEdit}
      />
    </>
  );
};

export default Table;

