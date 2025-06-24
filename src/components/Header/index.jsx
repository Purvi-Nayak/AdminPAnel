import React from "react";
import {
  FaBell,
  FaQuestionCircle,
  FaThumbtack,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDrawer } from "../../context/DrawerContext";
import { IMAGES } from "../../assets";
import { logout } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({ userName = "Admin" }) => {
  const { isDrawerOpen,toggleDrawer } = useDrawer();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.user);
``
  const handleLogout = () => {
    dispatch(logout());
    navigate(URLS.LOGIN);
  };
  return (
     <header className={`flex items-center justify-between bg-primarylight px-6 py-3 shadow-sm font-roboto transition-all duration-300 ease-in-out ${
      isDrawerOpen ? 'pl-64' : 'pl-6'
    }`}>

      <div
        className="flex items-center space-x-3 cursor-pointer group"
        onClick={toggleDrawer}
        role="button"
        tabIndex={0}
      >
        <FaThumbtack className="text-xl text-white-pure" 
        onClick={toggleDrawer}
        role="button"
         aria-label="Toggle Drawer" />
        <div>
          <div className="font-bold text-3xl  text-white-pure hidden md:block">TaskMaster</div>
          <div className="text-xs text-blue-600">{userName}</div>
        </div>
        {/* Tooltip */}
        <span className="absolute left-10 top-10 z-10 whitespace-nowrap bg-white-pure text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Open Drawer
        </span>
      </div>
      {/* Center: Title (optional, can remove if not needed) */}
      <div className="font-bold text-3xl text-white-pure hidden md:block">
        TaskMaster
      </div>

      {/* Right: Search, Icons, Avatar */}
      <div className="flex items-center space-x-3">
        <div>
          <img src={IMAGES.Task} alt="Task Manager Logo" className="w-8 h-8 " />
        </div>
        <button className="relative group p-2 rounded hover:bg-neutral-dark text-black">
          <FaSignOutAlt size={18} onClick={handleLogout} color='white'/>
          <span className="absolute  top-10  bg-white-pure text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Logout
          </span>
        </button>

        <button className="p-2 rounded hover:bg-neutral-dark text-white-pure ">
          <FaQuestionCircle size={18}  />
        </button>
        
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold relative group p-2 hover:bg-neutral-dark text-black">
          <img
            src={IMAGES.Profile}
            alt="User Avatar"
            className="w-full h-full rounded-full cursor-pointer"
            onClick={() => {
              if (currentUser?.role === "admin") {
                navigate("/admin/settings");
              }
            }}
            style={{
              cursor:
                currentUser?.role === "admin" ? "pointer" : "not-allowed",
              opacity: currentUser?.role === "admin" ? 1 : 0.5,
            }}
          />
          <span className="absolute  top-10  bg-white-pure text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {currentUser?.role === "admin"
              ? "Profile Settings"
              : "For admin "}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
