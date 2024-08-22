"use client";
import React, { useEffect, useState } from "react";
import Button from "./button";
import { dashboardNavList } from "@/utils/datasamples";
import { useRouter } from "next/router";
import Modal from "../modals/modal";
import Add_teachermenu from "../modals/forms/add_teachermenu";
import CreateEvening from "../modals/forms/create_evening";
import { FaPlus, FaUser } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { useGlobalContext } from "@/context/GlobalContext";
import { Evening } from "@/utils/data_interface";
import { GetDate } from "@/utils/auxiliary";
// import { cookies } from "next/headers";

const navlist = dashboardNavList;

const DashboardNav = (evening_data: any) => {
  const cur_route = useRouter();

  const eve_data: Evening[] = evening_data.evening_data;
  console.log(eve_data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { globalEvening, setGlobalEvening } = useGlobalContext();

  // const { globalValue, setGlobalValue } = useGlobalContext();
  // Ensure the selected option persists across page navigation

  useEffect(() => {
    if (globalEvening) {
      setGlobalEvening(globalEvening);
    }
  }, [globalEvening, setGlobalEvening]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const checkId = (id: any) => {
    const check = id == globalEvening ? true : false;
    return check;
  };

  return (
    <div className=" w-full bg-primary_dark sticky top-[0px] z-20 ">
      <div className=" container m-auto flex justify-between p-2 space-x-2 ">
        <div>
          {/* Navigation Dropdown (left-aligned) */}
          <select
            className="text-white bg-transparent border border-white p-2 rounded"
            // ! Onchange of this evening paramenter I need to set a global balue that will help fetch data for a particular evening  evenig
            onChange={(e) => {
              setGlobalEvening(e.target.value);
            }}
          >
            {eve_data.map((nav_item, id) => (
              <option
                key={id}
                value={nav_item.evening_id}
                className=" text-black "
                selected={checkId(nav_item.evening_id)}
              >
                {`Year_${nav_item.yeargroup}_${nav_item.term}_${GetDate(
                  nav_item.date
                )}`}
              </option>
            ))}
          </select>
          <p className=" text-white ">{globalEvening}</p>
        </div>

        <div className="flex space-x-4 items-center">
          {/* User Icon */}
          {/* Plus Icon for adding items */}
          <FaPlus
            className="text-white cursor-pointer"
            size={24}
            onClick={openModal}
          />
          <TiUserAdd
            className="text-white cursor-pointer"
            size={28}
            onClick={openModal}
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
