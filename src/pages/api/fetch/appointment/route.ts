import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";
import { Appointment, Evening } from "@/utils/data_interface";

export default async function getTeachers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Check if the user is an admin
  function adminCheck() {
    if (req.headers.cookie) {
      let cookies = cookie.parse(req.headers.cookie);

      if (cookies && cookies.access_token) {
        const userData = JSON.parse(
          JSON.stringify(verifyJWT(cookies.access_token))
        );

        const user_role = userData.user_info.Role.role_type;
        return (
          user_role === "admin" ||
          user_role === "parent" ||
          user_role === "teacher"
        ); // Return true if admin
      }
    }
    return false;
  }

  const isAdmin = adminCheck();

  if (!isAdmin) {
    return res.status(401).json({ message: "Unauthorised User" });
  }

  // Get the evening ID from the query parameters
  const { eveningId } = req.query;

  // Ensure evening ID is valid
  if (!eveningId || eveningId === "all") {
    return res.status(400).json({ message: "Invalid evening ID" });
  }

  try {
    // Fetch the teacher-evening data from your provided API endpoint
    const apiUrl = `${process.env.BACKEND_URL}/appointments/bulk/${eveningId}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`Failed to fetch data from url`);
    }

    // Parse the JSON response
    const appointments = await response.json();

    // Extract teachers from the response
    const app: Appointment[] = appointments;

    // Return success response
    return res.status(200).json({
      message: "Appointment successfully fetched",
      appointment: app, // Return the full evening data if needed
      check: isAdmin,
    });
  } catch (error) {
    console.error("Error fetching appointment evening:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
}
