import { useState, useRef, useEffect } from "react";
import SearchBar from "@/components/ui/search-bar";
import data from "@/data/ProfileData.json";
import { useNavigate } from "react-router-dom";
import LogoutDialog from "../ui/logout";
import { X } from "lucide-react";
import { Bell, BellOff  } from "lucide-react";

const TopRightBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleEscKey(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="topRightBar bg-primary rounded-[24px] px-5 grid grid-cols-[1fr_auto] xl:gap-x-3 lg:gap-x-0 w-full h-full">
        <SearchBar />

        <div
          className="flex items-center 4xl:gap-x-6 3xl:gap-x-4 hd:gap-x-2 2xl:gap-x-3 lg:gap-x-2 w-full justify-end"
          
        >
          
          {/* <Bell className="w-5 h-5 4xl:w-7 4xl:h-7 3xl:w-6 3xl:h-6 2xl:w-5 2xl:h-5 lg:w-4 lg:h-4 text-white srtoke-2" /> */}

          <div ref={menuRef} className="sudoProfileClass z-50 relative">
            <img
              src={data.profile.profileImage}
              alt="profile"
              className="4xl:w-[70px] 4xl:h-[70px] 3xl:w-[50px] 3xl:h-[50px] hd:w-[45px] hd:h-[45px] lg:h-[35px] lg:w-[35px] cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
            />

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-[9999] text-black">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-stretch justify-stretch">
          <div className="relative w-full h-full overflow-auto">
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>
            <LogoutDialog onClose={handleCancel} handleLogout={handleLogout} />
          </div>
        </div>
      )}
    </>
  );
};

export default TopRightBar;
