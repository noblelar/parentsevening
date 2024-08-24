"use client";
import React, { useEffect } from "react";
import Revenue from "./dbitems/participation";
import OrderTime from "./dbitems/feedback";
import Rating from "./dbitems/rating";
import MostOrderedFood from "./dbitems/role_distribution";
import Orders from "./dbitems/orders";
import DashboardNav from "@/components/ui/dashboardnav";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import { verifyJWT } from "@/utils/middleware";
import Layout from "../layout/layout";
import { Evening, IBaseLayout } from "@/utils/data_interface";
import { useGlobalContext } from "@/context/GlobalContext";
import Spinner from "@/components/spinner";

const Dashboard: React.FC<IBaseLayout> = (props: any) => {
  const {
    isLoading,
    globalEvening,
    setGlobalEvening,
    globalValue,
    setGlobalValue,
  } = useGlobalContext();
  const evenings: Evening[] = props.evenings;
  const user_prop: string = props.user.user_id;

  useEffect(() => {
    setGlobalValue(user_prop);
  }, []);

  console.log(user_prop);
  return (
    <Layout user_data={props}>
      <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8 ">
        <DashboardNav evening_data={evenings} user_prop={user_prop} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Revenue />
          <OrderTime />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Rating />
          <MostOrderedFood />
        </div>
        <Orders />
      </div>
    </Layout>
  );
};

export default Dashboard;

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
        // console.log(userData.name);

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
  console.log(user_id);

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

//
