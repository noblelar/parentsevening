import { useGlobalContext } from "@/context/GlobalContext";
import React, { SetStateAction, useState } from "react";

interface StudentFormProps {
  LonClose: () => void;
  setShowTime: React.Dispatch<SetStateAction<boolean>>,
  setStudentId: React.Dispatch<SetStateAction<number | null>>
  myId: number
}

const CreateStudent: React.FC<StudentFormProps> = ({ LonClose, setShowTime,setStudentId, myId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [yearGroup, setYearGroup] = useState<number | "">("");

  const {} = useGlobalContext;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const student = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      year_group: yearGroup,
      myId: myId
    };

    try {
      const response = await fetch("/api/fetch/student/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        const studentData = await response.json();
        // After successful submission, fetch updated student 
        setShowTime(true)
        console.log(studentData.student.student_id)
        setStudentId(studentData.student.student_id)
      }else{
        alert("Student not Found")
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form className="p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dateOfBirth"
        >
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

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
          value={yearGroup}
          onChange={(e) => setYearGroup(e.target.value ? parseInt(e.target.value) : "")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="flex flex-row-reverse items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
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

export default CreateStudent;
