import GlassBox from "@/components/ui/glass-box";
import SubjectCard from "@/features/dashboard/components/assigned-subject/subject-card";
import SmTimeTableBg from "../sm-timetable-bg";
import ViewAllButton from "../grey-text-button";

const AssignedSubjects = () => {
  const subjects = [
    {
      grade: "Grade - 7B",
      subject: "Mathematics",
      schedule: "Mon & Wed - 10:00 AM",
      room: "Room No. 10",
    },
    {
      grade: "Grade - 7B",
      subject: "Mathematics",
      schedule: "Mon & Wed - 10:00 AM",
      room: "Room No. 10",
    },
    {
      grade: "Grade - 7B",
      subject: "Mathematics",
      schedule: "Mon & Wed - 10:00 AM",
      room: "Room No. 10",
    },
    {
      grade: "Grade - 7B",
      subject: "Mathematics",
      schedule: "Mon & Wed - 10:00 AM",
      room: "Room No. 10",
    },
  ];

  return (
    <>
      <GlassBox className="hidden lg:flex p-5 4xl:p-6 hd:p-3 lg:p-3 h-full text-white flex-col gap-y-4 border border-white/30">
        <div className="flex justify-between items-center">
          <p className="font-urbanistSemiBold text-lg 2xl:text-lg 4xl:text-3xl 3xl:text-2xl hd:text-base lg:text-base">
            Your Assigned Subjects
          </p>
          <button className="text-sm 2xl:text-sm 4xl:text-2xl 3xl:text-lg hd:text-sm lg:text-sm font-urbanistRegular text-grey">
            View all
          </button>
        </div>

        <div className="overflow-y-auto max-h-[250px] space-y-2 scrollbar-thin">
          {subjects.map((item, index) => (
            <SubjectCard
              key={index}
              grade={item.grade}
              subject={item.subject}
              schedule={item.schedule}
              room={item.room}
            />
          ))}
        </div>
      </GlassBox>

      {/* mobile screen */}
      <div className="lg:hidden relative h-full">
        <SmTimeTableBg />

        <div className=" relative flex justify-between items-center">
          <p className="font-urbanistSemiBold text-lg px-4 pt-4">
            Your Assigned
            <br /> Subjects
          </p>
        </div>
        <div className="px-4 pb-2 flex justify-end items-center">
          <ViewAllButton />
        </div>

        <div className="px-4 pb-4">
          <div className="flex justify-center overflow-y-auto max-h-[250px] scrollbar-thin">
            <div className="flex flex-col justify-between h-full w-[100%] gap-y-2 3xl:max-h-[200px]">
              {subjects.map((item, index) => (
                <SubjectCard
                  key={index}
                  grade={item.grade}
                  subject={item.subject}
                  schedule={item.schedule}
                  room={item.room}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignedSubjects;
