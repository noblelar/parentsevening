import { Parent } from "@/utils/data_interface";
import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

type SortConfig = {
  key: keyof Parent;
  direction: "ascending" | "descending";
};

interface ParentTableProps {
  parents: Parent[];
}

const ParentTable: React.FC<ParentTableProps> = ({ parents }) => {
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    search: "",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  // Handle sorting by column key
  const handleSort = (key: keyof Parent) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort logic based on current sortConfig
  const sortedParents = React.useMemo(() => {
    let sortableParents = [...parents];
    if (sortConfig !== null) {
      sortableParents.sort((a, b) => {
        const aValue = a[sortConfig.key] || ""; // Handle undefined values by falling back to empty string
        const bValue = b[sortConfig.key] || "";

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }
    return sortableParents;
  }, [parents, sortConfig]);

  // Search filtering logic
  const filteredParents = sortedParents.filter((parent) => {
    const searchValue = filters.search.toLowerCase();

    return (
      (parent.first_name?.toLowerCase() || "").includes(searchValue) ||
      (parent.last_name?.toLowerCase() || "").includes(searchValue) ||
      (parent.email?.toLowerCase() || "").includes(searchValue) ||
      (parent.contact_info?.toLowerCase() || "").includes(searchValue) // Handle undefined contact_info
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
                // "parent_id",
                "first_name",
                "last_name",
                "email",
                "contact_info",
              ].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-b cursor-pointer"
                  onClick={() => handleSort(key as keyof Parent)}
                >
                  <div className="flex items-center justify-between">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
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
            {filteredParents.map((parent, index) => {
              const id = parent.parent_id;
              const firstName = parent.first_name;
              const lastName = parent.last_name;
              const email = parent.email;
              const contact = parent.contact_info;

              return (
                <tr
                  key={id}
                  className={`${
                    selectedParent === id
                      ? "bg-blue-100"
                      : index % 2 === 0
                      ? "bg-gray-100"
                      : "bg-white"
                  } hover:bg-gray-200 cursor-pointer`}
                  onClick={() => setSelectedParent(id)}
                >
                  <td className="px-4 py-2 border-b">
                    <input type="checkbox" />
                  </td>
                  {/* <td className="px-4 py-2 border-b">{id}</td> */}
                  <td className="px-4 py-2 border-b">{firstName}</td>
                  <td className="px-4 py-2 border-b">{lastName}</td>
                  <td className="px-4 py-2 border-b">{email}</td>
                  <td className="px-4 py-2 border-b">{contact ?? "N/A"}</td> {/* Handle null contact_info */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParentTable;
