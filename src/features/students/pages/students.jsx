import { useEffect, useMemo, useState, useRef } from "react";
import StudentsData from "@/data/AttendanceData.json";
import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import DataTable from "@/components/global/data-table";
import SmLayout from "@/components/global/sm-layout";
import SyllabusBg from "@/components/ui/syllabus-bg";
import Heading from "@/components/ui/heading";
import AddButton from "@/components/ui/add-button";
import DateFilter from "@/components/ui/date-filter";
import { ChevronDown, ChevronUp, Edit3, Filter, Trash2 } from "lucide-react";
import AddButtonSecondary from "@/components/ui/add-button-secondary";
import SmBg from "@/components/ui/sm-bg";
import SyllabusBgMd from "@/features/syllabus/components/syllabus-bg-md";
import RectSearchBar from "@/components/ui/rect-search-bar";
import GradeFilter from "@/components/ui/grade-filter";
import SectionFilter from "@/components/ui/section-filter";
import FilterSidebar from "@/components/ui/filter-sidebar";

const Students = () => {
  const [selectedRollNos, setSelectedRollNos] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allRollNos = StudentsData.map((student) => student.rollNo);
  const areAllSelected = selectedRollNos.length === allRollNos.length;

  const toggleSelectAll = () => {
    setSelectedRollNos(areAllSelected ? [] : allRollNos);
  };

  const toggleSingleSelect = (rollNo) => {
    setSelectedRollNos((prev) =>
      prev.includes(rollNo)
        ? prev.filter((r) => r !== rollNo)
        : [...prev, rollNo]
    );
  };

  const studentColumns = [
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ getValue }) => (
        <div className="w-full flex justify-center">
          <img src={getValue()} alt="avatar" className="w-8 h-8 rounded-full" />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "rollNo",
      header: "Roll No",
    },
  ];

  return (
    <>
      <DashboardLayout
        className="bg-[#131313]"
        headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Students", href: "/students" },
        ]}
      >
        <div className="lg:col-start-1 xl:row-start-2 lg:row-start-3 lg:col-span-12 lg:row-span-9 col-start-1 row-start-3 col-span-6 row-span-10 relative px-4 hdplus:px-[21px] 2xl:px-5 2xl:pb-5 pb-4 c9 lg:pt-0 xl:pt-[1.5rem] 4xl:pt-[2.5rem] 3xl:pt-[2rem] 2xl:pt-[2rem] text-white hidden lg:block">
          <div className="w-full relative h-full">
            <SyllabusBg />
            <div className="grid grid-cols-11 grid-rows-9 3xl:grid-rows-8 w-full h-full">
              <Heading heading="Students" />
              <div className="relative col-start-4 row-start-1 col-span-8 flex px-5 py-5 4xl:p-0 2xl:p-0 lg:p-0 items-end 2xl:items-start lg:items-start justify-end h-full gap-x-3">
                <RectSearchBar />

                <DateFilter showLabel={false} />
                <GradeFilter showLabel={false} />
                <SectionFilter showLabel={false} />

                <AddButton
                  label="Add Students"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
              <div className="col-start-1 row-start-2 col-span-12 c13 row-span-8 px-5 pt-3 4xl:pt-3 pb-5">
                <DataTable
                  data={StudentsData}
                  columns={studentColumns}
                  onAdd={() => console.log("Add clicked")}
                  onEdit={(row) => console.log("Edit clicked for:", row)}
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SmLayout
        headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Syllabus", href: "/syllabus" },
        ]}
      >
        <div className="px-5">
          <div className="grid md:grid-cols-1 grid-cols-1 gap-x-4 gap-y-4 text-white pt-7 min-h-screen">
            <div className="relative">
              <div className="hidden md:block">
                <div className="hidden md:block">
                  <SyllabusBgMd />
                </div>
              </div>
              <div className="md:hidden">
                <div className="md:hidden">
                  <SmBg />
                </div>
              </div>

              <div className="relative grid grid-cols-3 gap-y-3 h-full grid-rows-[auto_auto_1fr_1fr_1fr_1fr]">
                <div className="flex col-span-2 pt-5 px-5">
                  <p className="font-urbanistSemiBold text-lg">Students</p>
                </div>
                <div className="flex justify-end px-1 gap-x-2">
                  <div
                    className="bg-[#1C1C1C] w-7 h-7 flex items-center justify-center rounded-full border border-[#606060]"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <Filter className="w-4 h-4 text-white" />
                  </div>
                  <AddButtonSecondary
                    icon="/assets/icons/add-circle.svg"
                    className={"h-[60%]"}
                    label="Add"
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>
                <div className="flex justify-end  col-span-3 mb-2 px-5">
                  <RectSearchBar className={"w-full md:w-auto"} />
                </div>
                {/* tablet */}
                <div className="col-span-3 row-start-3 row-span-5 px-5 pb-5 flex-col gap-y-3 overflow-y-auto max-h-full h-full relative z-10  hidden scrollbar-thin md:flex">
                  <DataTable
                    data={StudentsData}
                    columns={studentColumns}
                    onAdd={() => console.log("Add clicked")}
                    onEdit={(row) => console.log("Edit clicked for:", row)}
                  />
                </div>

                {/* mobile */}
                <div className="col-span-3 flex flex-col row-start-3 row-span-4 gap-y-3 px-5 pb-5 overflow-y-auto max-h-[600px] h-[100%] scrollbar-thin flex-1 md:hidden">
                  <div className="flex items-center gap-2 mt-2 px-1">
                    <input
                      type="checkbox"
                      checked={areAllSelected}
                      onChange={toggleSelectAll}
                      className="w-3 h-3 transparent-checkbox                   "
                    />
                    <label className="text-sm text-white">Select All</label>
                  </div>

                  <ul className="space-y-2">
                    {StudentsData.map((student, index) => (
                      <li
                        key={`${student.rollNo}-${index}`}
                        className="flex items-center justify-between bg-white/5 hover:bg-white/10 text-white p-3 rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="w-3 h-3 transparent-checkbox"
                            checked={selectedRollNos.includes(student.rollNo)}
                            onChange={() => toggleSingleSelect(student.rollNo)}
                          />

                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex flex-col text-sm">
                            <span className="font-medium">{student.name}</span>
                            <span className="text-xs text-gray-300">
                              Roll No: {student.rollNo}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-x-2">
                          <Edit3
                            className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => console.log("Edit:", student)}
                          />
                          <Trash2
                            className="w-5 h-5 text-white cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => console.log("Delete:", student)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SmLayout>
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <DateFilter />
        <GradeFilter />
        <SectionFilter />
      </FilterSidebar>
    </>
  );
};

export default Students;
