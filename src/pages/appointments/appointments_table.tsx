import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi"; // For feedback icon
import { GetDate } from "@/utils/auxiliary"; // Assuming you have this utility
import { Appointment } from "@/utils/data_interface";

type SortConfig = {
  key: keyof Appointment;
  direction: "ascending" | "descending";
};

interface AppointmentTableProps {
  appointments: Appointment[];
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(
    null
  );
  const [filters, setFilters] = useState({
    search: "",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleSort = (key: keyof Appointment) => {
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

  const sortedAppointments = React.useMemo(() => {
    let sortableAppointments = [...appointments];

    if (sortConfig !== null) {
      sortableAppointments.sort((a, b) => {
        const key = sortConfig.key;
        const aValue = a[key] || "";
        const bValue = b[key] || "";

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

    return sortableAppointments;
  }, [appointments, sortConfig]);

  const filteredAppointments = sortedAppointments.filter((appointment) => {
    const searchValue = filters.search.toLowerCase();
    const venue = appointment.venue ? appointment.venue : "";
    return (
      (appointment.Teacher?.first_name.toLowerCase() || "").includes(
        searchValue
      ) ||
      (appointment.Parent?.first_name.toLowerCase() || "").includes(
        searchValue
      ) ||
      (appointment.Student?.first_name.toLowerCase() || "").includes(
        searchValue
      ) ||
      (venue.toLowerCase() || "").includes(searchValue) ||
      (GetDate(appointment.Evening.date)?.toLowerCase() || "").includes(
        searchValue
      )
    );
  });

  const showFeedback = (feedback: any) => {
    alert(
      feedback
        .map(
          (item: any) => `Rating: ${item.rating}\nComment: ${item.comments}\n`
        )
        .join("\n")
    );
  };

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
                "evening",
                "teacher",
                "parent",
                "student",
                "venue",
                "feedback",
              ].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-b cursor-pointer"
                  onClick={() => handleSort(key as keyof Appointment)}
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
            {filteredAppointments.map((appointment, index) => {
              const teacherName = `${appointment.Teacher?.first_name} ${appointment.Teacher?.last_name}`;
              const parentName = `${appointment.Parent?.first_name} ${appointment.Parent?.last_name}`;
              const studentName = `${appointment.Student?.first_name} ${appointment.Student?.last_name}`;
              const eveningDetails = `Year_${
                appointment.Evening.yeargroup || "N/A"
              }_${appointment.Evening.term}_${GetDate(
                appointment.Evening.date
              )}`;

              return (
                <tr
                  key={appointment.appointment_id}
                  className={`${
                    selectedAppointment === appointment.appointment_id
                      ? "bg-blue-100"
                      : index % 2 === 0
                      ? "bg-gray-100"
                      : "bg-white"
                  } hover:bg-gray-200 cursor-pointer`}
                  onClick={() =>
                    setSelectedAppointment(appointment.appointment_id)
                  }
                >
                  <td className="px-4 py-2 border-b">
                    <input type="checkbox" value={appointment.appointment_id} />
                  </td>
                  <td className="px-4 py-2 border-b">{eveningDetails}</td>
                  <td className="px-4 py-2 border-b">{teacherName}</td>
                  <td className="px-4 py-2 border-b">{appointment.Parent ? parentName: "Not Booked"}</td>
                  <td className="px-4 py-2 border-b">{ appointment.Parent? studentName : "Not Booked"}</td>
                  <td className="px-4 py-2 border-b">
                    {appointment.venue || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {appointment.Feedback.length > 0 ? (
                      <FiMessageSquare
                        className="cursor-pointer"
                        size={20}
                        onClick={() => showFeedback(appointment.Feedback)}
                      />
                    ) : (
                      "No Feedback"
                    )}
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

export default AppointmentTable;
