"use client";
import React, { useEffect, useState } from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";

// Using local storage
const StoreData = (email: any, user_id: any, firstname: any, role: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userId", user_id);
    localStorage.setItem("email", email);
    localStorage.setItem("first_name", firstname);
    localStorage.setItem("role", role);
  }
};

// ! To be accessed for button visibility control
export const getUserData = async () => {
  // const user_id = userid;
  // console.log(userid);
  const response = await fetch("/api/get_user/route", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const data = await response.json();

  const userDataa = data;
  console.log("User_Info:", data);

  return JSON.stringify(userDataa);
};

export const User_Info = () => {
  return Promise.resolve(getUserData());
};

const Header: React.FC = () => {
  const route = useRouter();

  const [firstName, setFirstName] = useState("");
  const [user_id, setUserID] = useState<any>(null);
  useEffect(() => {
    localStorage.removeItem("first_name");
    let name = localStorage.getItem("first_name");
    let user_id = localStorage.getItem("userId");
    setFirstName(name ?? "");
    setUserID(user_id ?? null);
  }, []);

  // console.log(user_id)
  console.log(Promise.resolve(getUserData()));

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
          <span>Admin {firstName}</span>
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
