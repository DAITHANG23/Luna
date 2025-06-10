import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "text/plain");
  res.send(`User-agent: *
Disallow: /admin
Allow: /
Sitemap: https://domiquefusion.store/sitemap.xml
`);
}
