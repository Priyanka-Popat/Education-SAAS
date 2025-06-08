import GlassBox from "@/components/ui/glass-box";

const SubjectCard = ({ grade, subject, schedule, room }) => {
  return (
    <GlassBox className="p-4 bg-white/10 backdrop-blur-md rounded-lg">
      <div className="flex items-center justify-center">
        <div className="border-r-grey border-r text-[11px] pe-2 font-urbanistRegular">
          {grade}
        </div>
        <div className="border-r-grey border-r text-[11px] px-2 font-urbanistSemiBold">
          {subject}
        </div>
        <div className="text-[11px] border-r-grey border-r px-2 font-urbanistRegular">
          {schedule}
        </div>
        <div className="text-[11px] ps-2 font-urbanistRegular">
          {room}
        </div>
      </div>
    </GlassBox>
  );
};

export default SubjectCard;