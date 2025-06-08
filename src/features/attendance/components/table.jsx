import attendanceData from "@/data/AttendanceData.json";

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
    className: `w-6 h-6 text-sm rounded-full font-urbanistRegular border cursor-pointer`,
  };
};

const AttendanceTable = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden">
      <table className="min-w-full table-auto border-collapse text-white">
        <colgroup>
          <col style={{ width: "25%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>

        <thead>
          <tr>
            <th className="px-6 py-2 text-base text-left font-urbanistSemiBold">
              Name
            </th>
            <th className="px-6 py-2 text-base text-center font-urbanistSemiBold">
              Roll No.
            </th>
            <th className="px-6 py-2 text-base text-center font-urbanistSemiBold">
              QR Status
            </th>
            <th className="px-6 py-2 text-base text-right font-urbanistSemiBold">
              Edit Attendance
            </th>
          </tr>
        </thead>
      </table>

      <div className="max-h-[430px] overflow-y-auto">
        <table className="min-w-full table-auto border-separate border-spacing-y-2 text-white">
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "30%" }} />
          </colgroup>

          <tbody>
            {attendanceData.map((student, index) => (
              <tr key={index} className="bg-[#ffffff0a]">
                <td className="px-6 py-3 text-sm rounded-l-xl font-urbanistRegular">
                  <div className="flex items-center gap-2">
                    <img
                      src={student.avatar}
                      alt={`${student.name} avatar`}
                      className="w-6 h-6 rounded-full"
                    />
                    {student.name}
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-center font-urbanistRegular">
                  {student.rollNo}
                </td>
                <td className="px-6 py-3 text-sm text-center font-urbanistRegular">
                  <span
                    className={`${statusColor(
                      student.status
                    )} px-2 py-1 rounded-[8px]`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-3 rounded-r-xl">
                  <div className="flex gap-3 justify-end">
                    <button {...getButtonProps(student.status, "P")}>P</button>
                    <button {...getButtonProps(student.status, "A")}>A</button>
                    <button {...getButtonProps(student.status, "L")}>L</button>
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
