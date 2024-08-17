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

  console.log(evenings)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

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


  const sortedEvenings = React.useMemo(() => {
    let sortableEvenings = [...evenings];

    // Check if sortConfig exists and has key and direction properties
    if (sortConfig !== null) {
      sortableEvenings.sort((a, b) => {
        const key = sortConfig.key;

        // Handle the case where the key exists in a and b objects
        const aValue = a[key] ? a[key] : "A";
        const bValue = b[key] ? b[key] : "A";

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableEvenings;
  }, [evenings, sortConfig]);

  const filteredEvenings = sortedEvenings.filter((evening) => {
    return (
      filters.search === "" ||
      Object.values(evening).some((value) =>
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
                // "evening_id",
                "yeargroup",
                "date",
                "term",
                "schedule_for",
                "start_time",
                "end_time",
                "plannedBy",
                "status",
              ].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-b cursor-pointer"
                  onClick={() => handleSort(key as keyof Evening)}
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
                  {/* <td className="px-4 py-2 border-b">{evening.evening_id}</td> */}
                  <td className="px-4 py-2 border-b">
                    {evening.yeargroup ?? evening.yeargroup}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {GetDate(evening.date)}
                  </td>
                  <td className="px-4 py-2 border-b">{evening.term}</td>
                  <td className="px-4 py-2 border-b">{evening.schedule_for}</td>
                  <td className="px-4 py-2 border-b">
                    {evening.date ? GetTime(evening.start_time) : null}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {GetTime(evening.end_time)}
                  </td>
                  <td className="px-4 py-2 border-b">{plannedBy}</td>
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
