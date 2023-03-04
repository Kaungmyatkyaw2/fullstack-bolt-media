import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { post_id, user_id } = req.body;

  if (req.method === "POST") {
    try {
      const createReaction = await prisma.post_reactions.create({
        data: {
          post_id: +post_id,
          user_id: +user_id,
        },
        include : {
          user :true
        }
      });

      if (createReaction) {
        res.status(200).json({ data: createReaction, isOk: true });
      }
    } catch (error) {
      res.status(400).json({ error, isOk: false, message: error });
    }
  } else {
    res.status(409).json({ message: "Invalid Method", isOk: false });
  }
};
