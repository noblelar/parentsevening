"use client"
import React, { useState } from "react";
import Button from "./button";
import { dashboardNavList } from "@/utils/datasamples";
import { useRouter } from "next/router";
import Modal from "../modals/modal";
import Add_teachermenu from "../modals/forms/add_teachermenu";
import CreateEvening from "../modals/forms/create_evening";
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
      <div className=" container m-auto flex justify-center p-2 space-x-2 ">
        {navlist.map((nav_item, id) => {
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
        })}
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
