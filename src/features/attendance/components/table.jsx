import initialAttendanceData from "@/data/AttendanceData.json";
import { useState } from "react";

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

const statusColor = (status) => {
  switch (status) {
    case "Present":
      return "text-green bg-[#348D3114]";
    case "Absent":
      return "text-red bg-[#C22B2D14]";
    case "Leave":
      return "text-yellow bg-[#C0760014]";
    default:
      return "text-unmarked bg-[#B2B2B214]";
  }
};

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

const AttendanceTable = () => {
    const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  
    const handleStatusChange = (index, newStatus) => {
    setAttendanceData(prev =>
      prev.map((student, i) =>
        i === index ? { ...student, status: newStatus } : student
      )
    );
  };
  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      <table className="min-w-full table-auto border-collapse text-white">
        <colgroup>
          <col style={{ width: "25%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>

        <thead>
          <tr>
            <th className="px-6 py-2 3xl:py-1 3xl:pb-5 3xl:px-6 text-base 4xl:text-2xl 3xl:text-xl hd:text-sm lg:text-sm text-left font-urbanistSemiBold">
              Name
            </th>
            <th className="px-6 py-2 3xl:py-1 3xl:pb-5 3xl:px-6 text-base text-center 4xl:text-2xl 3xl:text-xl hd:text-sm lg:text-sm font-urbanistSemiBold">
              Roll No.
            </th>
            <th className="px-6 py-2 3xl:py-1 3xl:pb-5 3xl:px-6 text-base text-center 4xl:text-2xl 3xl:text-xl hd:text-sm lg:text-sm font-urbanistSemiBold">
              Status
            </th>
            <th className="px-6 py-2 3xl:py-1 3xl:pb-5 3xl:px-6 text-base text-right 4xl:text-2xl 3xl:text-xl
            hd:text-sm lg:text-sm font-urbanistSemiBold">
              Edit Attendance
            </th>
          </tr>
        </thead>
      </table>
      <div className="max-h-[430px] 4xl:max-h-[64vh] 3xl:max-h-[60vh] hdplus:max-h-[62vh] hd:max-h-[62vh] 2xl:max-h-[60vh] lg:max-h-[55vh] overflow-y-auto scrollbar-thin">
        <table className="min-w-full table-auto border-separate border-spacing-y-2 4xl:border-spacing-y-5 text-white">
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "30%" }} />
          </colgroup>

          <tbody>
            {attendanceData.map((student, index) => (
              <tr key={index} className="bg-[#ffffff0a]">
                <td className="px-6 py-3 2xl:py-4 2xl:px-12 hd:py-2 hd:px-7 lg:py-2 text-sm 4xl:text-2xl 3xl:text-lg hd:text-sm rounded-l-xl font-urbanistRegular">
                  <div className="flex items-center gap-2 4xl:gap-6">
                    <img
                      src={student.avatar}
                      alt={`${student.name} avatar`}
                      className="w-6 h-6 4xl:w-14 4xl:h-14 3xl:h-10 3xl:w-10 rounded-full"
                    />
                    {student.name}
                  </div>
                </td>
                <td className="px-6 py-3 2xl:py-4 2xl:px-12 hd:py-2 hd:px-7 lg:py-2  text-sm 4xl:text-2xl 3xl:text-lg text-center hd:text-sm font-urbanistRegular">
                  {student.rollNo}
                </td>
                <td className="px-6 py-3 2xl:py-4 2xl:px-12 hd:py-2 hd:px-7 lg:py-2 text-sm 4xl:text-2xl 3xl:text-lg text-center hd:text-sm font-urbanistRegular">
                  <span
                    className={`${statusColor(
                      student.status
                    )} px-2 py-1 rounded-[8px]`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-3 2xl:py-4 2xl:px-12 hd:py-2 lg:py-2 hd:px-7 rounded-r-xl">
                  <div className="flex gap-3 justify-end">
                    <button {...getButtonProps(student.status, "P")} onClick={() => handleStatusChange(index, "Present")}>P</button>
                    <button {...getButtonProps(student.status, "A")} onClick={() => handleStatusChange(index, "Absent")}>A</button>
                    <button {...getButtonProps(student.status, "L")} onClick={() => handleStatusChange(index, "Leave")}>L</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
