import { Teacher } from "@/utils/data_interface";
import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

type SortConfig = {
  key: keyof Teacher;
  direction: "ascending" | "descending";
};

interface TeacherTableProps {
  teachers: Teacher[];
}

const TeacherTable: React.FC<TeacherTableProps> = ({ teachers }) => {
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    search: "",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Search input handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  // Sorting handler
  const handleSort = (key: keyof Teacher) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sorting logic
  const sortedTeachers = React.useMemo(() => {
    let sortableTeachers = [...teachers];
    if (sortConfig !== null) {
      sortableTeachers.sort((a, b) => {
        const aValue = a[sortConfig.key] || ""; // Fallback to empty string if undefined
        const bValue = b[sortConfig.key] || ""; // Fallback to empty string if undefined

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        }
        return 0;
      });
    }
    return sortableTeachers;
  }, [teachers, sortConfig]);

  // Filtering logic for search
  const filteredTeachers = sortedTeachers.filter((teacher) => {
    const searchValue = filters.search.toLowerCase();
    // Only search in relevant string fields: first_name, last_name, email, subject, and contact_info
    return (
      (teacher.first_name?.toLowerCase() || "").includes(searchValue) ||
      (teacher.last_name?.toLowerCase() || "").includes(searchValue) ||
      (teacher.email?.toLowerCase() || "").includes(searchValue) ||
      (teacher.subject?.toLowerCase() || "").includes(searchValue) ||
      (teacher.availability?.toLowerCase() || "").includes(searchValue) ||
      (teacher.contact_info?.toLowerCase() || "").includes(searchValue)
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
              {[
                "first_name",
                "last_name",
                "email",
                "subject",
                "contact_info",
                "availability",
              ].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-b cursor-pointer"
                  onClick={() => handleSort(key as keyof Teacher)}
                >
                  <div className="flex items-center justify-between">
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace("_", " ")}
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
            {filteredTeachers.map((teacher, index) => {
              const id = teacher.staff_id;
              const firstname = teacher.first_name;
              const lastname = teacher.last_name;
              const email = teacher.email;
              const subject = teacher.subject;
              const contact = teacher.contact_info;
              const availability = teacher.availability;
              return (
                <tr
                  key={id}
                  className={`${
                    selectedTeacher === id
                      ? "bg-blue-100"
                      : index % 2 === 0
                      ? "bg-gray-100"
                      : "bg-white"
                  } hover:bg-gray-200 cursor-pointer`}
                  onClick={() => setSelectedTeacher(id)}
                >
                  <td className="px-4 py-2 border-b">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 border-b">{firstname}</td>
                  <td className="px-4 py-2 border-b">{lastname}</td>
                  <td className="px-4 py-2 border-b">{email}</td>
                  <td className="px-4 py-2 border-b">{subject}</td>
                  <td className="px-4 py-2 border-b">{contact}</td>
                  <td className="px-4 py-2 border-b">{availability}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherTable;
