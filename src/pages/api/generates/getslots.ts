import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";

export default async function createEvening(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { start_time, end_time, interval, teacher_list, evening_id } = req.body;

  const eveningData = {
    start_time,
    end_time,
    interval,
  };

  try {
    const response = await fetch(process.env.GEN_URL + "/slots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eveningData),
    });

    const schedules = await response.json();

    // Return success response
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error Generating evening schedule:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
  //   }

  return res.status(401).json({ message: "Unauthorised User" });
}
