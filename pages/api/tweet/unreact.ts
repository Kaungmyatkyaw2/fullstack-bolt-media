import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { post, user }: any = req.query;

  if (req.method === "DELETE") {
    try {
      const delReaction = await prisma.post_reactions.delete({
        where: {
          user_id_post_id: {
            post_id: +post,
            user_id: +user,
          },
        },
      });

      if (delReaction) {
        res.status(200).json({ data: delReaction, isOk: true });
      }
    } catch (error) {
      res.status(400).json({ error, isOk: false, message: error });
    }
  } else {
    res.status(409).json({ message: "Invalid Method", isOk: false });
  }
};
