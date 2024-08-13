


import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("access_token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV !== "development",
        sameSite: "lax",
        path: "/",
      }),
    ]);

    return res.send({});
  } else {
    res.send({remark: `${req.method} is not allowed`, success: true})
  }
};

export default logout;
