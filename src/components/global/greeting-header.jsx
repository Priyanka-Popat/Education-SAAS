const GreetingHeader = ({ heading }) => {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="">
      <p className="lg:text-[25px] font-urbanistSemiBold text-lg">{ heading }</p>
      <p className="lg:text-sm text-xs font-urbanistRegular">{ formattedDate }</p>
    </div>
  );
};

export default GreetingHeader;
