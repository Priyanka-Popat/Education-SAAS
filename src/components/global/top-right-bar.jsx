import { useState, useRef, useEffect } from "react";
import SearchBar from '../ui/search-bar';
import data from "../../data/ProfileData.json";
import { useNavigate } from "react-router-dom";

const TopRightBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="topRightBar bg-primary rounded-[24px] px-5 flex items-center gap-x-2 justify-between w-full h-full">
      <SearchBar />

      <div className="flex items-center gap-x-5" ref={menuRef}>
        <div className="rounded-full bg-[#FFFFFF0F] w-[70px] h-[45px] flex justify-center items-center relative">
          <img src="/assets/icons/purple.svg" className="absolute top-1 right-0" alt="" />
          <img src="/assets/icons/notification-icon.svg" alt="" className="w-6" />
        </div>

        <div className="sudoProfileClass z-50 relative">
          <img
            src={data.profile.profileImage}
            alt="profile"
            className="w-[60px] cursor-pointer"
            onClick={() => setMenuOpen(prev => !prev)}
          />

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-[9999] text-black">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => navigate("/profile")}>
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopRightBar;
