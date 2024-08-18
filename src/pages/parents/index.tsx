import DashboardNav from "@/components/ui/dashboardnav";
import React from "react";
import ParentTable from "./parenttable";
import { parents } from "@/utils/datasamples";
import { verifyJWT } from "@/utils/middleware";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import Layout from "../layout/layout";
import { Parent } from "@/utils/data_interface";

const Parents = (props: any) => {
  console.log(props);
  const parents: Parent[] = props.parents;

  return (
    <Layout user_data={props}>
      <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
        <DashboardNav />
        <ParentTable parents={parents} />
      </div>
    </Layout>
  );
};

export default Parents;

// ! Getting User Data and Parent Data
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

        if (!userData.user_info) {
          res.setHeader("Set-Cookie", [
            cookie.serialize("access_token", "", {
              httpOnly: true,
              expires: new Date(0),
              secure: process.env.NODE_ENV !== "development",
              sameSite: "lax",
              path: "/",
            }),
          ]);
          return false;
        }

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

    // Fetch user data from the API
    const parent_Response = await fetch(
      process.env.BACKEND_URL + "/user-accounts/parents",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    const parent_Data = await parent_Response.json();
    // console.log("API Response:", data);

    // Return user data as props
    return {
      props: { user: data, parents: parent_Data }, // Adjust this depending on your API response structure
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      props: { user: null },
    };
  }
};
