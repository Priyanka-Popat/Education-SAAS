import TimetableItem from "@/features/dashboard/components/time-table/timetable-item";
import ViewAllButton from "@/features/dashboard/components/grey-text-button";
import GlassBox from "@/components/ui/glass-box";
import SmTimeTableBg from "../sm-timetable-bg";

const TimeTable = () => {
  const items = [
    {
      status: "Ongoing",
      icon: "/assets/icons/green.svg",
      time: "9:00 - 9:45 AM",
      subject: "Science (Grade 7B)",
    },
    {
      status: "Upcoming",
      icon: "/assets/icons/yellow.svg",
      time: "10:00 - 10:45 AM",
      subject: "Math (Grade 7B)",
    },
    {
      status: "Ongoing",
      icon: "/assets/icons/green.svg",
      time: "11:00 - 11:45 AM",
      subject: "English (Grade 7B)",
    },
  ];

  const limitedItems = items.slice(0, 3);

  return (
    <>
      <GlassBox className="p-5 4xl:p-6 hd:p-3 lg:p-3 h-full text-white flex-col gap-y-2 border border-white/30 lg:flex hidden">
        <div className="flex justify-between items-center">
          <p className="font-urbanistSemiBold text-lg 2xl:text-lg 4xl:text-3xl 3xl:text-2xl hd:text-base lg:text-base">
            Today's Timetable
          </p>
          <ViewAllButton />
        </div>

        <div className="flex flex-col justify-between h-full gap-y-2 4xl:max-h-[400px] 3xl:max-h-[260px] overflow-y-auto scrollbar-thin">
          {limitedItems.map((item, idx) => (
            <TimetableItem key={idx} {...item} />
          ))}
        </div>
      </GlassBox>

      <div className="lg:hidden relative">
        <SmTimeTableBg />

        <div className=" relative flex justify-between items-center">
          <p className="font-urbanistSemiBold text-lg px-4 pt-4">
            Today's Timetable
          </p>
        </div>
        <div className="px-4 pb-2 flex justify-end items-center">
          <ViewAllButton />
        </div>

        <div className="px-4 pb-4">
          <div className="flex justify-center overflow-y-auto max-h-[220px]">
            <div className="flex flex-col justify-between h-full w-[100%] gap-y-2 3xl:max-h-[200px] scrollbar-thin">
              {limitedItems.map((item, idx) => (
                <TimetableItem key={idx} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTable;
