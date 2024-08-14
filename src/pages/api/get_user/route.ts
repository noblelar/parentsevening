import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { verifyJWT } from "@/utils/middleware";

const getUserData = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // if (!req.body) return res.status(401).send({});
    // console.log(req.body);
    // const { userid } = req.body;
    // console.log(user_id);
    
    if (req.headers.cookie) {
      let cookies = cookie.parse(req.headers.cookie);
      const userData = JSON.parse(
        JSON.stringify(verifyJWT(cookies.access_token))
      );
      console.log(userData);

      const user = userData ? userData.user_info.user_id : "";
      console.log(user);
      const user_id = parseInt(user);
      if (cookies && cookies.access_token) {
        const request = await fetch(
          process.env.BACKEND_URL + "/user-accounts/userdata/",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ user_id }),
          }
        );

        try {
          const data = await request.json();
          // console.log(data);
          return res.status(request.status).json({ data });
        } catch {
          res
            .status(request.status)
            .send({ message: "An unexpected error occurred" });
          return;
        }
      }
    }
  } else {
    res.status(400).send("Request Method not Allowed");
    return;
  }
};

export default getUserData;
