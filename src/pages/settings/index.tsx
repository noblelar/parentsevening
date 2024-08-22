import DashboardNav from "@/components/ui/dashboardnav";
import React from "react";
import cookie from "cookie";
import { verifyJWT } from "@/utils/middleware";
import { GetServerSideProps } from "next";
import Layout from "../layout/layout";
import { Evening } from "@/utils/data_interface";

const Settings = (props: any) => {
  const evenings: Evening[] = props.evenings;

  return (
    <Layout user_data={props}>
      <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
        <DashboardNav evening_data={evenings} />
      </div>
    </Layout>
  );
};

export default Settings;

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

    const data = await response.json();
    const evening_Data = await evening_Response.json();

    // console.log("API Response:", data);

    // Return user data as props
    return {
      props: { user: data, evenings: evening_Data }, // Adjust this depending on your API response structure
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      props: { user: null },
    };
  }
};
