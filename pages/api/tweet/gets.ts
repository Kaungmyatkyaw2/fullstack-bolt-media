import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const tweets = await prisma.tweets.findMany({
        include: {
          post_reactions: {
            include: {
              user: true,
            },
          },
          user: true,
        },
      });

      res.status(200).json({ isOk: true, data: tweets });
    } catch (error) {
      res.status(400).json({ isOk: false, message: error });
    }
  } else {
    res.status(409).json({ isOk: false, message: "Invalid Method" });
  }
};
