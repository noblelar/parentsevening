import { useGlobalContext } from "@/context/GlobalContext";
import { GetDate, GetTime } from "@/utils/auxiliary";
import { Evening, Teacher } from "@/utils/data_interface";
import React, { useEffect, useState } from "react";

interface Menuprops {
  LonClose: () => void;
}

const GenerateSlots: React.FC<Menuprops> = ({ LonClose }) => {
  const { globalEvening, globalEveningTeachers } = useGlobalContext();

  // State to store the evening details
  const [eveningDetails, setEveningDetails] = useState<Evening>();

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
          console.log(data.evening);
          setEveningDetails(data.evening);
          //  setIsLoading(false);
        } catch (err: any) {
          console.log(err);
        }
      } else {
        //   setIsLoading(false);
      }
    };

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

  const handleGenerateSlots = () => {};

  if (!globalEvening || globalEvening === "all") {
    return <div>Please select an evening to generate slots.</div>;
  }

  if (!globalEveningTeachers || globalEveningTeachers.length === 0) {
    return <div>No teachers available for this evening.</div>;
  }

  return (
    <form
      className="p-6 bg-white rounded-lg shadow-lg h-[100%] min-h-[500px] flex flex-col justify-between"
      onSubmit={handleGenerateSlots}
    >
      <div className=" overflow-scroll flex items-center justify-center justify-items-center ">
        {/* Display evening details */}
        <div className=" m-auto  h-[100%]  ">
          <h3 className="font-bold text-lg mb-[20px] ">Evening Details</h3>
          <p>
            <strong>Year Group:</strong> {eveningDetails?.yeargroup}
          </p>
          <p>
            <strong>Term:</strong> {eveningDetails?.term}
          </p>
          <p>
            <strong>Schedule For:</strong> {eveningDetails?.schedule_for}
          </p>
          <p>
            <strong>Date:</strong> {GetDate(eveningDetails?.date)}
          </p>
          <p>
            <strong>Start Time:</strong> {GetTime(eveningDetails?.start_time)}
          </p>
          <p>
            <strong>End Time:</strong> {GetTime(eveningDetails?.end_time)}
          </p>
        </div>

        {/* Display selected teachers */}
        <div className=" m-auto mb-4">
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
          type="submit"
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
