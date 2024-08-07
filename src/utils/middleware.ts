// const jwt = require("jsonwebtoken");
// import { exportTraceState } from "next/dist/trace";
import jwt from "jsonwebtoken";

export const verifyJWT = (token: any) => {
  if (token) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode
  }
};
