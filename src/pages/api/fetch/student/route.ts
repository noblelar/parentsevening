import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";
import { Evening, Student } from "@/utils/data_interface";

export default async function getStudent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Check if the user is an admin
  function parentCheck() {
    if (req.headers.cookie) {
      let cookies = cookie.parse(req.headers.cookie);

      if (cookies && cookies.access_token) {
        const userData = JSON.parse(
          JSON.stringify(verifyJWT(cookies.access_token))
        );

        const user_role = userData.user_info.Role.role_type;
        return user_role === "parent"; // Return true if admin
      }
    }
    return false;
  }

  const isParent = parentCheck();

  if (!isParent) {
    return res.status(401).json({ message: "Unauthorised User" });
  }

  // Get the evening ID from the query parameters
  const student = req.body;

  console.log(student);
  try {
    // Fetch the teacher-evening data from your provided API endpoint
    const apiUrl = `${process.env.BACKEND_URL}/student/student/fetch`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${apiUrl}`);
    }

    // Parse the JSON response
    const studentData = await response.json();

    // Extract teachers from the response
    const stud: Student = studentData;
    try {
      const parentChild = {
        student_id: stud.student_id,
        parent_id: student.myId,
      };

      const createpcUrl = `${process.env.BACKEND_URL}/parent-children`;
      const createParentChild = await fetch(createpcUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parentChild),
      });

      const outcome = await createParentChild.json();
      console.log({"outcome": outcome})
    } catch (err) {
      console.log("Unable to add relationship");
    }

    // console.log(stud)

    // Return success response
    return res.status(200).json({
      message: "Student successfully fetched",
      student: stud, // Return the full evening data if needed
      check: isParent,
    });
  } catch (error) {
    console.error("Error fetching Student Info:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
}
