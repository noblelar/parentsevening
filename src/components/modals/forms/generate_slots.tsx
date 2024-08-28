import { useGlobalContext } from "@/context/GlobalContext";
import AppointmentDashboard from "@/pages/appointments/app_dash";
import { GetDate, GetEveningStatus, GetTime } from "@/utils/auxiliary";
import {
  Appointment,
  Evening,
  Teacher,
  TimeSlot,
} from "@/utils/data_interface";
import React, { useEffect, useState } from "react";

interface Menuprops {
  LonClose: () => void;
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

const GenerateSlots: React.FC<Menuprops> = ({ LonClose }) => {
  const { globalEvening, globalEveningTeachers } = useGlobalContext();

  // State to store the evening details
  const [eveningDetails, setEveningDetails] = useState<Evening>();
  const [slotList, setSlotList] = useState<Appointment[]>([]);
  const [slotkey, setSlotkey] = useState<TimeSlot[]>([]);

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

    // Check if globalEvening exists and fetch its details
    if (globalEvening !== "all" && globalEveningTeachers?.length > 0) {
      // Fetch and display the evening details based on the globalEvening context
      setEveningDetails({
        ...globalEvening, // You can customize this based on what data is stored in globalEvening
        teachers: globalEveningTeachers,
      });
    }
  }, [globalEvening, globalEveningTeachers]);

  const handleGenerateSlots = async (event: any) => {
    event.preventDefault();

    if (
      globalEvening &&
      globalEvening !== "all" &&
      globalEveningTeachers.length > 0
    ) {
      const start_time = GetTime(eveningDetails?.start_time);
      const end_time = GetTime(eveningDetails?.end_time);
      const interval = eveningDetails?.time_per_meeting;
      const teacher_list = getStaffIds(globalEveningTeachers);
      const evening_id = globalEvening;

      const genData = {
        start_time,
        end_time,
        interval,
        teacher_list,
        evening_id,
      };

      try {
        // Fetch evening data by ID from the API
        const response = await fetch(`api/generates/gen_slots`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(genData),
        });
        const data = await response.json();

        setSlotList(data.ap_slot);
        setSlotkey(data.slots);
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  console.log(slotList);
  console.log(slotkey);
  console.log(globalEveningTeachers);

  if (!globalEvening || globalEvening === "all") {
    return <div>Please select an evening to generate slots.</div>;
  }

  if (!globalEveningTeachers || globalEveningTeachers.length === 0) {
    return <div>No teachers available for this evening.</div>;
  }

  if (slotList.length > 0) {
    return (
      <div className=" p-6 bg-white rounded-lg shadow-lg min-[50vh] max-h-[80vh] flex flex-col justify-between ">
        <div className=" overflow-y-scroll  scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200 items-center justify-center justify-items-center min-w-full min-h-full  ">
          <AppointmentDashboard
            timeslots={slotkey}
            eve_teachers={globalEveningTeachers}
            eve_appointments={slotList}
          />
        </div>
        {/* Action buttons */}
        <div className="flex items-center flex-row-reverse justify-between">
          <button
            // type="submit"
            onClick={(e) => e}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Schedule
          </button>
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
  }

  return (
    <form className="p-6 bg-white rounded-lg shadow-lg h-[100%] min-h-[500px] flex flex-col justify-between ">
      <div className=" overflow-y-scroll  scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200 flex items-center justify-center justify-items-center min-w-full min-h-full ">
        {/* Display evening details */}
        <div className=" m-auto  h-full w-full ">
          <h3 className="font-bold text-lg mb-[20px] ">Evening Details</h3>
          <p>
            <strong>Year Group:</strong> {eveningDetails?.yeargroup}
          </p>
          <p>
            <strong>Term:</strong> {eveningDetails?.term}
          </p>

          {eveningDetails?.schedule_for && (
            <p>
              <strong>Schedule For:</strong> {eveningDetails?.schedule_for}
            </p>
          )}
          <p>
            <strong>Date:</strong> {GetDate(eveningDetails?.date)}
          </p>
          <p>
            <strong>Start Time:</strong> {GetTime(eveningDetails?.start_time)}
          </p>
          <p>
            <strong>End Time:</strong> {GetTime(eveningDetails?.end_time)}
          </p>
          <p>
            <strong>Planned_by:</strong> {eveningDetails?.Teacher?.first_name}
          </p>
          <p>
            <strong>duration Per Meeting:</strong>{" "}
            {eveningDetails?.time_per_meeting} Minutes
          </p>
          <p>
            <strong>Meeting Stage</strong>{" "}
            {GetEveningStatus(eveningDetails?.status)}
          </p>
        </div>

        {/* Display selected teachers */}
        <div className=" m-auto mb-4 h-full w-full">
          <h3 className="font-bold text-lg">Selected Teachers</h3>
          <ul className="max-h-[100%] overflow-y-auto border rounded-lg p-2">
            {globalEveningTeachers.length > 0 ? (
              globalEveningTeachers.map((teacher: Teacher) => (
                <li
                  key={teacher.staff_id}
                  className="flex justify-between items-center bg-white px-2 py-1 mb-1"
                >
                  <span>{`${teacher.first_name} ${teacher.last_name}`}</span>
                  <span>{` -- ${teacher.subject}`}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">
                No teachers found for this evening.
              </p>
            )}
          </ul>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center flex-row-reverse justify-between">
        <button
          // type="submit"
          onClick={(e) => handleGenerateSlots(e)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate
        </button>
        <button
          type="button"
          onClick={LonClose}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default GenerateSlots;
