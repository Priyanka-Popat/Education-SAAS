import GlassBox from "@/components/ui/glass-box";
import RoundedBorderButton from "@/components/ui/rounded-border";

const AboutSection = () => {
  return (
    <div className="col-start-1 row-start-5 col-span-5 row-span-5">
      <div className="w-full h-full relative">
        <div className="grid grid-cols-3 grid-rows-4 w-full h-full">
          <div className="col-start-1 row-start-1 ps-5 4xl:py-8 4xl:px-8 2xl:pb-0 hd:pb-0 lg:pb-0 py-5 flex row-span-1 justify-start items-end 3xl:items-start">
            <p className="text-xl text-[20px] 4xl:text-4xl 3xl:text-3xl 2xl:text-2xl hd:text-xl xl:text-lg lg:text-lg font-urbanistSemiBold">About</p>
          </div>

          <div className="col-span-3 row-span-4 col-start-1 px-5 pt-2 pb-2 4xl:px-8 4xl:pt-0 3xl:pt-0 row-start-2">
            <div className="flex flex-col gap-y-3">
              <p className="font-urbanistMedium text-sm lg:text-xs hd:text-sm 2xl:text-base 4xl:text-2xl 3xl:text-base text-white">
                With 10+ years of experience teaching high school math, I focus
                on building strong foundations while making concepts engaging
                and practical. I aim to boost student confidence, encourage
                curiosity, and support success in both academics and competitive
                exams.
              </p>

              <div className="flex flex-col gap-y-[16px]">
                <p className="text-xl text-[20px] 4xl:text-4xl 3xl:text-3xl 2xl:text-2xl hd:text-xl xl:text-lg lg:text-lg font-urbanistSemiBold">Expertise</p>

                <div className="flex flex-wrap gap-2 w-[90%]">
                  {[
                    "Data Interpretation",
                    "Trigonometry",
                    "Linear Algebra",
                    "Algebra",
                    "Math Reasoning",
                    "Problem Solving",
                    "Geometry",
                  ].map((item) => (
                    <GlassBox
                      key={item}
                      className="px-3 py-1 4xl:py-3 4xl:px-6 3xl:px-4 3xl:py-2 !rounded-full text-xs lg:text-[10px] 4xl:text-2xl 3xl:text-base font-urbanistRegular border border-white/30"
                    >
                      {item}
                    </GlassBox>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <RoundedBorderButton className="absolute bottom-0 right-0 lg:bottom-1 hd:bottom-0 h-[55px] w-[55px] 4xl:h-[95px] 4xl:w-[95px] 3xl:h-[75px] 3xl:w-[75px] 2xl:h-[55px] 2xl:w-[55px] hd:h-[55px] hd:w-[55px] lg:h-[45px] lg:w-[45px] bg-[#17141B]" />
      </div>
    </div>
  );
};

export default AboutSection;
