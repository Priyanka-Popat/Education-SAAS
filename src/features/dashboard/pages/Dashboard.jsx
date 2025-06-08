import CurrentLecture from "@/features/dashboard/components/current-lecture";
import LatestNews from "@/features/dashboard/components/latest-news/latest-news";
import TimeTable from "@/features/dashboard/components/time-table/TimeTable";
import AssignedSubjects from "@/features/dashboard/components/assigned-subject/assigned-subjects";
import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";

function Dashboard() {
  return (
    <>
      <DashboardLayout
        className="child"
        headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
      >
        {/* Row-3 */}

        <div className="col-span-3 col-start-10 row-start-2 row-span-4 c7 px-4 pb-4 pt-8 hidden lg:block">
          <LatestNews />
        </div>

        {/* Row-5 */}
        <div className="col-span-4 col-start-1 row-start-6  row-span-5 c9 hidden lg:block">
          <TimeTable />
        </div>
        <div className="col-span-5"></div>

        {/* Row-6 */}
        <div className="col-span-3 col-start-10 row-start-6 row-span-5 bg-white rounded-tl-[40px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[0px] pt-[15px] pl-[15px] hidden lg:block">
          <div className="col-span-8"></div>
          <CurrentLecture />
        </div>

        {/* Row-8 */}
        <div className="col-span-5 col-start-5 row-start-8 row-span-3 c6 hidden lg:block">
          <AssignedSubjects />
        </div>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
