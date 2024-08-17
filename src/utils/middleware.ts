import jwt from "jsonwebtoken";

export const verifyJWT = (token: any) => {
  if (token) {
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET,
      function (err: any, decoded: any) {
        if (err) {
          return err;
        }
        return decoded;
      }
    );

    return decode;
  }
};
