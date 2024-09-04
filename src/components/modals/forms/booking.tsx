import SlidingSelect from "@/components/ui/sliding_select";
import { useGlobalContext } from "@/context/GlobalContext";
import AppointmentDashboard from "@/pages/appointments/for_booking/app_dash";
import { GetDate, GetEveningStatus, GetTime } from "@/utils/auxiliary";
import {
  Appointment,
  ApptTeach,
  Evening,
  Teacher,
  TimeSlot,
} from "@/utils/data_interface";
import React, { useEffect, useState } from "react";

interface Menuprops {
  LonClose: () => void;
  studentId: number;
  myId: number;
}

function groupByTeacher(data: any[]): { [teacher_id: number]: any[] } {
  return data.reduce((result, currentItem) => {
    const teacherId = currentItem.teacher_id;
    if (!result[teacherId]) {
      result[teacherId] = [];
    }
    result[teacherId].push(currentItem);
    return result;
  }, {} as { [teacher_id: number]: any[] });
}

function getStaffIds(data: any) {
  return data.map((item: any) => item.staff_id);
}

const Booking: React.FC<Menuprops> = ({ LonClose, studentId, myId }) => {
  const { globalEvening, globalEveningTeachers } = useGlobalContext();

  // State to store the evening details
  const [eveningDetails, setEveningDetails] = useState<Evening>();
  const [slotList, setSlotList] = useState<Appointment[]>([]);
  const [slotkey, setSlotkey] = useState<TimeSlot[]>([]);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [appt, setAppt] = useState<ApptTeach[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);


  useEffect(() => {
    console.log({ appt });
  }, [appt]);

  useEffect(() => {
    const fetchEveningData = async () => {
      if (globalEvening && globalEvening !== "all") {
        try {
          // Fetch evening data by ID from the API
          const response = await fetch(
            `api/fetch/evening/route?evening=${globalEvening}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          // console.log(data.evening);
          setEveningDetails(data.evening);
          //  setIsLoading(false);
        } catch (err: any) {
          console.log(err);
        }
      } else {
        //   setIsLoading(false);
      }
    };

    // console.log(globalEveningTeachers);
    fetchEveningData();

    if (globalEvening !== "all" && globalEveningTeachers?.length > 0) {
      setEveningDetails({
        ...globalEvening,
        teachers: globalEveningTeachers,
      });
    }
  }, [globalEvening, globalEveningTeachers]);

  useEffect(() => {
    const getSlotKeys = async () => {
      // globalEveningTeachers.length > 0
      if (globalEvening && globalEvening !== "all") {
        const start_time = GetTime(eveningDetails?.start_time);
        const end_time = GetTime(eveningDetails?.end_time);
        const interval = eveningDetails?.time_per_meeting;

        const genData = {
          start_time,
          end_time,
          interval,
        };

        try {
          // Fetch evening data by ID from the API
          const response = await fetch(`api/generates/getslots`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(genData),
          });
          const data = await response.json();

          if (response.ok && !data.error) {
            // setSlotList(data.ap_slot);
            setSlotkey(data.slots);
          }

          // console.log(data);
        } catch (err: any) {
          console.log(err);
        }
      }
    };

    getSlotKeys();
  }, [globalEvening, globalEveningTeachers, slotList]);

  useEffect(() => {
    const getSlotList = async () => {
      // globalEveningTeachers.length > 0
      if (globalEvening && globalEvening !== "all") {
        try {
          // Fetch evening data by ID from the API
          const response = await fetch(
            `api/fetch/appointment/route?eveningId=${globalEvening}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(data);

          if (response.ok && !data.error) {
            // setSlotList(data.ap_slot);
            setSlotList(data.appointment);
          }

          // console.log(data);
        } catch (err: any) {
          console.log(err);
        }
      }
    };

    getSlotList();
  }, [globalEvening, globalEveningTeachers]);

  useEffect(()=>{
    console.log(selectedOption)
  }, [selectedOption, setSelectedOption])

  // const handleGenerateSlots = async (event: any) => {
  //   event.preventDefault();

  //   if (
  //     globalEvening &&
  //     globalEvening !== "all" &&
  //     globalEveningTeachers.length > 0
  //   ) {
  //     const start_time = GetTime(eveningDetails?.start_time);
  //     const end_time = GetTime(eveningDetails?.end_time);
  //     const interval = eveningDetails?.time_per_meeting;
  //     const teacher_list = getStaffIds(globalEveningTeachers);
  //     const evening_id = globalEvening;

  //     const genData = {
  //       start_time,
  //       end_time,
  //       interval,
  //       teacher_list,
  //       evening_id,
  //     };

  //     // console.log(genData)

  //     try {
  //       // Fetch evening data by ID from the API
  //       const response = await fetch(`api/generates/gen_slots`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(genData),
  //       });
  //       const data = await response.json();

  //       if (response.ok && !data.error) {
  //         setSlotList(data.ap_slot);
  //         setSlotkey(data.slots);
  //       }

  //       // console.log(data);
  //     } catch (err: any) {
  //       console.log(err);
  //     }
  //   }
  // };

  // Function to save generated appointments (slots) to the database
  const handleSaveAppointments = async (event: any) => {
    event.preventDefault();

    const appt_index = appt.map((apt: ApptTeach) => apt.appoitment_id);

    const bookingData = {
      student_id: studentId,
      parent_id: myId,
      appointment_ids: appt_index,
    };

    console.log(bookingData);
    if (appt.length > 0) {
      try {
        const response = await fetch(`/api/create/appointment/book`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Appointments saved successfully:", result);
          setSaveSuccess(true); // Set success state
        } else {
          console.error("Failed to save appointments");
          setSaveSuccess(false); // Set failure state
        }
      } catch (error) {
        console.error("Error saving appointments:", error);
        setSaveSuccess(false); // Set failure state
      }
    }
  };

  // console.log(slotList);
  // console.log("Slots", slotkey);
  // console.log(globalEveningTeachers);

  if (!globalEvening || globalEvening === "all") {
    return <div>Please select an evening to Book appointments slots.</div>;
  }

  const handleSelectAppointment = ({
    appoitment_id,
    teacher_id,
    start_time,
  }: ApptTeach) => {
    const time = appt.find((a) => a.start_time == start_time);
    if (time) {
      return;
    }
    const exist = appt.find((a) => a.teacher_id == teacher_id);
    if (exist) {
      setAppt((arr) => {
        const res = [...arr];
        const update = res.find((a) => a.teacher_id == teacher_id);
        if (update) {
          update.appoitment_id = appoitment_id;
          update.start_time = start_time;
        }

        return res;
      });
    } else {
      if (appt.length < globalEveningTeachers.length) {
        setAppt((arr) => [...arr, { teacher_id, appoitment_id, start_time }]);
      }
    }
  };

  console.log(globalEveningTeachers)

  const verifySelected = (appt_id: number): boolean => {
    const exist = appt.findIndex((a) => a.appoitment_id == appt_id);

    return exist > -1 ? true : false;
  };




  return (
    <div className=" p-6 bg-white rounded-lg shadow-lg min-[50vh] max-h-[80vh] flex flex-col justify-between ">
      <div className=" overflow-y-scroll  scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200 items-center justify-center justify-items-center min-w-full min-h-full  ">
        <AppointmentDashboard
          timeslots={slotkey}
          eve_teachers={globalEveningTeachers}
          eve_appointments={slotList}
          handleSelectAppt={handleSelectAppointment}
          verifySelected={verifySelected}
        />
      </div>
      {/* Action buttons */}
      <div className="flex items-center flex-row-reverse justify-between">
        <div className=" flex space-x-4">
         
          <div>

          <SlidingSelect starting_times={slotkey} setSelected={setSelectedOption} />
          </div>
          {selectedOption? 
           <button
           type="button"
           onClick={(e) => handleSaveAppointments(e)}
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         >
           Generate optimal Schdule
         </button>: null}
          {appt.length == globalEveningTeachers.length ? (
            <button
              type="button"
              onClick={(e) => handleSaveAppointments(e)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Booking
            </button>
          ) : null}
        </div>
        <button
          type="button"
          onClick={LonClose}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Booking;
