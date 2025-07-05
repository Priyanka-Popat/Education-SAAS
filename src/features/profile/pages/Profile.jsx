import GreetingHeader from "@/components/global/greeting-header";
import DashboardLayout from "@/components/global/dashboard-layout";
import SmLayout from "@/components/global/sm-layout";
import ProfileBg from "@/components/ui/profile-bg";
import ProfileRightBg from "@/components/ui/profile-md-right-bg";
import ProfileLeftBg from "@/components/ui/profile-md-left-bg";
import GlassBox from "@/components/ui/glass-box";
import RoundedBorderButton from "@/components/ui/rounded-border";
import YourInfoCard from "@/features/profile/components/your-info-card";
import AboutSection from "@/features/profile/components/about-section";
import AwardsAndCertificates from "@/features/profile/components/awards-and-certificates";
import YourInfoBg from "@/features/profile/components/your-info-bg-sm";
import AboutBg from "@/features/profile/components/about-bg";
import AwardBg from "@/features/profile/components/award-bg-sm";

const Profile = () => {
  return (
    <>
      <DashboardLayout
        className="bg-[#131313] hidden lg:grid"
        headerComponent={<GreetingHeader heading="Profile" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Profile", href: "/profile" },
        ]}
      >
        <div className="lg:col-start-1 lg:row-start-3 xl:row-start-2 lg:col-span-12 lg:row-span-9 col-start-1 row-start-3 col-span-6 row-span-10 relative px-4 hdplus:px-[21px] 2xl:px-5 2xl:pb-5 pb-4 c9 pt-0 xl:pt-[1.5rem] 4xl:pt-[2.5rem] 3xl:pt-[2rem] 2xl:pt-[2rem] text-white hidden lg:block c9">
          <div className="w-full relative h-full">
            <ProfileBg />

            <div className="grid grid-cols-11 grid-rows-9 3xl:grid-rows-8 w-full h-full">
              <YourInfoCard />
              <AboutSection />
              <AwardsAndCertificates />
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SmLayout headerComponent={<GreetingHeader heading="Profile" />}>
        {/* tablet code */}
        <div className="px-4">
          <div className=" hidden md:grid md:grid-cols-2 grid-cols-1 grid-row-2 gap-x-4 gap-y-4 text-white pt-10">
            <div className="relative">
              <ProfileLeftBg />
              <div className="relative grid grid-cols-4 grid-rows-10">
                <div className="col-start-1 row-start-1 col-span-4 row-span-5">
                  <div className="grid grid-cols-3 grid-rows-4 w-full h-full">
                    <div className="col-start-1 row-start-1 col-span-2 ps-5 py-3 flex justify-start items-center">
                      <p className="text-lg font-urbanistSemiBold">
                        Your Information
                      </p>
                    </div>

                    <div className="col-start-1 row-start-2 row-span-3 4xl:row-span-4 ps-5 4xl:ps-8 flex justify-start items-start pt-2">
                      <img
                        src="/assets/img/profile-pic.svg"
                        alt=""
                        className=""
                      />
                    </div>

                    <div className="col-start-2 row-start-2 col-span-2 row-span-2">
                      <div className="flex flex-col gap-y-3 h-full px-3">
                        <p className="font-urbanistSemiBold text-lg">
                          Adam Thompson
                        </p>
                        <div className="flex flex-col gap-y-4 4xl:gap-y-7 h-full">
                          <p className="text-base font-urbanistMedium">
                            Senior Mathematics Faculty
                          </p>
                          <div className="flex flex-col gap-y-1 4xl:gap-y-3">
                            <p className="font-urbanistMedium text-xs text-white">
                              <span className="font-urbanistRegular text-xs text-grey">
                                Experience:
                              </span>{" "}
                              12+ Years
                            </p>
                            <p className="font-urbanistMedium text-xs text-white">
                              <span className="font-urbanistRegular text-xs text-grey">
                                Email address:
                              </span>{" "}
                              Adamtson@gmail.com
                            </p>
                            <p className="font-urbanistMedium text-xs text-white">
                              <span className="font-urbanistRegular text-xs text-grey">
                                Phone Number:
                              </span>{" "}
                              +91 5688 5678 57
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-start-1 row-start-6 col-span-4 row-span-5">
                  <div className="grid grid-cols-3 grid-rows-4 w-full h-full">
                    <div className="col-start-1 row-start-1 col-span-2 ps-5 py-3 flex justify-start items-center">
                      <p className="text-lg font-urbanistSemiBold">About</p>
                    </div>

                    <div className="col-span-3 row-span-4 col-start-1 px-5 row-start-2">
                      <div className="flex flex-col gap-y-1">
                        <p className="font-urbanistMedium text-xs text-white">
                          With 10+ years of experience teaching high school
                          math, I focus on building strong foundations while
                          making concepts engaging and practical. I aim to boost
                          student confidence, encourage curiosity, and support
                          success in both academics and competitive exams.
                        </p>

                        <div className="flex flex-col gap-y-2">
                          <p className="text-lg font-urbanistSemiBold">
                            Expertise
                          </p>

                          <div className="flex flex-wrap gap-2 w-[90%]">
                            {[
                              "Data Interpretation",
                              "Trigonometry",
                              "Linear Algebra",
                              "Algebra",
                              "Math Reasoning",
                            ].map((item) => (
                              <GlassBox
                                key={item}
                                className="px-3 py-0.5 !rounded-full text-[10px] lg:text-[10px] font-urbanistRegular border border-white/30"
                              >
                                {item}
                              </GlassBox>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <RoundedBorderButton className="absolute md:!bottom-2 md:!right-1 bottom-0 right-1 md:w-[35px] md:h-[35px] h-[45px] w-[45px] bg-[#17141B] 2xs:bottom-0 2xs:right-0" />
            </div>

            <div className="relative">
              <ProfileRightBg />
              <div className="relative h-[500px] grid grid-cols-4 grid-rows-10">
                <div className="col-start-1 row-start-1 col-span-2 ps-5 py-3 flex justify-start items-center">
                  <p className="text-lg font-urbanistSemiBold">Awards</p>
                </div>
                <div className="col-start-1 col-span-4 row-span-3 row-start-2">
                  <ul className="list-disc ps-9 pb-5 font-urbanistRegular text-xs text-white w-full">
                    {[
                      "Excellence in Teaching Award – 2022",
                      "Excellence in Curriculum Innovation – 2021",
                      "Outstanding Contribution to Education – 2023",
                      "Excellence in Mathematics Education Award – 2020",
                    ].map((award, index) => (
                      <li key={index} className="mb-2">
                        {award}
                      </li>
                    ))}
                  </ul>

                  <div className="ps-5 pb-3">
                    <p className="text-lg font-urbanistSemiBold">
                      Certificates
                    </p>
                  </div>

                  <ul className="list-disc ps-9 pb-5 font-urbanistRegular text-xs text-white w-full">
                    {[
                      "Certified Professional Educator (CPE) – 2021",
                      "Diploma in Educational Leadership – 2022",
                      "Certification in Digital Teaching Tools – 2023",
                      "Advanced Certification in Mathematical Problem Solving – 2022",
                    ].map((cert, index) => (
                      <li key={index} className="mb-2">
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <RoundedBorderButton className="absolute md:bottom-1 md:right-0 bottom-0 3xs:bottom-1 3xs:right-0 right-1 w-[40px] h-[40px] bg-[#17141B]" />
            </div>
          </div>

          {/* mobile device */}
          <div className="md:hidden flex justify-between gap-y-8 items-center flex-col">
            <div className="grid grid-cols-1 grid-rows-[auto_auto_auto_auto_auto_auto_auto_auto] gap-x-4 gap-y-4 text-white pt-10 min-h-[80vh] h-full">
              <div className="col-start-1 row-start-1 col-span-1 row-span-4">
                <div className="relative h-full w-full">
                  <YourInfoBg />
                  <div className="relative grid grid-cols-[1fr_0.5fr_1fr_1fr] grid-rows-[0.5fr_1fr_1fr]">
                    <div className="col-start-1 row-start-1 col-span-3 ps-5 py-3 flex justify-start items-start">
                      <p className="text-lg font-urbanistSemiBold">
                        Your Information
                      </p>
                    </div>

                    <div className="col-start-1 col-span-2 row-start-2 row-span-3 ps-5 4xl:ps-8 flex justify-center items-start pt-2 pb-4 h-full">
                      <img
                        src="/assets/img/profile-pic.svg"
                        alt=""
                        className=""
                      />
                    </div>

                    <div className="col-start-3 row-start-2 col-span-2 row-span-2">
                      <div className="flex flex-col gap-y-1 h-full p-3">
                        <p className="font-urbanistSemiBold 2xs:text-xl text-base">
                          Adam Thompson
                        </p>
                        <div className="flex flex-col gap-y-1 4xl:gap-y-7 h-full">
                          <p className="2xs:text-lg text-sm font-urbanistMedium">
                            Senior Mathematics Faculty
                          </p>
                          <div className="flex flex-col gap-y-1 4xl:gap-y-3">
                            <p className="font-urbanistMedium text-xs text-white">
                              <span className="font-urbanistRegular text-xs text-grey">
                                Experience:
                              </span>{" "}
                              12+ Years
                            </p>
                            <p className="font-urbanistMedium text-xs text-white">
                              <span className="font-urbanistRegular text-xs text-grey">
                                Email address:
                              </span>{" "}
                              Adamtson@gmail.com
                            </p>
                            <p className="font-urbanistMedium text-xs text-white">
                              <span className="font-urbanistRegular text-xs text-grey">
                                Phone Number:
                              </span>{" "}
                              +91 5688 5678 57
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-start-1 row-start-5 col-span-1 row-span-4">
                <div className="relative h-full w-full">
                  <AboutBg />
                  <RoundedBorderButton className="absolute bottom-3 right-3 w-[40px] h-[40px] bg-[#17141B]" />
                  <div className="relative">
                    <div className="grid grid-cols-3 grid-rows-[0.5fr_1fr_1fr] w-full h-full">
                      <div className="col-start-1 row-start-1 col-span-2 ps-5 py-3 flex justify-start items-center">
                        <p className="text-lg font-urbanistSemiBold">About</p>
                      </div>

                      <div className="col-span-3 row-span-4 col-start-1 px-5 pb-5 row-start-2">
                        <div className="flex flex-col gap-y-1">
                          <p className="font-urbanistMedium text-xs text-white">
                            With 10+ years of experience teaching high school
                            math, I focus on building strong foundations while
                            making concepts engaging and practical. I aim to
                            boost student confidence, encourage curiosity, and
                            support success in both academics and competitive
                            exams.
                          </p>

                          <div className="flex flex-col gap-y-2">
                            <p className="text-lg font-urbanistSemiBold">
                              Expertise
                            </p>

                            <div className="flex flex-wrap gap-2 w-[90%]">
                              {[
                                "Data Interpretation",
                                "Trigonometry",
                                "Linear Algebra",
                                "Algebra",
                                "Math Reasoning",
                              ].map((item) => (
                                <GlassBox
                                  key={item}
                                  className="px-3 py-0.5 !rounded-full text-[10px] lg:text-[10px] font-urbanistRegular border border-white/30"
                                >
                                  {item}
                                </GlassBox>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="relative">
                <AwardBg />

                <RoundedBorderButton className="absolute bottom-3 right-3 w-[40px] h-[40px] bg-[#17141B]" />

                <div className="relative h-auto grid grid-cols-4 grid-rows-6">
                  <div className="col-start-1 row-start-1 col-span-2 ps-5 py-3 flex justify-start items-center">
                    <p className="text-lg font-urbanistSemiBold text-white">
                      Awards
                    </p>
                  </div>
                  <div className="col-start-1 col-span-4 row-span-3 row-start-2">
                    <ul className="list-disc ps-9 pb-5 font-urbanistRegular text-xs text-white w-full">
                      {[
                        "Excellence in Teaching Award – 2022",
                        "Excellence in Curriculum Innovation – 2021",
                        "Outstanding Contribution to Education – 2023",
                        "Excellence in Mathematics Education Award – 2020",
                      ].map((award, index) => (
                        <li key={index} className="mb-2">
                          {award}
                        </li>
                      ))}
                    </ul>

                    <div className="px-5 pb-3">
                      <p className="text-lg text-white font-urbanistSemiBold">
                        Certificates
                      </p>
                    </div>

                    <ul className="list-disc ps-9 pb-5 pe-5 font-urbanistRegular text-xs text-white w-full">
                      {[
                        "Certified Professional Educator (CPE) – 2021",
                        "Diploma in Educational Leadership – 2022",
                        "Certification in Digital Teaching Tools – 2023",
                        "Advanced Certification in Mathematical Problem Solving – 2022",
                      ].map((cert, index) => (
                        <li key={index} className="mb-2">
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SmLayout>
    </>
  );
};

export default Profile;
