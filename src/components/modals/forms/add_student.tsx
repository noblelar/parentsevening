import React, { useState } from "react";
import * as XLSX from "xlsx"; // To handle Excel files

interface Menuprops {
  onClose: () => void;
}

const CreateStudent: React.FC<Menuprops> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("single"); // Tabs for switching forms
  const [submitSuccess, setSubmitSuccess] = useState<Boolean>(false);

  // Single Student Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Bulk Student Upload
  const [bulkFile, setBulkFile] = useState<File | null>(null);

  // Handling Single Student Form Submission
  const handleSingleSubmit = async (event: any) => {
    event.preventDefault();
    const studentData = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
    };

    console.log(studentData);

    try {
      const response = await fetch("/api/create/student/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handling Bulk Student File Upload
  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBulkFile(file);
    }
  };

  const handleBulkSubmit = async (event: any) => {
    event.preventDefault();
    if (!bulkFile) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      try {
        const response = await fetch("/api/create/student/bulk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });

        if (response.ok) {
          setSubmitSuccess(true);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
    reader.readAsArrayBuffer(bulkFile);
  };

  // Tab content
  const renderFormContent = () => {
    if (submitSuccess) {
      return <div>Students Added Successfully!</div>;
    }

    if (activeTab === "single") {
      return (
        <form
          className="p-6 bg-white rounded-lg shadow-lg"
          onSubmit={handleSingleSubmit}
        >
          <div className="flex space-x-2 ">
            <div className="mb-4 max-w-[48%] ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                <span className="text-red-500">*</span> First Name
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

            <div className="mb-4 max-w-[48%]">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                <span className="text-red-500">*</span> Last Name
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
          </div>

          <div className="mb-4 w-full ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateOfBirth"
            >
              <span className="text-red-500">*</span> Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              placeholder="Enter date of birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

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
        </form>
      );
    }

    return (
      <form
        className="p-6 bg-white rounded-lg shadow-lg"
        onSubmit={handleBulkSubmit}
      >
        <div className="flex flex-col min-h-[300px] justify-between ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fileUpload"
            >
              <span className="text-red-500">*</span> Upload CSV or Excel File
            </label>
            <input
              id="fileUpload"
              type="file"
              accept=".csv, .xlsx, .xls"
              onChange={handleBulkUpload}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Upload
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

  return (
    <div>
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab("single")}
          className={`w-1/2 py-2 text-center font-bold ${
            activeTab === "single"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Add Single Student
        </button>
        <button
          onClick={() => setActiveTab("bulk")}
          className={`w-1/2 py-2 text-center font-bold ${
            activeTab === "bulk"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Add Multiple Students
        </button>
      </div>
      {renderFormContent()}
    </div>
  );
};

export default CreateStudent;
