import { TimeSlot } from "@/utils/data_interface";
import React, { useState } from "react";

interface SelectMenuprops {
   starting_times: TimeSlot[];
   setSelected: ((a:string)=> void);
 }

const SlidingSelect: React.FC<SelectMenuprops> = ({starting_times, setSelected}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setSelected(e.target.value)
    setIsOpen(false); // Close the select when an option is chosen
  };

  return (
    <div className="relative flex ">
      {/* The Button */}
      <button
        onClick={toggleSelect}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {selectedOption ? `Selected: ${selectedOption}` : "Choose an Option"}
      </button>

      {/* Sliding Select */}
      <div
        className={`absolute left-0 top-full mt-2 transform transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        }`}
      >
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="block w-full bg-white border border-gray-300 rounded-md shadow-md py-2 px-4 focus:outline-none"
        >
          <option value="" disabled>
            Select Preferred Time
          </option>
          {starting_times.map((starting_time: TimeSlot) => {
            return(
               <option key={starting_time.slotid} value={starting_time.starting_time}>{starting_time.starting_time}</option>

            )
          })}
        </select>
      </div>
    </div>
  );
};

export default SlidingSelect;
