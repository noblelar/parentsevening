"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import React, { useEffect, useState } from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

const Header = (user: any) => {
  // const users = getServerSideProps;

  const { userType, setUserType, globalEvening, globalValue } =
    useGlobalContext();

  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    let name = localStorage.getItem("first_name");
    // let user_id = localStorage.getItem("userId");
    setFirstName(name ?? "");
  }, []);

  const userDetail = user.user.user;
  useEffect(() => {
    setUserType(userDetail.Role.role_type);
  }, [globalEvening, globalValue, userType]);

  //  ! Checking the user type
  const adminCheck = userDetail.Role.role_type === "admin";
  const teacherCheck = userDetail.Role.role_type === "teacher";
  const parentCheck = userDetail.Role.role_type === "parent";

  return (
    <div className="header flex justify-between align-middle items-center py-[10px] px-[20px] bg-white/40  border-b-2 border-primary_light border-solid text-primary_dark ">
      <div className="flex items-center ">
        <div className="text-[2.2rem] font-extrabold mr-[20px] text-primary_dark ">
          <span className=" font-abel ">Gen</span>
          <span className="font-abeezee ">Cloud</span>
        </div>
        <div className=" flex items-center bg-[#f4f4f4] py-[5px] px-[10px] rounded-[4px] ">
          <FaSearch className="mr-2 text-[#9e9e9e] " />
          <input
            type="text"
            placeholder="Search"
            className=" border-none bg-transparent outline-none w-[200px] "
          />
        </div>
      </div>
      <div className="flex items-center">
        <FaBell className="text-[18px] mr-5 cursor-pointer " />
        {/* ! Use group hove from here  and resume to finish header */}
        <div className=" header-user group-hover: flex items-center relative cursor-pointer">
          <FaUserCircle className="text-6 mr-3 " />
          <span>
            {adminCheck || teacherCheck
              ? userDetail.Teacher.first_name
              : userDetail.Parent.first_name}
          </span>
          {/* <div className="header-dropdown">
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
