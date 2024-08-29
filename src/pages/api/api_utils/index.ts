import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "@/utils/middleware";
import cookie from "cookie";

export function adminCheck(req: any) {
  if (req.headers.cookie) {
    let cookies = cookie.parse(req.headers.cookie);

    if (cookies && cookies.access_token) {
      // console.log(cookies.access_token);
      const userData = JSON.parse(
        JSON.stringify(verifyJWT(cookies.access_token))
      );
      //   console.log(userData);

      const user_role = userData.user_info.Role.role_type;
      const check =
        user_role === "admin" ||
        user_role === "parent" ||
        user_role === "teacher";
      return check;
    }
  }
}

export function teacherCheck(req: any) {
  if (req.headers.cookie) {
    let cookies = cookie.parse(req.headers.cookie);

    if (cookies && cookies.access_token) {
      // console.log(cookies.access_token);
      const userData = JSON.parse(
        JSON.stringify(verifyJWT(cookies.access_token))
      );
      //   console.log(userData);

      const user_role = userData.user_info.Role.role_type;
      const check = user_role === "teacher";
      return check;
    }
  }
}

export function parentCheck(req: any) {
  if (req.headers.cookie) {
    let cookies = cookie.parse(req.headers.cookie);

    if (cookies && cookies.access_token) {
      // console.log(cookies.access_token);
      const userData = JSON.parse(
        JSON.stringify(verifyJWT(cookies.access_token))
      );
      //   console.log(userData);

      const user_role = userData.user_info.Role.role_type;
      const check = user_role === "parent";
      return check;
    }
  }
}
