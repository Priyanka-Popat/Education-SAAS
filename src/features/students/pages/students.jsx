import { useEffect, useMemo, useState, useRef } from "react";
import StudentsData from "@/data/AttendanceData.json";
import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import DataTable from "@/components/global/data-table";
import SmLayout from "@/components/global/sm-layout";
import SyllabusBg from "@/components/ui/syllabus-bg";
import Heading from "@/components/ui/heading";

const Students = () => {
  const studentColumns = [
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ getValue }) => (
        <img src={getValue()} alt="avatar" className="w-8 h-8 rounded-full" />
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
              <div className="col-start-1 row-start-2 col-span-12 c13 row-span-7 px-5 pt-3 4xl:pt-3 pb-5">
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
          <DataTable
            data={StudentsData}
            columns={studentColumns}
            onAdd={() => console.log("Add clicked")}
            onEdit={(row) => console.log("Edit clicked for:", row)}
          />
        </div>
      </SmLayout>
    </>
  );
};

export default Students;
