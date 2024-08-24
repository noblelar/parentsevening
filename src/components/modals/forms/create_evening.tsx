import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface Menuprops {
  onClose: () => void;
}

const CreateEvening: React.FC<Menuprops> = ({ onClose }) => {
  const { globalValue, setGlobalEvening } = useGlobalContext();
  const [submitSuccess, setSubmitSuccess] = useState<Boolean>(false);
  const [eve_recieved, setEveningRecieved] = useState<number | null>(null);

  const [yearGroup, setYearGroup] = useState("");
  const [date, setDate] = useState("");
  const [term, setTerm] = useState("");
  const [scheduleFor, setScheduleFor] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timePerMeeting, setTimePerMeeting] = useState<number>(5); // Default 5 minutes

  const [plannedBy] = useState(globalValue); // Unset state not needed for plannedBy

  console.log(plannedBy);

  // Handling submit
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const eveningData = {
      yearGroup: parseInt(yearGroup),
      date: new Date(date),
      term,
      scheduleFor,
      startTime: new Date(`${date}T${startTime}`),
      endTime: new Date(`${date}T${endTime}`),
      plannedBy: parseInt(plannedBy),
      timePerMeeting,
    };

    // Submit these details to your backend API
    try {
      const response = await fetch("/api/create/evening/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eveningData),
      });

      const responseData = await response.json();
      console.log("Server Response:", responseData);

      if (response.ok) {
        setEveningRecieved(responseData.evening.evening_id);
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const setEve = () => {
    setGlobalEvening(eve_recieved);
  };

  if (submitSuccess) {
    return (
      <div className="flex justify-between">
        <div>Evening Created Successfully</div>

        <Link
          href={"/teachers"}
          onClick={setEve}
          className="flex space-x-2 text-primary_light font-bold cursor-pointer rounded-md bg-white border-2 p-2 border-green-700"
        >
          <FaPlus size={24} /> <span> Add Teachers </span>
        </Link>
      </div>
    );
  }

  return (
    <form className="p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="yearGroup"
        >
          <span className="text-red-500">*</span> Year Group
        </label>
        <input
          id="yearGroup"
          type="number"
          placeholder="Enter year group"
          value={yearGroup}
          onChange={(e) => setYearGroup(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="flex space-x-8">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            <span className="text-red-500">*</span> Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="term"
          >
            <span className="text-red-500">*</span> Term
          </label>
          <select
            id="term"
            value={term}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setTerm(e.target.value)}
            required
          >
            <option value="">Select Term</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="scheduleFor"
        >
          Schedule For
        </label>
        <input
          id="scheduleFor"
          type="text"
          placeholder="Enter what the evening is scheduled for"
          value={scheduleFor}
          onChange={(e) => setScheduleFor(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex space-x-8">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startTime"
          >
            <span className="text-red-500">*</span> Start Time
          </label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endTime"
          >
            <span className="text-red-500">*</span> End Time
          </label>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="timePerMeeting"
        >
          Time Per Meeting (in minutes)
        </label>
        <input
          id="timePerMeeting"
          type="number"
          placeholder="Enter time per meeting"
          value={timePerMeeting}
          onChange={(e) => setTimePerMeeting(parseInt(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="1"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateEvening;
