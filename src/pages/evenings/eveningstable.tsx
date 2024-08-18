import { Evening } from "@/utils/data_interface";
import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { GetDate, GetEveningStatus, GetTime } from "@/utils/auxiliary";

type SortConfig = {
  key: keyof Evening;
  direction: "ascending" | "descending";
};

interface EveningTableProps {
  evenings: Evening[];
}

const EveningTable: React.FC<EveningTableProps> = ({ evenings }) => {
  const [selectedEvening, setSelectedEvening] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    search: "",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Search input handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  // Sorting handler
  const handleSort = (key: keyof Evening) => {
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
  const sortedEvenings = React.useMemo(() => {
    let sortableEvenings = [...evenings];

    // Check if sortConfig exists and has key and direction properties
    if (sortConfig !== null) {
      sortableEvenings.sort((a, b) => {
        const key = sortConfig.key;
        const aValue = a[key] || ""; // Fallback to empty string if undefined
        const bValue = b[key] || ""; // Fallback to empty string if undefined

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

    return sortableEvenings;
  }, [evenings, sortConfig]);

  // Filtering logic for search
  const filteredEvenings = sortedEvenings.filter((evening) => {
    const searchValue = filters.search.toLowerCase();
    // Filter by fields that are strings or numbers
    return (
      (evening.yeargroup?.toString() || "").includes(searchValue) ||
      (evening.term?.toLowerCase() || "").includes(searchValue) ||
      (GetDate(evening.date)?.toLocaleLowerCase() || "").includes(searchValue) ||
      (evening.schedule_for?.toLowerCase() || "").includes(searchValue) ||
      (evening.status?.toLowerCase() || "").includes(searchValue) ||
      (evening.Teacher?.first_name.toLowerCase() || "").includes(searchValue) ||
      (evening.Teacher?.last_name.toLowerCase() || "").includes(searchValue) ||
      (GetTime(evening.start_time)?.toLocaleLowerCase() || "").includes(searchValue) ||
      (GetTime(evening.start_time)?.toLocaleLowerCase() || "").includes(searchValue) 

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
                "yeargroup",
                "date",
                "term",
                "schedule_for",
                "start_time",
                "end_time",
                "planned_by",
                "status",
              ].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-b cursor-pointer"
                  onClick={() => handleSort(key as keyof Evening)}
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
            {filteredEvenings.map((evening, index) => {
              const plannedBy = evening.Teacher?.first_name;

              return (
                <tr
                  key={evening.evening_id}
                  className={`${
                    selectedEvening === evening.evening_id
                      ? "bg-blue-100"
                      : index % 2 === 0
                      ? "bg-gray-100"
                      : "bg-white"
                  } hover:bg-gray-200 cursor-pointer`}
                  onClick={() => setSelectedEvening(evening.evening_id)}
                >
                  <td className="px-4 py-2 border-b">
                    <input type="checkbox" value={evening.evening_id} />
                  </td>
                  <td className="px-4 py-2 border-b">
                    {evening.yeargroup ?? "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {GetDate(evening.date)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {evening.term || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {evening.schedule_for || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {evening.start_time ? GetTime(evening.start_time) : "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {evening.end_time ? GetTime(evening.end_time) : "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">{plannedBy || "N/A"}</td>
                  <td className="px-4 py-2 border-b">
                    {GetEveningStatus(evening.status)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EveningTable;
