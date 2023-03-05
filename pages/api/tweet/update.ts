import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { image, description } = req.body;
  const { id }: any = req.query;

  if (req.method === "PATCH") {
    try {
      const updateTweet = await prisma.tweets.update({
        data: {
          image: image || null,
          description,
        },
        where: {
          id: +id,
        },
        include: {
          post_reactions: {
            include: {
              user: true,
            },
          },
          user: true,
          comments: {
            include: {
              user: true,
            },
          },
        },
      });

      if (updateTweet) {
        res.status(200).json({ data: updateTweet, isOk: true });
      }
    } catch (error) {
      res.status(400).json({ error, isOk: false, message: error });
    }
  } else {
    res.status(409).json({ message: "Invalid Method", isOk: false });
  }
};
