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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

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

  const sortedTeachers = React.useMemo(() => {
    let sortableTeachers = [...teachers];
    if (sortConfig !== null) {
      sortableTeachers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTeachers;
  }, [teachers, sortConfig]);

  const filteredTeachers = sortedTeachers.filter((teacher) => {
    return (
      filters.search === "" ||
      Object.values(teacher).some((value) =>
        value.toString().toLowerCase().includes(filters.search.toLowerCase())
      )
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
                "firstname",
                "lastname",
                "email",
                "subject",
                "breaktime",
                "contact",
              ].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-b cursor-pointer"
                  onClick={() => handleSort(key as keyof Teacher)}
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
            {filteredTeachers.map((teacher, index) => (
              <tr
                key={teacher.id}
                className={`${
                  selectedTeacher === teacher.id
                    ? "bg-blue-100"
                    : index % 2 === 0
                    ? "bg-gray-100"
                    : "bg-white"
                } hover:bg-gray-200 cursor-pointer`}
                onClick={() => setSelectedTeacher(teacher.id)}
              >
                <td className="px-4 py-2 border-b">
                  <input type="checkbox" />
                </td>
                {/* <td className="px-4 py-2 border-b">{teacher.id}</td> */}
                <td className="px-4 py-2 border-b">{teacher.firstname}</td>
                <td className="px-4 py-2 border-b">{teacher.lastname}</td>
                <td className="px-4 py-2 border-b">{teacher.email}</td>
                <td className="px-4 py-2 border-b">{teacher.subject}</td>
                <td className="px-4 py-2 border-b">{teacher.breaktime}</td>
                <td className="px-4 py-2 border-b">{teacher.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherTable;
