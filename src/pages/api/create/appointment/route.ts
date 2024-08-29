import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";
import { Appointment } from "@/utils/data_interface";

export default async function saveAppointments(
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
        const userData = JSON.parse(
          JSON.stringify(verifyJWT(cookies.access_token))
        );

        const user_role = userData.user_info.Role.role_type;
        const check = user_role === "admin";
        return check;
      }
    }
    return false; // Return false if there's no valid cookie or token
  }

  const check = adminCheck();

  if (check) {
    // Get data from the request body
    const { evening_id, appointmentsa } = req.body;

    // Prepare the data to send to the backend API
    const appointments = appointmentsa;

    console.log(appointments)

    try {
      const response = await fetch(process.env.BACKEND_URL + "/appointments/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({appointments: appointments, evening_id: evening_id}),
      });

      const savedAppointments = await response.json();

      // Return success response
      res.status(200).json({
        message: "Appointments successfully saved!",
        savedAppointments: savedAppointments,
        user: check,
      });
    } catch (error) {
      console.error("Error saving appointments:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized User", user: check });
  }
}
