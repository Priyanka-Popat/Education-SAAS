import RoundedBorderButton from "@/components/ui/rounded-border";

const AwardsAndCertificates = () => {
  return (
    <div className="col-start-6 row-start-1 col-span-6 ps-4 row-span-8">
      <div className="award-info relative grid grid-cols-3 grid-rows-6 w-full h-full">
        <div className="col-start-1 row-start-1 ps-7 py-5 flex justify-start items-end">
          <p className="text-xl font-urbanistSemiBold">Awards</p>
        </div>

        <div className="col-start-1 col-span-3 row-span-3 row-start-2">
          <ul className="list-disc ps-11 pb-5 font-urbanistRegular text-sm">
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

          <div className="ps-7">
            <p className="text-xl font-urbanistSemiBold">Certificates</p>
          </div>

          <ul className="list-disc ps-11 py-5 font-urbanistRegular text-sm">
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

        <RoundedBorderButton className="absolute bottom-0 right-0 h-[55px] w-[55px]" />
      </div>
    </div>
  );
};

export default AwardsAndCertificates;
