import React, { useState } from "react";
import * as XLSX from "xlsx"; // To handle Excel files

interface Menuprops {
  onClose: () => void;
}

const CreateTeacher: React.FC<Menuprops> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("single"); // Tabs for switching forms
  const [submitSuccess, setSubmitSuccess] = useState<Boolean>(false);

  // Single Teacher Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [availability, setAvailability] = useState("");
  const [subject, setSubject] = useState("");

  // Bulk Teacher Upload
  const [bulkFile, setBulkFile] = useState<File | null>(null);

  // Handling Single Teacher Form Submission
  const handleSingleSubmit = async (event: any) => {
    event.preventDefault();
    const teacherData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      contact_info: contactInfo,
      availability: availability,
      subject : subject,
    };

    console.log(teacherData)
    
    try {
      const response = await fetch("/api/create/teacher/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handling Bulk Teacher File Upload
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
        const response = await fetch("/api/create/teacher/bulk", {
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
      return <div>Teachers Added Successfully!</div>;
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
              htmlFor="email"
            >
              <span className="text-red-500">*</span> Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contactInfo"
            >
              <span className="text-red-500">*</span> Contact Information
            </label>
            <input
              id="contactInfo"
              type="text"
              placeholder="Enter contact information"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex space-x-2 ">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="availability"
              >
                <span className="text-red-500"> </span> Availability
              </label>
              <input
                id="availability"
                type="text"
                placeholder="Enter availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subject"
              >
                <span className="text-red-500">*</span> Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
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
          Add Single Teacher
        </button>
        <button
          onClick={() => setActiveTab("bulk")}
          className={`w-1/2 py-2 text-center font-bold ${
            activeTab === "bulk"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Add Multiple Teachers
        </button>
      </div>
      {renderFormContent()}
    </div>
  );
};

export default CreateTeacher;
