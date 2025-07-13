import GlassBox from "@/components/ui/glass-box";

const SubjectCard = ({ grade, subject, schedule, room }) => {
  return (
    <GlassBox className="p-4 bg-white/10 backdrop-blur-md rounded-lg">
      <div className="lg:flex lg:items-center lg:justify-center grid grid-cols-2">
        <div className="lg:border-r-grey lg:border-r text-[11px] flex items-start flex-col justify-between 2xl:text-sm 4xl:text-2xl 3xl:text-lg hd:text-xs lg:text-[10px] text-white pe-2 font-urbanistRegular">
          {grade}
        </div>
        <div className="lg:border-r-grey lg:border-r text-[11px] flex items-start flex-col justify-between 2xl:text-sm 4xl:text-2xl 3xl:text-lg hd:text-xs lg:text-[10px] text-white px-2 font-urbanistSemiBold">
          {subject}
        </div>
        <div className="text-[11px] flex items-start flex-col justify-between  2xl:text-sm 4xl:text-2xl 3xl:text-lg hd:text-xs lg:text-[10px] text-white lg:border-r-grey lg:border-r lg:px-2 pe-2  font-urbanistRegular">
          {schedule}
        </div>
        <div className="text-[11px] flex items-start flex-col justify-between  2xl:text-sm 4xl:text-2xl 3xl:text-lg hd:text-xs lg:text-[10px] text-white ps-2 font-urbanistRegular">
          {room}
        </div>
      </div>
    </GlassBox>
  );
};

export default SubjectCard;
