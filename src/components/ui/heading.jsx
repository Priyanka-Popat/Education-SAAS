import SplitText from "@/components/ui/split-text";

const Heading = ({ heading }) => {
  return (
    <div className="col-span-3 flex col-start-1 row-start-1 justify-start items-center 3xl:ps-10  xl:ps-4 ps-4">
      {/* <p className="text-[20px] 4xl:text-3xl 3xl:text-2xl 2xl:text-xl hd:text-lg xl:text-base lg:text-lg font-urbanistSemiBold">
        {heading}
      </p> */}

      <SplitText
        text={heading}
        className="text-[20px] 4xl:text-3xl 3xl:text-2xl 2xl:text-xl hd:text-lg xl:text-base lg:text-lg font-urbanistSemiBold"
        delay={10}
        duration={2}
        ease="elastic.out(1,0.3)"
        splitType="chars"
        from={{ opacity: 0, y:40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="left"
        // onLetterAnimationComplete={handleAnimationComplete}
      />
    </div>
  );
};

export default Heading;
