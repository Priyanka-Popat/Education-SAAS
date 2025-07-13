import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import SmLayout from "@/components/global/sm-layout";
import CurrentLecture from "@/features/dashboard/components/current-lecture";
import LatestNews from "@/features/dashboard/components/latest-news/latest-news";
import TimeTable from "@/features/dashboard/components/time-table/time-table";
import AssignedSubjects from "@/features/dashboard/components/assigned-subject/assigned-subjects";

function Dashboard() {
  return (
    <>
      <DashboardLayout
        className="child"
        headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
      >
        <div className="lg:col-start-1 lg:row-start-2 lg:col-span-12 lg:row-span-9 col-start-1 row-start-3 col-span-4 row-span-9">
          <div className="h-full lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr_auto]] w-full grid grid-cols-4 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
            <div className="col-span-3 col-start-10 row-start-1 row-span-3 c7 px-4 pb-4 pt-8 hd:px-4 hd:pb-4 hd:pt-8 lg:px-3 lg:pb-3 lg:pt-6 4xl:px-6 4xl:pb-5 4xl:pt-12 hidden lg:block">
              <LatestNews />
            </div>

            <div className="lg:col-span-4 lg:col-start-1 lg:row-start-5 lg:row-span-5 c9 col-start-1 row-start-4 col-span-4 row-span-3 ps-4 pb-4">
              <TimeTable />
            </div>
            <div className="col-span-5"></div>

            <div className="lg:col-span-3 lg:col-start-10 lg:row-start-4 lg:row-span-5 col-start-1 row-start-1 col-span-4 row-span-3 lg:bg-white rounded-tl-[40px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[0px] lg:pt-[15px] lg:pl-[15px] lg:pr-0 lg:pb-0 p-[15px]">
              <div className="col-span-8"></div>
              <CurrentLecture />
            </div>

            <div className="col-span-5 col-start-5 row-start-6 row-span-3 c6 hidden lg:block px-4 pb-4">
              <AssignedSubjects />
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SmLayout headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}>
        <div className="px-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4 text-white pt-10">
            <div className="min-h-[300px] md:min-h-[250px]">
              <CurrentLecture />
            </div>
            <div className="min-h-[300px] md:min-h-[250px]">
              <TimeTable />
            </div>
            <div className="min-h-[300px] md:min-h-[250px]">
              <AssignedSubjects />
            </div>
            <div className="min-h-[300px] md:min-h-[250px]">
              <LatestNews />
            </div>
          </div>
        </div>
      </SmLayout>
    </>
  );
}

export default Dashboard;
