"use client";
import React, { useEffect, useState } from "react";
import {
  CalendarIcon,
  PlusIcon,
  SaveIcon,
  StartIcon,
  UserAddIcon,
} from "./buttons";
import { dashboardNavList } from "@/utils/datasamples";
import { useRouter } from "next/router";
import Modal from "../modals/modal";
import Add_teachermenu from "../modals/forms/add_teachermenu";
import CreateEvening from "../modals/forms/create_evening";
import { FaPlus, FaUser } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { RiCalendar2Line } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";
import { useGlobalContext } from "@/context/GlobalContext";
import { Evening } from "@/utils/data_interface";
import { GetDate } from "@/utils/auxiliary";
import AddTeacherMenu from "../modals/forms/add_teachermenu";
// import { cookies } from "next/headers";

// const navlist = dashboardNavList;

const DashboardNav = (evening_data: any) => {
  const cur_route = useRouter();

  const eve_data: Evening[] = evening_data.evening_data;
  // console.log(eve_data);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<string>("");
  const [title, setFormTitle] = useState<string>("");
  const { globalEvening, setGlobalEvening, globalValue } = useGlobalContext();

  // Ensure the component only renders after it's mounted on the client
  useEffect(() => {
    setIsMounted(true); // Component has mounted
  }, []);
  // const { globalValue, setGlobalValue } = useGlobalContext();

  // Ensure the selected option persists across page navigation
  useEffect(() => {
    if (globalEvening) {
      setGlobalEvening(globalEvening);
    }
  }, [globalEvening, setGlobalEvening]);

  const openModal = (form: string, title: string) => {
    setFormType(form);
    setFormTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const checkId = (id: any) => {
    const check = id == globalEvening ? true : false;
    return check;
  };



  if (!isMounted) {
    return null; // Don't render the component on the server
  }
  console.log(globalEvening);
  return (
    <div className=" w-full bg-primary_dark sticky top-[0px] z-20 ">
      <div className=" container m-auto flex justify-between p-2 space-x-2 ">
        <div>
          {/* Navigation Dropdown (left-aligned) */}
          <select
            className="text-white bg-transparent border border-white p-2 rounded"
            // ! Onchange of this evening paramenter I need to set a global balue that will help fetch data for a particular evening  evenig
            // Todo: Done
            // value={globalEvening || "all"}
            onChange={(e) => {
              setGlobalEvening(e.target.value);
            }}
          >
            <option
              value="all"
              className="text-black"
              selected={checkId("all")}
            >
              All
            </option>
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
        </div>
        <p className=" text-white ">{globalEvening ? globalEvening : null}</p>

        <div className="flex space-x-4 items-center">
          {/* Dashboard Navigations */}
          {cur_route.asPath == "/dashboard" ? (
            <StartIcon
              onClick={() => openModal("evening_form", "Create New Evening")}
              tooltip={"Start New Evening"}
            />
          ) : null}

          {/* Appointments Navigations */}
          {cur_route.asPath == "/appointments" ? (
            <CalendarIcon
              onClick={() => openModal("generate_booking", "Booking")}
              tooltip={"Generate Optimal Booking"}
            />
          ) : null}
          {/* Teachers Navigations */}
          {cur_route.asPath == "/teachers" ? (
            <PlusIcon
              onClick={() => openModal("add_teacher", "Add Teachers")}
              tooltip={"Add Teacher to Evening"}
            />
          ) : null}

          {cur_route.asPath == "/teachers" ? (
            <UserAddIcon
              onClick={() => openModal("teacher_form", "Add New Teacher")}
              tooltip={"Add New Teacher"}
            />
          ) : null}

          {/* Students Navigations */}
          {cur_route.asPath == "/students" ? (
            <UserAddIcon
              onClick={() => openModal("student_form", "Add New Evening")}
              tooltip={"Add New Student"}
            />
          ) : null}
          {/* Parents Navigations */}
          {cur_route.asPath == "/parents" ? (
            <UserAddIcon
              onClick={() => openModal("parent_form", "Add New Parent")}
              tooltip={"Add New Parent"}
            />
          ) : null}

          {/* Evenings Navigations */}
          {cur_route.asPath == "/evenings" ? (
            <PlusIcon
              onClick={() => openModal("evening_form", "Create New Evening")}
              tooltip={"Create New Evening"}
            />
          ) : null}

          {/* Settings Navigations */}
          {cur_route.asPath == "/settings" ? (
            <SaveIcon
              onClick={() => openModal("save_evening", "Save Evening")}
              tooltip={"Save Settings"}
            />
          ) : null}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} formTitle={title}>
        <div>
          {formType === "evening_form" && (
            <CreateEvening onClose={closeModal} />
          )}
          {formType === "teacher_form" && (
            <AddTeacherMenu onClose={closeModal} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DashboardNav;
