import DashboardNav from "@/components/ui/dashboardnav";
import React from "react";
import StudentTable from "./studenttable";
import cookie from "cookie";
import { verifyJWT } from "@/utils/middleware";
import { GetServerSideProps } from "next";
import Layout from "../layout/layout";
import { Evening, Student } from "@/utils/data_interface";
import { useGlobalContext } from "@/context/GlobalContext";
import Spinner from "@/components/spinner";

const Students = (props: any) => {
  const { isLoading } = useGlobalContext();

  const students: Student[] = props.students;
  const evenings: Evening[] = props.evenings;

  //  ! Checking the user type
  const userDetail = props.user;
  const adminCheck = userDetail.Role.role_type === "admin";
  const teacherCheck = userDetail.Role.role_type === "teacher";
  const parentCheck = userDetail.Role.role_type === "parent";

  const no_student = (
    <div>
      No Evening Planned by or Managed By{" "}
      {adminCheck || teacherCheck
        ? userDetail.Teacher.first_name
        : userDetail.Parent.first_name}
    </div>
  );

  return (
    <Layout user_data={props}>
      <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
        <DashboardNav evening_data={evenings} />
        {students.length === 0 ? (
          no_student
        ) : (
          <StudentTable students={students} />
        )}
      </div>
    </Layout>
  );
};

export default Students;

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
    const student_Response = await fetch(process.env.BACKEND_URL + "/student", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
    const student_Data = await student_Response.json();
    const evening_Data = await evening_Response.json();
    // console.log("API Response:", data);

    // Return user data as props
    return {
      props: { user: data, students: student_Data, evenings: evening_Data }, // Adjust this depending on your API response structure
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      props: { user: null },
    };
  }
};
