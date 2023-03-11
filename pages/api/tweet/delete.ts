import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: any = req.query;

  if (req.method === "DELETE") {
    try {
      const delReaction = await prisma.post_reactions.deleteMany({
        where: {
          post_id: +id,
        },
      });

      if (delReaction) {
        const delComment = await prisma.comments.deleteMany({
          where: {
            post_id: +id,
          },
        });

        if (delComment) {
          const delTweet = await prisma.tweets.delete({
            where: {
              id: +id,
            },
          });

          if (delTweet) {
            res.status(200).json({ data: delTweet, isOk: true });
          }
        }
      }
    } catch (error) {
      res.status(400).json({ error, isOk: false, message: error });
    }
  } else {
    res.status(409).json({ message: "Invalid Method", isOk: false });
  }
};
