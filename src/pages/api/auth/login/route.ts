"use client";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";

const login = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body) return res.status(401).send({});
    console.log(req.body);
    const { loginmode, username, password, code } = req.body;
    const email = username;

    if (loginmode == "email_password") {
      const request = await fetch(
        process.env.BACKEND_URL + "/authentication/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      try {
        const data = await request.json();
        console.log(data);
        if (!request.ok)
          return res.status(request.status).send({ message: data.message });

        res.setHeader("Set-Cookie", [
          cookie.serialize("access_token", data?.token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "lax",
            path: "/",
          }),
        ]);

        res.send({ success: true, user: verifyJWT(data?.token) });
        return;
      } catch {
        res
          .status(request.status)
          .send({ message: "An unexpected error occurred" });
        return;
      }
    } else {
      //! Logging in user One-Time-Password
      const request = await fetch(
        process.env.BACKEND_URL + "/authentication/otp-login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email, code }),
        }
      );

      try {
        const data = await request.json();
        console.log(data);
        if (!request.ok)
          return res.status(request.status).send({ message: data.message });

        res.setHeader("Set-Cookie", [
          cookie.serialize("access_token", data?.token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "lax",
            path: "/",
          }),
        ]);

        // ! Also handle what you do whith jwt token and what you will do with it
        res.send({ success: true, user: verifyJWT(data?.token) });
        return;
      } catch {
        res
          .status(request.status)
          .send({ message: "An unexpected error occurred" });
        return;
      }
    }
  } else {
    res.status(400).send("Request Method not Allowed");
    return;
  }
};

export default login;


//!  Fix the server side prop
// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   if (req.headers.cookie) {
//     let cookies = cookie.parse(req.headers.cookie);

//     if (cookies && cookies.access_token) {
//       return {
//         redirect: {
//           destination: "/dashboard",
//           permanent: false,
//         },
//       };
//     }
//   }

//   return {
//     props: {},
//   };
// };
