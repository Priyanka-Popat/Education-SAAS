const GreetingHeader = ({ heading }) => {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="">
      <p className="font-urbanistSemiBold text-lg 4xl:text-4xl 3xl:text-[25px] hd:text-xl hdplus:text-2xl 2xl:text-[25px] lg:text-[19px]">{ heading }</p>
      <p className="lg:text-sm text-xs font-urbanistRegular 4xl:text-xl 3xl:text-base hd:text-sm hdplus:text-base 2xl:text-base 2xl:mt-1 lg:mt-0">{ formattedDate }</p>
    </div>
  );
};

export default GreetingHeader;
