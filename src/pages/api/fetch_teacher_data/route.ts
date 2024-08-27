import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";
import { evenings } from "@/utils/datasamples";
import { Teacher } from "@/utils/data_interface";

// get

const getTeacherData = (teacher_evening: any) => {
  let teachers: any = [];
  teacher_evening.map((teach_eve: any) => {
    teachers.push(teach_eve.Teacher);
  });
  return teachers;
};

export default async function getTeachers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  function adminCheck() {
    if (req.headers.cookie) {
      let cookies = cookie.parse(req.headers.cookie);

      if (cookies && cookies.access_token) {
        // console.log(cookies.access_token);
        const userData = JSON.parse(
          JSON.stringify(verifyJWT(cookies.access_token))
        );
        //   console.log(userData);

        const user_role = userData.user_info.Role.role_type;
        const check = user_role === "admin";
        return check;
      }
    }
  }

  const check = adminCheck();

  if (check) {
    const evening = req.query;
    console.log(evening);
    if (evening.evening !== "all") {
      try {
        const response = await fetch(
          process.env.BACKEND_URL +
            "/teacherevening/teachers/" +
            evening.evening,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const teach_eve = await response.json();

        const tea = getTeacherData(teach_eve.teachers);

        // Mock saving the data (replace with your actual logic)
        // console.log("Received data:", tea);

        // Return success response
        res.status(200).json({
          message: "Teacher successfully Fetch",
          teacher_eveing: tea,
          user: check,
        });
      } catch (error) {
        console.error("Error fetching teacher evening:", error);
        res.status(500).json({ message: "Internal server error", error });
      }
    }
  }

  return res.status(401).json({ message: "Unauthorised User", user: check });
}
