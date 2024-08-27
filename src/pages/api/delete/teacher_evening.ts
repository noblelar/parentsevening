import { NextApiRequest, NextApiResponse } from "next";

export default async function RemoveTeacherEvening(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      // Extract the teacher_id and evening_id from the request body
      const { teacher_id, evening_id } = req.body;

      if (!teacher_id || !evening_id) {
        return res
          .status(400)
          .json({ message: "Missing teacher_id or evening_id" });
      }

      // Build the external API URL with teacher_id and evening_id
      const apiUrl = `${process.env.BACKEND_URL}/teacherevening/${teacher_id}/${evening_id}`;

      // Send DELETE request to the external API
      const apiResponse = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the API call was successful
      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        return res
          .status(apiResponse.status)
          .json({ message: errorData.message || "Error removing teacher" });
      }

      // Parse the response if necessary
      const responseData = await apiResponse.json();

      // Respond back to the client with success
      return res.status(200).json({
        message: "Teacher removed successfully",
        data: responseData,
      });
    } catch (error) {
      console.error("Error deleting teacher from evening:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    // Return an error for any other HTTP methods
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
