import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";
import { evenings } from "@/utils/datasamples";

export default async function createTeacher(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
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
    // Get data from the request body
    const {
      first_name,
      last_name,
      email,
      contact_info,
      availability,
      subject,
    } = req.body;

    const teacherData = {
      username: email,
      password: "securepassword",
      role_id: 2,
      userType: "teacher",
      userDetails: {
        first_name: first_name,
        last_name: last_name,
        email : email,
        contact_info: contact_info,
        availability: availability,
        subject : subject,
      },
    };

    try {
      const response = await fetch(process.env.BACKEND_URL + "/user-accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });

      const teacher = await response.json();

      // Mock saving the data (replace with your actual logic)
      console.log("Received data:", teacher);

      // Return success response
      res.status(200).json({
        message: "Teacher successfully created!",
        teacher: teacher,
        user: check,
      });
    } catch (error) {
      console.error("Error creating evening:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  return res.status(401).json({ message: "Unauthorised User", user: check });
}
