"use client";
import React, { useEffect, useState } from "react";
import {
  BookingIcon,
  CalendarIcon,
  GenerateIcon,
  PlusIcon,
  SaveIcon,
  StartIcon,
  UserAddIcon,
} from "./buttons";
import { useRouter } from "next/router";
import Modal from "../modals/modal";
import CreateEvening from "../modals/forms/create_evening";
import { useGlobalContext } from "@/context/GlobalContext";
import { Appointment, Evening, Teacher } from "@/utils/data_interface";
import { GetDate, GetEveningStatus } from "@/utils/auxiliary";
import AddTeacherMenu from "../modals/forms/add_teachermenu";
import MultiSelectTeacher from "../modals/forms/select_teacher";
import LargeModal from "../modals/large_modal";
import GenerateSlots from "../modals/forms/generate_slots";
import Booking from "../modals/forms/booking";
import CreateStudent from "../modals/forms/add_student";
import StudentCheck from "../modals/forms/student_check";

const DashboardNav = ({
  evening_data,
  myId,
  teach_data,
  eve_appointments,
}: {
  evening_data: any;
  myId: number;
  teach_data: Teacher[];
  eve_appointments: Appointment[];
}) => {
  const cur_route = useRouter();

  const eve_data: Evening[] = evening_data;

  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [LisModalOpen, setLIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<string>("");
  const [title, setFormTitle] = useState<string>("");
  const {
    globalEvening,
    setGlobalEvening,
    setGlobalEveningTeachers,
    globalEveningTeachers,
    globalValue,
    setGlobalTeachers,
    userType,
  } = useGlobalContext();
  const [showTimes, setShowTimes] = useState(false);
  const [studentId, setStudentId] = useState<null | number>(null);
  const [eveningStatus, setEveningStatus] = useState<string | null>("");

  // Ensure the component only renders after it's mounted on the client
  useEffect(() => {
    setIsMounted(true); // Component has mounted
  }, []);

  // Ensure the selected option persists across page navigation
  useEffect(() => {
    if (globalEvening) {
      setGlobalEvening(globalEvening);
    }
  }, [globalEvening, setGlobalEvening]);

  useEffect(() => {
    setGlobalTeachers(teach_data);
  }, [globalEvening]);

  const openModal = (form: string, title: string) => {
    setFormType(form);
    setFormTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const LopenModal = (form: string, title: string) => {
    setFormType(form);
    setFormTitle(title);
    setLIsModalOpen(true);
  };

  const LcloseModal = () => {
    setLIsModalOpen(false);
  };

  // console.log(eve_appointments)
  let eve_check = false;
  if (eve_appointments?.length > 0) {
    eve_appointments.forEach((eve_ap) => {
      if (eve_ap.evening_id == globalEvening) {
        eve_check = true;
        return;
      }
      // eve_check = false;
    });
  }

  const checkId = (id: any) => {
    const check = id == globalEvening ? true : false;
    return check;
  };

  useEffect(() => {
    const TeacherEveingRefill = async () => {
      try {
        const evening_Response = await fetch(
          `/api/fetch/fetch_teacher_data/route?evening=${globalEvening}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const evenings = await evening_Response.json();

        if (evening_Response.ok) {
          setGlobalEveningTeachers(evenings.teacher_eveing);
        }
      } catch (err) {
        console.error("Error fetching teachers", err);
      }
    };
    TeacherEveingRefill();
  }, [globalEvening]);

  const handleOnChange = async (event: any) => {
    const selectedEvening = event.target.value;
    setGlobalEvening(selectedEvening);

    try {
      const evening_Response = await fetch(
        `/api/fetch/fetch_teacher_data/route?evening=${selectedEvening}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const evenings = await evening_Response.json();

      console.log({ evenings });

      if (evening_Response.ok) {
        setGlobalEveningTeachers(evenings.teacher_eveing);
      }
    } catch (err) {
      console.error("Error fetching teachers", err);
    }
  };

  useEffect(() => {
    const this_eve = eve_data.find(
      (e: Evening) => e.evening_id == globalEvening
    );

    if (this_eve) {
      const status = GetEveningStatus(this_eve.status);
      setEveningStatus(status!);
    }
  }, [globalEvening, eve_data]);

  const publishAppointment = async () => {
    const publish = {
      status: "B",
    };

    try {
      const response = await fetch(
        `/api/update/evening/route?eveningId=${globalEvening}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(publish),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Appointments Published successfully:", result);
        location.reload();

        // setSaveSuccess(true); // Set success state
      } else {
        console.error("Failed to Publish appointments");
        // setSaveSuccess(false); // Set failure state
      }
    } catch (error) {
      console.error("Error Publishing appointments:", error);
      // setSaveSuccess(false); // Set failure state
    }
  };

  if (!isMounted) {
    return null; // Don't render the component on the server
  }

  return (
    <div className=" w-full bg-primary_dark sticky top-[0px] z-20 ">
      <div className=" container m-auto flex justify-between p-2 space-x-2 ">
        <div className="flex justify-center items-center ">
          {/* Navigation Dropdown (left-aligned) */}
          <select
            className="text-white bg-transparent border border-white p-2 rounded"
            // ! Onchange of this evening paramenter I need to set a global balue that will help fetch data for a particular evening  evenig
            // Todo: Done
            // value={globalEvening || "all"}
            onChange={(e) => handleOnChange(e)}
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
          <p className=" text-white/55 italic font-abel px-4 underline ">
            {userType == "parent" ? null : eveningStatus}
          </p>
        </div>
        <p className=" text-white ">{globalEvening ? globalEvening : null}</p>

        <div className="flex space-x-4 items-center">
          {/* Dashboard Navigations */}
          {cur_route.asPath == "/dashboard" && userType == "admin" ? (
            <StartIcon
              onClick={() => openModal("evening_form", "Create New Evening")}
              tooltip={"Start New Evening"}
            />
          ) : null}

          {/* Appointments Navigations */}
          {cur_route.asPath == "/appointments" &&
          userType == "admin" &&
          eve_check &&
          eveningStatus == "Started" ? (
            <button
              className=" text-primary_light font-bold w-[90px] p-2 rounded bg-white hover:text-white hover:bg-primary_light hover:border hover:border-white "
              type="button"
              onClick={publishAppointment}
            >
              Publish
            </button>
          ) : null}
          {cur_route.asPath == "/appointments" && userType == "admin" ? (
            <GenerateIcon
              onClick={() => LopenModal("generate_slots", "Booking Slots")}
              tooltip={"Generate Teacher Slots"}
            />
          ) : null}
          {cur_route.asPath == "/appointments" && userType == "parent" ? (
            <BookingIcon
              onClick={() => LopenModal("generate_booking", "Booking")}
              tooltip={" Book an Appointment "}
            />
          ) : null}
          {/* Teachers Navigations */}
          {cur_route.asPath == "/teachers" && userType == "admin" ? (
            <PlusIcon
              onClick={() =>
                openModal("add_teacher", "Add Teachers to Evening")
              }
              tooltip={"Add Teacher to Evening"}
            />
          ) : null}

          {cur_route.asPath == "/teachers" && userType == "admin" ? (
            <UserAddIcon
              onClick={() => openModal("teacher_form", "Add New Teacher")}
              tooltip={"Add New Teacher"}
            />
          ) : null}

          {/* Students Navigations */}
          {cur_route.asPath == "/students" ? (
            <UserAddIcon
              onClick={() => openModal("student_form", "Add Student")}
              tooltip={"Add New Student"}
            />
          ) : null}
          {/* Parents Navigations */}
          {cur_route.asPath == "/parents" && userType == "admin" ? (
            <UserAddIcon
              onClick={() => openModal("parent_form", "Add New Parent")}
              tooltip={"Add New Parent"}
            />
          ) : null}

          {/* Evenings Navigations */}
          {cur_route.asPath == "/evenings" && userType == "admin" ? (
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
          {formType === "add_teacher" && (
            <MultiSelectTeacher onClose={closeModal} />
          )}
          {formType === "student_form" && (
            <CreateStudent onClose={closeModal} />
          )}
        </div>
      </Modal>

      <LargeModal isOpen={LisModalOpen} onClose={LcloseModal} formTitle={title}>
        <div>
          {formType === "generate_slots" && (
            <GenerateSlots LonClose={LcloseModal} />
          )}
          {formType == "generate_booking" &&
            (!showTimes ? (
              <StudentCheck
                LonClose={LcloseModal}
                setShowTime={setShowTimes}
                setStudentId={setStudentId}
                myId={myId}
              />
            ) : (
              <Booking
                LonClose={LcloseModal}
                studentId={studentId as number}
                myId={myId}
              />
              // <p>Hello</p>
            ))}
        </div>
      </LargeModal>
    </div>
  );
};

export default DashboardNav;
