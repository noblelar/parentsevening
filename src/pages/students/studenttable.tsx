import { MakeDate } from "@/utils/auxiliary";
import { Student } from "@/utils/data_interface";
import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

type SortConfig = {
  key: keyof Student;
  direction: "ascending" | "descending";
};

interface StudentTableProps {
  students: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    search: "",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  // Handle sorting by column key
  const handleSort = (key: keyof Student) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort logic based on current sortConfig
  const sortedStudents = React.useMemo(() => {
    let sortableStudents = [...students];
    if (sortConfig !== null) {
      sortableStudents.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Handle sorting for strings, numbers, and dates
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          return sortConfig.direction === "ascending"
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }
        return 0;
      });
    }
    return sortableStudents;
  }, [students, sortConfig]);

  // Search filtering logic
  const filteredStudents = sortedStudents.filter((student) => {
    const searchValue = filters.search.toLowerCase();

    return (
      student.first_name?.toLowerCase().includes(searchValue) ||
      student.last_name?.toLowerCase().includes(searchValue) ||
      student.email?.toLowerCase().includes(searchValue) ||
      student.year_group.toString().includes(searchValue) ||
      MakeDate(student.date_of_birth)?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b"></th>
              {["first_name", "last_name", "email", "year_group", "date_of_birth"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-b cursor-pointer"
                  onClick={() => handleSort(key as keyof Student)}
                >
                  <div className="flex items-center justify-between">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig && sortConfig.key === key ? (
                      sortConfig.direction === "ascending" ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => {
              const id = student.student_id;
              const firstname = student.first_name;
              const lastname = student.last_name;
              const email = student.email;
              const dateofbirth = MakeDate(student.date_of_birth);
              const yeargroup = student.year_group;
              return (
                <tr
                  key={id}
                  className={`${
                    selectedStudent === id
                      ? "bg-blue-100"
                      : index % 2 === 0
                      ? "bg-gray-100"
                      : "bg-white"
                  } hover:bg-gray-200 cursor-pointer`}
                  onClick={() => setSelectedStudent(id)}
                >
                  <td className="px-4 py-2 border-b">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 border-b">{firstname}</td>
                  <td className="px-4 py-2 border-b">{lastname}</td>
                  <td className="px-4 py-2 border-b">{email}</td>
                  <td className="px-4 py-2 border-b">{yeargroup}</td>
                  <td className="px-4 py-2 border-b">{dateofbirth}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
