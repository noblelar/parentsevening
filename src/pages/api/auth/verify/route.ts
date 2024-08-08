"use client";

import { NextApiRequest, NextApiResponse } from "next";

const verify = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body) return res.status(401).send({});
    console.log(req.body);
    const { loginmode, username } = req.body;
    const email = username;
    if (loginmode == "email_only") {
      const request = await fetch(process.env.BACKEND_URL + "/otp/generate", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      // console.log(request);
      if (request.ok) {
        res.status(200).json({ success: true });
        return;
      }
    }
  } else {
    res.status(400).send("Request Method not Allowed");
    return;
  }
};

export default verify;
