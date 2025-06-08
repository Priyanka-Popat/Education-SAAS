import GreetingHeader from "@/components/global/greeting-header";
import DashboardLayout from "@/components/global/dashboard-layout";
import Qrcode from "@/components/ui/qr-code";
import Table from "@/features/attendance/components/table";
import Filters from "@/components/ui/filter";

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

const Attendance = () => {
  return (
    <DashboardLayout
      className="bg-[#131313]"
      headerComponent={<GreetingHeader heading="Attendance" />}
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Attendance", href: "/attendance" },
      ]}
    >
      <div className="col-start-1 row-start-2 col-span-12 row-span-9 relative px-4 pb-4 c9 text-white">
        <div className="attendance-info grid grid-cols-11 grid-rows-7 w-full h-full">
          <div className="col-span-3 flex col-start-1 row-start-1 justify-start items-center pt-10 ps-4">
            <p className="text-[20px] font-urbanistSemiBold">
              Mathematics – Grade 10A
            </p>
          </div>
          <div className="col-start-9 row-start-2 col-span-5">
            <Filters
              visibleFilters={["date", "grade", "filter"]}
              className={"justify-between"}
            />
          </div>

          <div className="col-start-1 row-start-2 col-span-8 c13 row-span-6  px-5 pt-8 pb-5">
            <Table />
          </div>

          <div className="ps-4 pt-4 col-start-9 row-start-3 col-span-3 row-span-5 w-full">
            <Qrcode />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Attendance;
