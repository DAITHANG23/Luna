import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res
    .status(200)
    .json({ message: "Authorized", accessToken, refreshToken });
}
