import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res
    .status(200)
    .json({ message: "Authorized", accessToken, refreshToken });
}
