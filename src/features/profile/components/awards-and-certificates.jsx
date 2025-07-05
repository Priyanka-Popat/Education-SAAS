import RoundedBorderButton from "@/components/ui/rounded-border";

const AwardsAndCertificates = () => {
  return (
    <div className="col-start-6 row-start-1 col-span-6 ps-4 4xl:ps-[1.8rem] 4xl:pb-[5px] 3xl:ps-[1.4rem] 2xl:pb-[3px] row-span-9">
      <div className=" z-[100] relative grid grid-cols-3 grid-rows-8 w-full h-full  4xl:rounded-[56px] 3xl:rounded-[43px] 2xl:rounded-[30px]">
        <div className="col-start-1 row-start-1 ps-5 pt-2 pb-7 flex justify-start items-end lg:items-center 4xl:pt-4 4xl:ps-12 3xl:pt-5 3xl:ps-8 2xl:py-0 2xl:ps-5 hd:py-0 hd:ps-5 lg:pt-7 lg:ps-5">
          <p className="text-xl text-[20px] 4xl:text-4xl 3xl:text-3xl 2xl:text-2xl hd:text-xl xl:text-lg lg:text-lg font-urbanistSemiBold">Awards</p>
        </div>

        <div className="col-start-1 col-span-3 row-span-3 row-start-2">
          <ul className="list-disc ps-9 pb-5 4xl:ps-20 font-urbanistRegular text-sm lg:text-xs 3xl:ps-[4rem] hd:text-sm 2xl:text-base 4xl:text-2xl 3xl:text-base text-white">
            {[
              "Excellence in Teaching Award – 2022",
              "Excellence in Curriculum Innovation – 2021",
              "Outstanding Contribution to Education – 2023",
              "Excellence in Mathematics Education Award – 2020",
            ].map((award, index) => (
              <li key={index} className="mb-1">
                {award}
              </li>
            ))}
          </ul>

          <div className="ps-5 4xl:ps-12 4xl:pt-10 3xl:ps-8">
            <p className="text-xl text-[20px] 4xl:text-4xl 3xl:text-3xl 2xl:text-2xl hd:text-xl xl:text-lg lg:text-lg font-urbanistSemiBold">Certificates</p>
          </div>

          <ul className="list-disc ps-9 py-5 4xl:py-9 3xl:py-9 4xl:ps-20 3xl:ps-[4rem] font-urbanistRegular text-sm lg:text-xs hd:text-sm 2xl:text-base 4xl:text-2xl 3xl:text-base text-white">
            {[
              "Certified Professional Educator (CPE) – 2021",
              "Diploma in Educational Leadership – 2022",
              "Certification in Digital Teaching Tools – 2023",
              "Advanced Certification in Mathematical Problem Solving – 2022",
            ].map((cert, index) => (
              <li key={index} className="mb-1">
                {cert}
              </li>
            ))}
          </ul>
        </div>

        <RoundedBorderButton className="absolute bottom-0 right-0 hd:bottom-0 lg:bottom-1 h-[55px] w-[55px] 4xl:h-[95px] 4xl:w-[95px] 3xl:h-[75px] 3xl:w-[75px] 2xl:h-[60px] 2xl:w-[60px] hd:h-[55px] hd:w-[55px] lg:h-[45px] lg:w-[45px] bg-[#17141B]" />
      </div>
    </div>
  );
};

export default AwardsAndCertificates;
