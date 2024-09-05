import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";
import { evenings } from "@/utils/datasamples";

export default async function createEvening(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
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
    const publish = req.body;
    const { eveningId } = req.query;

    try {
      const response = await fetch(
        process.env.BACKEND_URL + "/evenings/" + eveningId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(publish),
        }
      );

      const evening = await response.json();

      // Mock saving the data (replace with your actual logic)
      console.log("Received data:", evening);

      // Return success response
      res.status(200).json({
        message: "Evening successfully created!",
        evening: evening,
        user: check,
      });
    } catch (error) {
      console.error("Error creating evening:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  return res.status(401).json({ message: "Unauthorised User", user: check });
}
