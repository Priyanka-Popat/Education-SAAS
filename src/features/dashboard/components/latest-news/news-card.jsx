import GlassBox from "@/components/ui/glass-box";

const NewsCard = ({ date, postedBy, content }) => {
  return (
    <GlassBox className="p-4 bg-white/10 backdrop-blur-md rounded-lg">
      <div className="flex flex-col items-start gap-y-2 justify-center">
        <div className="flex items-center justify-between w-full">
          <p className="text-[11px] font-urbanistRegular text-grey">{date}</p>
          <p className="text-[11px] font-urbanistRegular text-grey">Posted by: {postedBy}</p>
        </div>
        <div className="text-sm">{content}</div>
      </div>
    </GlassBox>
  );
};

export default NewsCard;
