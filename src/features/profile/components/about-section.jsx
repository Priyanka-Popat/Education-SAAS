import GlassBox from "@/components/ui/glass-box";
import RoundedBorderButton from "@/components/ui/rounded-border";

const AboutSection = () => {
  return (
    <div className="col-start-1 row-start-5 col-span-5 row-span-4">
      <div className="about-info w-full h-full relative">
        <div className="grid grid-cols-3 grid-rows-5 w-full h-full">
          <div className="col-start-1 row-start-1 ps-7 flex justify-start items-end">
            <p className="text-xl font-urbanistSemiBold">About</p>
          </div>

          <div className="col-span-3 row-span-4 col-start-1 px-7 py-4 row-start-2">
            <div className="flex flex-col gap-y-4">
              <p className="text-sm">
                With 10+ years of experience teaching high school math, I focus
                on building strong foundations while making concepts engaging
                and practical. I aim to boost student confidence, encourage
                curiosity, and support success in both academics and competitive
                exams.
              </p>

              <div className="flex flex-col gap-y-[16px]">
                <p className="text-xl font-urbanistSemiBold">Expertise</p>

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
                      className="px-3 py-1 !rounded-full text-xs font-urbanistRegular border border-white/30"
                    >
                      {item}
                    </GlassBox>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <RoundedBorderButton className="absolute bottom-0 right-0 h-[55px] w-[55px]" />
      </div>
    </div>
  );
};

export default AboutSection;
