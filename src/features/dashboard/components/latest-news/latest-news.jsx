
import GlassBox from "@/components/ui/glass-box";
import NewsCard from "@/features/dashboard/components/latest-news/news-card";

const LatestNews = () => {
  const newsItems = [
    {
      date: "April 20, 2025",
      postedBy: "Admin Office",
      content: "Parent-Teacher Meeting Scheduled for Friday",
    },
  ];

  return (
      <GlassBox className="p-5 h-full text-white flex flex-col gap-y-4 border border-white/30">
        <div className="flex justify-between items-center">
          <p className="font-urbanistSemiBold text-lg">Latest News</p>
          <button className="text-sm font-urbanistRegular text-grey">
            View all
          </button>
        </div>

        {newsItems.map((item, index) => (
          <NewsCard
            key={index}
            date={item.date}
            postedBy={item.postedBy}
            content={item.content}
          />
        ))}
      </GlassBox>
  );
};

export default LatestNews;
