"use client";
import React, { useState } from "react";
import Button from "./button";
import { dashboardNavList } from "@/utils/datasamples";
import { useRouter } from "next/router";
import Modal from "../modals/modal";
import Add_teachermenu from "../modals/forms/add_teachermenu";
import CreateEvening from "../modals/forms/create_evening";
import { FaPlus, FaUser } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
// import { cookies } from "next/headers";

const navlist = dashboardNavList;

const DashboardNav = () => {
  const cur_route = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  return (
    <div className=" w-full bg-primary_dark sticky top-[0px] z-20 ">
      <div className=" container m-auto flex justify-between p-2 space-x-2 ">
        {/* {navlist.map((nav_item, id) => {
          if (nav_item.pathname == cur_route.pathname) {
            return (
              <Button
                key={id}
                onClick={openModal}
                text={nav_item.text}
                pathname={""}
              />
            );
          }
        })} */}

        <div>
          {/* Navigation Dropdown (left-aligned) */}
          <select
            className="text-white bg-transparent border border-white p-2 rounded"
            // ! Onchange of this evening paramenter I need to set a global balue that will help fetch data for a particular evening  evenig 
            onChange={() => {}}
            value={cur_route.pathname}
          >
            {navlist.map((nav_item, id) => (
              <option key={id} value={nav_item.pathname} className=" text-black " >
                {nav_item.text}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4 items-center">
          {/* User Icon */}
           {/* Plus Icon for adding items */}
           <FaPlus
            className="text-white cursor-pointer"
            size={24}
            onClick={openModal} // This can open the evening creation modal or another form
          />
          <TiUserAdd
            className="text-white cursor-pointer"
            size={28}
            onClick={openModal} // Clicking will open teacher menu modal
          />

         
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        formTitle={"Create New Evening"}
      >
        <CreateEvening onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default DashboardNav;
