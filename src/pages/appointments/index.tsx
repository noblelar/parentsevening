import Modal from "@/components/modals/modal";
import DashboardNav from "@/components/ui/dashboardnav";
import React, { useState } from "react";
import TeachersBlock from "./teachersblock";
import AppointmentDashboard from "./app_dash";

const Appointments = () => {
 
  return (
    <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
      <DashboardNav />
      {/* <Button onClick={openModal} text="Open Appointment Form" /> */}
      <AppointmentDashboard/>
      {/* <TeachersBlock/> */}
    </div>
  );
};

export default Appointments;
