import TopRightBar from "./top-right-bar";
import SideBar from "./side-bar";
import Breadcrumbs from "./bread-crumbs";
import { Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Loader from "@/components/ui/loader";

function DashboardLayout({
  children,
  className = "",
  headerComponent,
  breadcrumbs = [],
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const sideBarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);
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
    <>
      <div className="lg:min-h-screen w-full hidden lg:block">
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-[60]"
              onClick={() => setMenuOpen(false)}
            />
            <div
              className="fixed inset-0 z-[70] w-[25%] bg-[#1C1C1C] border-r border-[#606060] transition-transform duration-500 shadow-lg p-5 flex flex-col justify-between"
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

        <div className="parent lg:p-3 p-0 grid xl:grid-cols-[auto_1fr] grid-cols-1 grid-rows-1">
          <div className="bg-white lg:rounded-tl-[0px] lg:rounded-tr-[40px] lg:rounded-br-[0px] rounded-bl-[0px] pr-3 hidden xl:block">
            <div className="c5 2xl:w-60 4xl:w-[20rem] hd:w-52 h-full bg-primary py-4 px-3 flex flex-col justify-between items-center gap-y-7 sideBar">
              <SideBar />
            </div>
          </div>

          <div
            className={`${className} h-[96.5vh]  min-h-[96.5vh] lg:rounded-bl-[40px] lg:rounded-tl-[40px] lg:rounded-br-[40px] grid lg:grid-cols-12 lg:grid-rows-[1fr_1fr_auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr_auto]  overflow-y-visible lg:overflow-hidden `}
          >
            <div className="c2 lg:row-start-1 lg:col-start-1 lg:col-span-3 col-start-1 row-start-2 col-span-6 xl:row-span-1 lg:row-span-2 row-span-1 lg:pt-7 ps-7 text-white">
              <Menu
                className="text-white/80 hidden lg:block xl:hidden mb-3"
                size={20}
                onClick={() => setMenuOpen(true)}
              />
              {headerComponent}
            </div>
            {breadcrumbs.length > 0 && (
              <div className="lg:col-start-5 row-start-1 lg:col-span-4 hidden lg:block relative">
                <Breadcrumbs items={breadcrumbs} />
              </div>
            )}
            <div className="col-start-8 row-start-1 relative hidden lg:block">
              <div className="c12"></div>
            </div>

            <div className="relative top-0 right-0 2xl:top-[-1px] 2xl:right-[-1px] col-start-9 row-start-1 col-span-4 pb-[15px] pl-[15px] row-span-2 h-[60%] justify-center items-start bg-white rounded-tl-[0px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[40px] hidden lg:flex">
              <TopRightBar />
            </div>
            <div className="col-start-1 row-start-3"></div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
