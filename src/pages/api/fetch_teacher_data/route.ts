import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { verifyJWT } from "@/utils/middleware";
// import getSession from "../getting_session";


const getSession = (req: NextApiRequest) => {
   if (req.headers.cookie) {
     let cookies = cookie.parse(req.headers.cookie);
 
     const getdata = verifyJWT(cookies.token);
     console.log(getdata);
     return getdata;
   }
   return null;
 };


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req);

  //   const session = cookie.parse(req.headers.cookie)

  // Check if the user is authenticated
  if (!session) {
    res.status(401).json({
      error: "User is not authenticated",
    });
    return;
  }

  // Check if the user has the 'admin' role
  //   if (session?.user.user_info.Role.role_type !== "admin") {
  if (session !== "admin") {
    res.status(401).json({
      error: "Unauthorized access: User does not have admin privileges.",
    });
    return;
  }

  // Proceed with the route for authorized users
  // ... implementation of the API Route
}
