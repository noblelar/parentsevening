import DashboardNav from "@/components/ui/dashboardnav";
import React from "react";
import TeacherTable from "./teachertable";
import { teachers } from "@/utils/datasamples";
import Layout from "../layout/layout";
import { GetServerSideProps } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";
import { Teacher } from "@/utils/data_interface";

const Teachers = (props: any) => {
  // console.log(props.teachers);
  const teachers: Teacher[] = props.teachers;

  console.log(teachers);

  //  ! Checking the user type
  const userDetail = props.user;
  const adminCheck = userDetail.Role.role_type === "admin";
  const teacherCheck = userDetail.Role.role_type === "teacher";
  const parentCheck = userDetail.Role.role_type === "parent";

  const no_teacher = (
    <div>
      No Evening Planned by or Managed By{" "}
      {adminCheck
        ? userDetail.Teacher.first_name
        : userDetail.Parent.first_name}
    </div>
  );

  return (
    <Layout user_data={props}>
      <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
        <DashboardNav />
        {teachers.length === 0 ? (
          no_teacher
        ) : (
          <TeacherTable teachers={teachers} />
        )}
      </div>
    </Layout>
  );
};

export default Teachers;

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
    const evening_Response = await fetch(
      process.env.BACKEND_URL + "/user-accounts/teachers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    const teachers_Data = await evening_Response.json();
    // console.log("API Response:", data);

    // Return user data as props
    return {
      props: { user: data, teachers: teachers_Data },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      props: { user: null },
    };
  }
};
