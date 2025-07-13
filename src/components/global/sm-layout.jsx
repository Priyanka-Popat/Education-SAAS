import { Menu, X } from "lucide-react";
import ExpandableSearch from "../ui/expandable-search";
import SideBar from "./side-bar";
import { useState, useRef, useEffect } from "react";
import data from "@/data/ProfileData.json";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./bread-crumbs";
import Loader from "@/components/ui/loader";

const SmLayout = ({ children, headerComponent, breadcrumbs = [] }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sideBarRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close sidebar
      if (
        menuOpen &&
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }

      // Close profile
      if (
        profileOpen &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (menuOpen) setMenuOpen(false);
        if (profileOpen) setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen, profileOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-primary flex items-center justify-center z-[9999]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-primary lg:hidden min-h-screen">
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[60]"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="fixed inset-0 z-[70] md:w-[35%] w-[70%] bg-[#1C1C1C] border-r border-[#606060] transition-transform duration-500 shadow-lg p-5 flex flex-col justify-between"
            ref={sideBarRef}
          >
            <div className="flex justify-end mb-4">
              <X
                size={28}
                className="text-white cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>
            <SideBar />
          </div>
        </>
      )}

      <div className="px-7 flex justify-between items-center py-2">
        <Menu
          className="text-white/80"
          size={20}
          onClick={() => setMenuOpen(true)}
        />

        <div className="flex items-center gap-x-5 relative" ref={profileRef}>
          <ExpandableSearch />
          <img
            src={data.profile.profileImage}
            alt="profile"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setProfileOpen((prev) => !prev)}
          />
          {profileOpen && (
            <div className="absolute top-10 right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-[9999] text-black">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="lg:pt-7 ps-7 text-white flex justify-between">
        <div className="">{headerComponent}</div>
        {breadcrumbs.length > 0 && (
          <div className="">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default SmLayout;
