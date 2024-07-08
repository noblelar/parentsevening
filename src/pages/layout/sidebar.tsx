import React, { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaStar,
  FaCog,
  FaUserCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { MdOutlineMenuOpen } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// import './styles/sidebar.css';
// import "../../../styles/sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [iconSize, setIconSize] = useState(25);

  const route = useRouter()
  console.log(route)
  const currentRoute = route.asPath

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    isCollapsed ? setIconSize(35) : setIconSize(22);
    console.log(iconSize);
  }, [isCollapsed]);

  return (
    <div
      className={`w-[250px] bg-[#f8f9fa] h-[calc(100vh-77.797px)] transition-[width]  top-0 duration-300 flex flex-col justify-between ${
        isCollapsed ? "w-[80px]" : ""
      }`}
    >
      <div>
        {/* <div className=" h-[5.5rem] "></div> */}
        <div className="flex items-center mb-4 " onClick={toggleSidebar}>
          {/* <FaBars onClick={toggleSidebar}  */}
          {!isCollapsed ? (
            <MdOutlineMenuOpen className=" toggle-icon " />
          ) : (
            <TbLayoutSidebarRightCollapse className="toggle-icon" />
          )}
          {/* className="toggle-icon" /> */}
          {!isCollapsed && (
            <span className="sidebar-logo hidden "> SideBar </span>
          )}
        </div>

        <div className=" mt-4 ">
          <Link href={"/dashboard"}>
            <div
              className={`flex items-center space-x-3 py-3 cursor-pointer hover:bg-[#e0e0e0] ${currentRoute == '/dashboard' ? 'bg-[#e0e0e0]': '' } rounded-lg text-primary_dark ${
                !isCollapsed ? "pl-3 " : ""
              } `}
            >
              <FaTachometerAlt
                size={iconSize}
                color={"#372549"}
                className={` ${isCollapsed ? "m-auto" : ""} `}
              />
              {!isCollapsed && (
                <span className=" font-opensans font-semibold ">Dashboard</span>
              )}
            </div>
          </Link>
          <Link href={"/appointments"}>
            <div
              className={`flex items-center space-x-3 py-3 cursor-pointer hover:bg-[#e0e0e0] rounded-lg text-primary_dark ${currentRoute == '/appointments' ? 'bg-[#e0e0e0]': '' } ${
                !isCollapsed ? "pl-3 " : ""
              } `}
            >
              <IoCalendarOutline
                size={iconSize}
                color={"#372549"}
                className={` ${isCollapsed ? "m-auto" : ""} `}
              />
              {!isCollapsed && (
                <span className=" font-opensans font-semibold ">
                  Appointments
                </span>
              )}
            </div>
          </Link>
          <Link href={"/teachers"}>
          <div
            className={`flex items-center space-x-3 py-3 cursor-pointer hover:bg-[#e0e0e0] rounded-lg text-primary_dark ${currentRoute == '/teachers' ? 'bg-[#e0e0e0]': '' } ${
              !isCollapsed ? "pl-3 " : ""
            } `}
          >
            <GiTeacher
              size={iconSize}
              color={"#372549"}
              className={` ${isCollapsed ? "m-auto" : ""} `}
            />
            {!isCollapsed && (
              <span className=" font-opensans font-semibold ">Teachers</span>
            )}
          </div>
          </Link>

          <div
            className={`flex items-center space-x-3 py-3 cursor-pointer hover:bg-[#e0e0e0] rounded-lg text-primary_dark ${
              !isCollapsed ? "pl-3 " : ""
            } `}
          >
            <PiStudent
              size={iconSize}
              color={"#372549"}
              className={` ${isCollapsed ? "m-auto" : ""} `}
            />
            {!isCollapsed && (
              <span className=" font-opensans font-semibold ">Student</span>
            )}
          </div>

          <div
            className={`flex items-center space-x-3 py-3 cursor-pointer hover:bg-[#e0e0e0] rounded-lg text-primary_dark ${
              !isCollapsed ? "pl-3 " : ""
            } `}
          >
            <FaStar
              size={iconSize}
              color={"#372549"}
              className={` ${isCollapsed ? "m-auto" : ""} `}
            />
            {!isCollapsed && (
              <span className=" font-opensans font-semibold ">Parents</span>
            )}
          </div>
          <div
            className={`flex items-center space-x-3 py-3 cursor-pointer hover:bg-[#e0e0e0] rounded-lg text-primary_dark ${
              !isCollapsed ? "pl-3 " : ""
            } `}
          >
            {/* <FaStar
              size={iconSize}
              color={"#372549"}
              className={` ${isCollapsed ? "m-auto" : ""} `}
            /> */}
            <Image
              src="/images/meeting.svg"
              width={iconSize}
              height={iconSize}
              alt="Eve icon"
              className={` ${isCollapsed ? "m-auto" : ""} `}
            />
            {!isCollapsed && (
              <span className=" font-opensans font-semibold ">Evening</span>
            )}
          </div>
          <div
            className={`flex items-center space-x-3 py-3 cursor-pointer hover:bg-[#e0e0e0] rounded-lg text-primary_dark ${
              !isCollapsed ? "pl-3 " : ""
            } `}
          >
            <FaCog
              size={iconSize}
              color={"#372549"}
              className={` ${isCollapsed ? "m-auto" : ""} `}
            />
            {!isCollapsed && (
              <span className=" font-opensans font-semibold ">Settings</span>
            )}
          </div>
        </div>
      </div>

      <div className="py-5">
        <div
          className={`flex items-center space-x-3 py-2 cursor-pointer hover:bg-[#e0e0e0] rounded-lg text-primary_dark ${
            !isCollapsed ? "pl-3 " : ""
          } `}
        >
          <FaUserCircle
            color={"#372549"}
            className={` ${isCollapsed ? "m-auto" : ""} `}
          />
          {!isCollapsed && (
            <span className=" font-abel font-semibold ">Accounts</span>
          )}
        </div>
        <div
          className={`flex items-center space-x-3 py-2 cursor-pointer hover:bg-[#e0e0e0] rounded-lg text-primary_dark ${
            !isCollapsed ? "pl-3 " : ""
          } `}
        >
          <FaQuestionCircle
            color={"#372549"}
            className={` ${isCollapsed ? "m-auto" : ""} `}
          />
          {!isCollapsed && (
            <span className=" font-abel font-semibold ">Help</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
