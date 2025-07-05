const Heading = ({ heading }) => {
  return (
    <div className="col-span-3 flex col-start-1 row-start-1 justify-start items-center 3xl:ps-10  xl:ps-4 ps-4">
      <p className="text-[20px] 4xl:text-3xl 3xl:text-2xl 2xl:text-xl hd:text-lg xl:text-base lg:text-lg font-urbanistSemiBold">
        {heading}
      </p>
    </div>
  );
};

export default Heading;
