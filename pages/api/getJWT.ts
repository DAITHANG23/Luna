import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = req.headers.cookie;

  const jwt =
    cookies
      ?.split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      ?.split("=")[1] || null;

  res.status(200).json({ jwt });
}
