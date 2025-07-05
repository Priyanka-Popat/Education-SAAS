import GlassBox from "@/components/ui/glass-box";

const NewsCard = ({ date, postedBy, content }) => {
  return (
    <GlassBox className="p-4 2xl:p-4 hd:p-3 lg:p-2 bg-white/10 backdrop-blur-md rounded-lg">
      <div className="flex flex-col items-start gap-y-2 justify-center">
        <div className="flex items-center justify-between w-full">
          <p className="text-[11px] lg:text-[10px] hd:text-[11px] 2xl:text-[11px] 4xl:text-lg 3xl:text-base font-urbanistRegular text-grey">{date}</p>
          <p className="text-[11px] lg:text-[10px] hd:text-[11px] 2xl:text-[11px] 4xl:text-lg 3xl:text-base font-urbanistRegular text-grey">Posted by: {postedBy}</p>
        </div>
        <div className="text-sm 2xl:text-sm 4xl:text-2xl 3xl:text-lg hd:text-sm lg:text-sm">{content}</div>
      </div>
    </GlassBox>
  );
};

export default NewsCard;
