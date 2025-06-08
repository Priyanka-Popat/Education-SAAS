
import TimetableItem from "@/features/dashboard/components/time-table/timetable-item";
import ViewAllButton from "@/features/dashboard/components/grey-text-button";
import GlassBox from "@/components/ui/glass-box";


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
    <GlassBox className="p-5 h-[-webkit-fill-available] my-4 ms-4 text-white flex flex-col gap-y-2 border border-white/30">
      <div className="flex justify-between items-center">
        <p className="font-urbanistSemiBold text-lg">Today's Timetable</p>
        <ViewAllButton />
      </div>

      <div className="flex flex-col justify-between h-full gap-y-2 max-h-[calc(100%-40px)]">
        {limitedItems.map((item, idx) => (
          <TimetableItem key={idx} {...item} />
        ))}
      </div>
    </GlassBox>
  );
};

export default TimeTable;
