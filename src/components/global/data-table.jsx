import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Edit3,
  Trash2,
} from "lucide-react";

export default function DataTable({ data, columns, onAdd, onEdit }) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const selectColumn = {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center items-center">

      <input
        className="transparent-checkbox w-3 h-3"
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
        </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">

      <input
        type="checkbox"
        className="transparent-checkbox w-3 h-3"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        />
        </div>
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const allColumns = [selectColumn, ...columns];

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    getRowId: (row) => row.id?.toString() ?? Math.random().toString(),
  });

  return (
    <div className="w-full flex flex-col gap-6 h-full">
      <div className="relative flex flex-col gap-4 justify-between overflow-auto h-full">
        <div className="overflow-y-auto rounded-[20px]">
          <table className="min-w-full table-auto border-separate border-spacing-y-2 text-white">
            <thead className="bg-secondary sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, i) => {
                    const align =
                      header.column.columnDef.meta?.align || "center";
                    const isLastHeader = i === headerGroup.headers.length - 1;
                    return (
                      <th
                        key={header.id}
                        className={`px-6 py-2 text-sm font-urbanistRegular text-center ${
                          i === 0 ? "rounded-tl-2xl" : ""
                        }`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    );
                  })}
                  {onEdit && (
                    <th className="px-6 py-2 text-sm font-urbanistRegular rounded-tr-[20px]">
                      Actions
                    </th>
                  )}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className=" bg-[#ffffff0a] transition-colors"
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => {
                      const align =
                        cell.column.columnDef.meta?.align || "center";
                      const roundedClass =
                        cellIndex === 0 ? "rounded-l-xl" : "";

                      return (
                        <td
                          key={cell.id}
                          className={`px-6 py-1 text-sm font-urbanistRegular text-center ${roundedClass}`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                    {onEdit && (
                      <td className="px-6 py-4 text-sm rounded-r-xl">
                        <div className="flex gap-4 items-center justify-center">
                          <Edit3
                            className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => onEdit(row.original)}
                          />
                          <Trash2
                            className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => onEdit(row.original)}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={allColumns.length + (onEdit ? 1 : 0)}
                    className="h-24 text-center text-gray-400"
                  >
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize} style={{ backgroundColor: "#131313", color: "white" }}>
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
                className="hidden h-8 w-8 p-0 lg:flex text-white hover:bg-gray-700 rounded items-center justify-center"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                aria-label="Go to first page"
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>
              <button
                className="h-8 w-8 p-0 text-white hover:bg-gray-700 rounded flex justify-center items-center"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Go to previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="h-8 w-8 p-0 text-white hover:bg-gray-700 rounded flex justify-center items-center"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Go to next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                className="hidden h-8 w-8 p-0 lg:flex text-white hover:bg-gray-700 rounded items-center justify-center"
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
    </div>
  );
}
