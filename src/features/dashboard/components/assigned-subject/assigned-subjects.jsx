import GlassBox from "@/components/ui/glass-box";
import SubjectCard from "@/features/dashboard/components/assigned-subject/subject-card";

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
  ];

  return (
    <GlassBox className="p-5 m-4 h-[-webkit-fill-available] text-white flex flex-col gap-y-4 border border-white/30">
      <div className="flex justify-between items-center">
        <p className="font-urbanistSemiBold text-lg">Your Assigned Subjects</p>
        <button className="text-sm font-urbanistRegular text-grey">
          View all
        </button>
      </div>

      {subjects.map((item, index) => (
        <SubjectCard
          key={index}
          grade={item.grade}
          subject={item.subject}
          schedule={item.schedule}
          room={item.room}
        />
      ))}
    </GlassBox>
  );
};


export default AssignedSubjects