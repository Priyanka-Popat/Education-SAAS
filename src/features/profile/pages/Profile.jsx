import GreetingHeader from "@/components/global/greeting-header";
import DashboardLayout from "@/components/global/dashboard-layout";
import YourInfoCard from "@/features/profile/components/your-info-card";
import AboutSection from "@/features/profile/components/about-section";
import AwardsAndCertificates from "@/features/profile/components/awards-and-certificates";

const Profile = () => {
  return (
    <DashboardLayout
      className="bg-[#131313]"
      headerComponent={<GreetingHeader heading="Profile" />}
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Profile", href: "/profile" },
      ]}
    >
      <div className="col-start-1 row-start-2 col-span-12 row-span-9 relative px-4 pb-4 c9 text-white">
        <div className="grid grid-cols-11 grid-rows-8 w-full h-full">
          <YourInfoCard />
          <AboutSection />
          <AwardsAndCertificates />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
