import React, { useState } from "react";

interface Menuprops {
  //   isOpen: boolean;
  onClose: () => void;
}

const CreateEvening: React.FC<Menuprops> = ({ onClose }) => {
  const [yearGroup, setYearGroup] = useState("");
  const [date, setDate] = useState("");
  const [term, setTerm] = useState("");
  const [scheduleFor, setScheduleFor] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [plannedBy, setPlannedBy] = useState("");
  const [timePerMeeting, setTimePerMeeting] = useState<number>(5); // Default 5 minutes

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const eveningData = {
      yearGroup: parseInt(yearGroup),
      date: new Date(date),
      term,
      scheduleFor,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      plannedBy: parseInt(plannedBy),
      timePerMeeting: timePerMeeting,
    };

    // Submit these details to your backend API
    try {
      const response = await fetch("/api/create-evening", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eveningData),
      });
      const responseData = await response.json();
      console.log("Server Response:", responseData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form className="p-6 bg-white rounded shadow-lg">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="yearGroup"
        >
          Year Group
        </label>
        <input
          id="yearGroup"
          type="number"
          placeholder="Enter year group"
          onChange={(e) => setYearGroup(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="date"
          >
          Date
        </label>
        <input
          id="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="term"
        >
          Term
        </label>
        <select
          id="term"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setTerm(e.target.value)}
          >
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="startTime"
          >
          Start Time
        </label>
        <input
          id="startTime"
          type="datetime-local"
          onChange={(e) => setStartTime(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="endTime"
          >
          End Time
        </label>
        <input
          id="endTime"
          type="datetime-local"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setEndTime(e.target.value)}
          />
      </div>
      <input type="hidden" name="planner" value={1} />
      {/* <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="plannedBy"
        >
          Planned By (Staff ID)
        </label>
        <input
          id="plannedBy"
          type="number"
          placeholder="Enter staff ID"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div> */}
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
