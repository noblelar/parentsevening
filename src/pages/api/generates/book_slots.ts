import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";
import { students } from "@/utils/datasamples";

export default async function createEvening(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { interval, slots, prefered_time } = req.body;

  const eveningData = {
    appointments: slots,
    interval: interval,
    preferred_start_time: prefered_time,
    student_id: 1,
    parent_id: 1,

  };

  console.log(eveningData)

  try {
    const response = await fetch(process.env.GEN_URL + "/generate_schedule", {
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
    console.error("Error Generating evening appointments:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
  //   }

  return res.status(401).json({ message: "Unauthorised User" });
}
