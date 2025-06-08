const Heading = ({ heading }) => {
  return (
    <div className="col-span-3 flex col-start-1 row-start-1 justify-start items-center pt-10 ps-4">
      <p className="text-[20px] font-urbanistSemiBold">{heading}</p>
    </div>
  );
};

export default Heading;
