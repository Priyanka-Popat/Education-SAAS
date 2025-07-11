import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import DeleteCourseConfirmation from "../../features/courses/components/delete-dialog";
import EditCourseModal from "../../features/courses/components/edit-dialog";

const Table = ({ data = [], headers = [], showActions = true, onEdit = () => {} }) => {

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(() => {
    const baseColumns = headers.map((col) => ({
      accessorKey: col.key,
      header: () => col.label,
      cell: (info) =>
        col.render
          ? col.render(info.getValue(), info.row.original)
          : info.getValue(),
      meta: { align: col.align },
    }));

    if (showActions) {
      baseColumns.push({
        id: "actions",
        header: () => "Actions",
        cell: ({ row }) => (
          <div className="flex gap-4 items-center justify-end">
            <Edit3
              className="w-5 h-5 4xl:w-8 4xl:h-8 text-white cursor-pointer hover:scale-110 transition-transform"
              onClick={() => handleEdit(row.original)}
            />
            <Trash2
              className="w-5 h-5 4xl:w-8 4xl:h-8 text-white cursor-pointer hover:scale-110 transition-transform"
              onClick={() => handleDelete(row.original)}
            />
          </div>
        ),
        meta: { align: "right" },
      });
    }

    return baseColumns;
  }, [headers, showActions]);

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleEdit = (row) => {
    setEditingRow(row);
     onEdit(row);
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
      <div className="w-full rounded-xl overflow-hidden relative h-full flex flex-col justify-between gap-4">
        <table className="min-w-full table-auto border-separate border-spacing-y-2 text-white">
          <thead className="bg-secondary">
            <tr>
              {table.getHeaderGroups()[0].headers.map((header, i) => {
                const align = header.column.columnDef.meta?.align || "center";
                const isLastHeader =
                  i === table.getHeaderGroups()[0].headers.length - 1;
                return (
                  <th
                    key={header.id}
                    className={`px-6 py-2 text-base font-urbanistSemiBold ${
                      i === 0
                        ? "rounded-tl-2xl" 
                        : isLastHeader 
                        ? "rounded-tr-2xl" 
                        : ""
                    } ${
                      align === "left"
                        ? "text-left"
                        : align === "right"
                        ? "text-right"
                        : "text-center"
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id} className="bg-[#ffffff0a]">
                {row.getVisibleCells().map((cell, cellIndex) => {
                  const align = cell.column.columnDef.meta?.align || "center";
                  const roundedClass =
                    cellIndex === 0
                      ? "rounded-l-xl"
                      : cellIndex === row.getVisibleCells().length - 1
                      ? "rounded-r-xl"
                      : "";

                  return (
                    <td
                      key={cell.id}
                      className={`px-6 py-4 text-sm font-urbanistRegular ${
                        align === "left"
                          ? "text-left"
                          : align === "right"
                          ? "text-right"
                          : "text-center"
                      } ${roundedClass}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-gray-400 hidden lg:flex text-sm flex-1">
            {Object.keys(rowSelection).length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          <div className="flex w-full items-center gap-8 lg:w-auto">
            <div className="items-center gap-2 flex">
              <label
                htmlFor="rows-per-page"
                className="text-sm font-medium text-white"
              >
                Rows per page
              </label>
              <select
                id="rows-per-page"
                className="rounded border border-gray-600 bg-[#FFFFFF0F] px-2 py-1 text-sm text-white"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-fit items-center justify-center text-sm font-medium text-white">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>

            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <button
                className="hidden h-8 w-8 p-0 lg:flex text-white hover:bg-gray-700 rounded items-center"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                aria-label="Go to first page"
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>
              <button
                className="h-8 w-8 p-0 text-white hover:bg-gray-700 rounded"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Go to previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="h-8 w-8 p-0 text-white hover:bg-gray-700 rounded"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Go to next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                className="hidden h-8 w-8 p-0 lg:flex text-white hover:bg-gray-700 rounded items-center"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                aria-label="Go to last page"
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Table;
