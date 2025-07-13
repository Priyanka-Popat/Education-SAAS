import initialAttendanceData from "@/data/AttendanceData.json";
import GreetingHeader from "@/components/global/greeting-header";
import DashboardLayout from "@/components/global/dashboard-layout";
import SmLayout from "@/components/global/sm-layout";
import Heading from "@/components/ui/heading";
import Qrcode from "@/components/ui/qr-code";
import AttendanceBg from "@/components/ui/attendance-bg";
import QrBg from "@/components/ui/qr-bg";
import AttendanceFilter from "@/features/attendance/components/attendance-filter";
import AttendanceTable from "@/features/attendance/components/attendance-table";
import Qr from "@/features/attendance/components/qr-code";
import AttendanceBgSm from "@/features/attendance/components/attendance-bg-sm";
import { useState } from "react";
import RectSearchBar from "@/components/ui/rect-search-bar";

// Status color
const statusColor = (status) => {
  switch (status) {
    case "Present":
      return "text-green-400";
    case "Absent":
      return "text-red-400";
    case "Leave":
      return "text-yellow-400";
    default:
      return "text-gray-400";
  }
};

// Status config
const config = {
  Present: {
    color: "white",
    bg: "#348D31",
    faded: "rgba(52, 141, 49, 0.08)",
  },
  Absent: {
    color: "white",
    bg: "#C22B2D",
    faded: "rgba(194, 43, 45, 0.08)",
  },
  Leave: {
    color: "white",
    bg: "#C07600",
    faded: "rgba(192, 118, 0, 0.08)",
  },
  unmarked: {
    color: "white",
    bg: "#B2B2B2",
    faded: "rgba(178, 178, 178, 0.08)",
  },
};

// Get button props
const getButtonProps = (status, buttonType) => {
  const statusMap = { P: "Present", A: "Absent", L: "Leave" };
  const currentStatus = statusMap[buttonType];
  const isActive = status === currentStatus;
  const colors = config[currentStatus] || config.unmarked;

  return {
    style: {
      backgroundColor: isActive ? colors.bg : colors.faded,
      borderColor: colors.bg,
    },
    className: `w-6 h-6 4xl:h-10 4xl:w-10 3xl:h-8 3xl:w-8 rounded-full font-urbanistRegular border cursor-pointer text-sm 4xl:text-2xl 3xl:text-lg hd:text-sm`,
  };
};

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);

  const handleStatusChange = (index, newStatus) => {
    setAttendanceData((prev) =>
      prev.map((student, i) =>
        i === index ? { ...student, status: newStatus } : student
      )
    );
  };

  return (
    <>
      <DashboardLayout
        className="bg-[#131313] hidden lg:grid"
        headerComponent={<GreetingHeader heading="Attendance" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Attendance", href: "/attendance" },
        ]}
      >
        <div className="lg:col-start-1 lg:row-start-3 xl:row-start-2  lg:col-span-12 lg:row-span-9 col-start-1 row-start-3 col-span-6 row-span-10 relative px-4 hdplus:px-[21px] 2xl:px-5 2xl:pb-5 pb-4 c9 lg:pt-0 xl:pt-[1.5rem] 4xl:pt-[2.5rem] 3xl:pt-[2rem] 2xl:pt-[2rem] text-white hidden lg:block">
          <div className="w-full relative h-full">
            <AttendanceBg />

            <div className="grid grid-cols-11 grid-rows-9 3xl:grid-rows-8 w-full h-full relative">
              <Heading heading="Mathematics – Grade 10A" />

              <AttendanceFilter />

              <div className="col-start-10 row-start-1 col-span-2 flex justify-end items-start">
                <RectSearchBar />
              </div>
              <AttendanceTable />

              <Qr />
            </div>
          </div>
        </div>

        {/* mobile tablet */}
      </DashboardLayout>

      <SmLayout headerComponent={<GreetingHeader heading="Attendance" />}>
        {/* tablet code */}
        <div className="px-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4 text-white pt-10">
            <div className="flex items-center flex-col gap-y-10 h-full">
              <div className="relative w-[90%] 2xs:w-[80%] md:w-[90%]">
                <QrBg />
                <Qrcode />
              </div>
              <div className="w-full">
                <AttendanceFilter />
              </div>
            </div>

            <div className="">
              <div className="flex justify-start items-center mb-5">
                <p className="text-lg font-urbanistSemiBold">
                  Mathematics - Grade 10A
                </p>
              </div>
              <div className="mb-5">
                <RectSearchBar className={"w-full"} />
              </div>

              <div className="overflow-y-auto max-h-[550px] scrollbar-thin">
                <div className="flex flex-col gap-y-3 ">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                    {attendanceData.map((student, index) => (
                      <div className="relative" key={index}>
                        <AttendanceBgSm />
                        <div className="relative p-5 gap-y-2 flex flex-col justify-center items-center">
                          <div className="relative">
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-secondary rounded-full flex justify-center items-center text-xs">
                              {index}
                            </div>
                            <img
                              src={student.avatar}
                              alt={`${student.name} avatar`}
                              className="w-12 h-12 4xl:w-14 4xl:h-14 3xl:h-10 3xl:w-10 rounded-full"
                            />
                          </div>

                          <p className="text-lg">{student.name}</p>

                          <div className="">
                            <span
                              className={`${statusColor(
                                student.status
                              )} px-2 py-1 rounded-[8px]`}
                            >
                              {student.status}
                            </span>
                          </div>

                          <div className="flex gap-3 justify-end">
                            <button
                              {...getButtonProps(student.status, "P")}
                              onClick={() =>
                                handleStatusChange(index, "Present")
                              }
                            >
                              P
                            </button>
                            <button
                              {...getButtonProps(student.status, "A")}
                              onClick={() =>
                                handleStatusChange(index, "Absent")
                              }
                            >
                              A
                            </button>
                            <button
                              {...getButtonProps(student.status, "L")}
                              onClick={() => handleStatusChange(index, "Leave")}
                            >
                              L
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SmLayout>
    </>
  );
};

export default Attendance;
