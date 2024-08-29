import Modal from "@/components/modals/modal";
import DashboardNav from "@/components/ui/dashboardnav";
import React, { useEffect, useState } from "react";
import TeachersBlock from "./teachersblock";
import AppointmentDashboard from "./app_dash";
import { GetServerSideProps } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";
import Layout from "../layout/layout";
import { useGlobalContext } from "@/context/GlobalContext";
import Spinner from "@/components/spinner";
import { Appointment, Evening, TimeSlot } from "@/utils/data_interface";
import AppointmentTable from "./appointments_table";
import { GetTime } from "@/utils/auxiliary";


const Appointments: React.FC = (props: any) => {
  const { isLoading, globalEvening, globalEveningTeachers } = useGlobalContext();
  const evenings: Evening[] = props.evenings;
  const appointments = props.appointments;
  const [eveningDetails, setEveningDetails] = useState<Evening>();
  const [slotkey, setSlotkey] = useState<TimeSlot[]>([]);
  

  useEffect(() => {
    const fetchEveningData = async () => {
      if (globalEvening && globalEvening !== "all") {
        try {
          // Fetch evening data by ID from the API
          const response = await fetch(
            `api/fetch/evening/route?evening=${globalEvening}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          // console.log(data.evening);
          setEveningDetails(data.evening);
          //  setIsLoading(false);
        } catch (err: any) {
          console.log(err);
        }
      } else {
        //   setIsLoading(false);
      }
    };

    // console.log(globalEveningTeachers);
    fetchEveningData();

    // Check if globalEvening exists and fetch its details
    if (globalEvening !== "all" && globalEveningTeachers?.length > 0) {
      // Fetch and display the evening details based on the globalEvening context
      setEveningDetails({
        ...globalEvening, // You can customize this based on what data is stored in globalEvening
        teachers: globalEveningTeachers,
      });
    }
  }, [globalEvening, globalEveningTeachers]);


  useEffect(()=> {

    const getSlotKeys = async () => {
      // globalEveningTeachers.length > 0
      if (
        globalEvening &&
        globalEvening !== "all" 
      ) {
        const start_time = GetTime(eveningDetails?.start_time);
        const end_time = GetTime(eveningDetails?.end_time);
        const interval = eveningDetails?.time_per_meeting;

  
        const genData = {
          start_time,
          end_time,
          interval,
        
        };
  
        try {
          // Fetch evening data by ID from the API
          const response = await fetch(`api/generates/getslots`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(genData),
          });
          const data = await response.json();
  
          if (response.ok && !data.error) {
            // setSlotList(data.ap_slot);
            setSlotkey(data.slots);
          }
  
          // console.log(data);
        } catch (err: any) {
          console.log(err);
        }
      }
    };

    getSlotKeys();
  
  }, [globalEvening, globalEveningTeachers])

  console.log(slotkey);

  return (
    <Layout user_data={props}>
      <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
        <DashboardNav evening_data={evenings} />

        {globalEvening == "all" ? (
          <AppointmentTable appointments={appointments} />
        ) : (
          <AppointmentDashboard timeslots={slotkey} eve_teachers={globalEveningTeachers} eve_appointments={appointments} />
        )}
      </div>
    </Layout>
  );
};

export default Appointments;

// ! Getting User Data
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  function getUserId() {
    if (req.headers.cookie) {
      let cookies = cookie.parse(req.headers.cookie);

      if (cookies && cookies.access_token) {
        // console.log(cookies.access_token);
        const userData = JSON.parse(
          JSON.stringify(verifyJWT(cookies.access_token))
        );
        // console.log(userData);

        const user_id = userData.user_info.user_id;
        return user_id;
      }
    }
  }

  const user_id = getUserId();
  if (!user_id) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // console.log(user_id);

  try {
    // Fetch user data from the API
    const response = await fetch(
      process.env.BACKEND_URL + "/user-accounts/userdata/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      }
    );

    // Fetch user Evening data from the API
    const evening_Response = await fetch(
      process.env.BACKEND_URL + "/evenings/planned-by/" + user_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const appointment_Response = await fetch(
      process.env.BACKEND_URL + "/appointments",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    const evening_Data = await evening_Response.json();
    const appointment_Data = await appointment_Response.json();
    console.log("API Response:", appointment_Data);

    // Return user data as props
    return {
      props: {
        user: data,
        evenings: evening_Data,
        appointments: appointment_Data,
      }, // Adjust this depending on your API response structure
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      props: { user: null },
    };
  }
};
