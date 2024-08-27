import { useGlobalContext } from "@/context/GlobalContext";
import { Teacher } from "@/utils/data_interface";
import { evenings } from "@/utils/datasamples";
import React, { useEffect, useState } from "react";

// interface Teacher {
//   staff_id: number;
//   first_name: string;
//   last_name: string;
// }

const getTeacherIds = (teachers: Teacher[]) => {
  let teacherIds: number[] = [];
  teachers.map((teacher, ti) => {
    teacherIds.push(teacher.staff_id);
  });
  return teacherIds;
};

interface MultiSelectTeacherProps {
  //   teachers: Teacher[]; // List of available teachers
  onClose: () => void;
}

const MultiSelectTeacher: React.FC<MultiSelectTeacherProps> = ({ onClose }) => {
  const [selectedTeachers, setSelectedTeachers] = useState<Teacher[]>([]);
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teachers, setTeacher] = useState<Teacher[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState<Boolean>(false);

  const { globalTeachers, globalEvening } = useGlobalContext();
  useEffect(() => {
    setTeacher(globalTeachers);
  }, [globalTeachers]);

  console.log(selectedTeachers);

  // Function to add a teacher to the selected list
  const handleSelectTeacher = (teacher: Teacher) => {
    if (selectedTeachers.length < 12 && !selectedTeachers.includes(teacher)) {
      setSelectedTeachers([...selectedTeachers, teacher]);
    }
  };

  // Function to remove a selected teacher
  const handleRemoveTeacher = (teacher: Teacher) => {
    setSelectedTeachers(
      selectedTeachers.filter((t) => t.staff_id !== teacher.staff_id)
    );
  };

  // Filter the list of teachers based on the search input
  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.first_name} ${teacher.last_name}`
      .toLowerCase()
      .includes(teacherSearch.toLowerCase())
  );

  const handleAddTeachers = async (event: any) => {
    event.preventDefault();
    const teachers_evening = {
      evening: globalEvening,
      teachers: getTeacherIds(selectedTeachers),
    };

    try {
      const response = await fetch("/api/create/teacher/teacher_evening", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teachers_evening),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Close modal 1.5 seconds after successful submission
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);

      // Cleanup the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, onClose]);

  if (submitSuccess) {
    return <div>Teachers Added Successfully!</div>;
  }

  return (
    <form onSubmit={handleAddTeachers}>
      <div className="p-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-scroll ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Search Teacher
          </label>
          <input
            type="text"
            placeholder="Search by teacher name..."
            value={teacherSearch}
            onChange={(e) => setTeacherSearch(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {selectedTeachers.length < 12 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Available Teachers
            </label>
            <ul className="max-h-40 overflow-y-auto border rounded-lg p-2">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => {
                  let subject = teacher.subject;
                  return (
                    <li
                      key={teacher.staff_id}
                      className="flex justify-between items-center bg-white px-2 py-1 mb-1 cursor-pointer hover:bg-blue-100"
                      onClick={() => handleSelectTeacher(teacher)}
                    >
                      {`${teacher.first_name} ${teacher.last_name} -- ${subject} `}
                    </li>
                  );
                })
              ) : (
                <p className="text-gray-500">No teachers found.</p>
              )}
            </ul>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Selected Teachers ({selectedTeachers.length}/12)
          </label>
          <div className="flex flex-wrap space-x-2">
            {selectedTeachers.map((teacher) => (
              <div
                key={teacher.staff_id}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 mb-2"
              >
                <span>{`${teacher.first_name} ${teacher.last_name}-- ${teacher.subject} `}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveTeacher(teacher)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedTeachers.length >= 12 && (
          <p className="text-red-500">You can only select up to 12 teachers.</p>
        )}

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
      </div>
    </form>
  );
};

export default MultiSelectTeacher;
