import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { comment, post_id, user_id } = req.body;

  if (req.method === "POST") {
    try {
      const createComment = await prisma.comments.create({
        data: {
          post_id: +post_id,
          user_id: +user_id,
          comment,
        },
        include: {
          user: true,
        },
      });

      if (createComment) {
        res.status(200).json({ data: createComment, isOk: true });
      }
    } catch (error) {
      res.status(400).json({ error, isOk: false, message: error });
    }
  } else {
    res.status(409).json({ message: "Invalid Method", isOk: false });
  }
};
