import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface bodyType {
  description: string;
  user_id: string;
  image: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { image, description, user_id } = req.body;

  if (req.method === "POST") {
    try {
      const createUser = await prisma.posts.create({
        data: {
          image,
          description,
          user_id: +user_id,
        },
        include: {
          post_reactions: true,
          user: true,
        },
      });

      if (createUser) {
        res.status(200).json({ data: createUser, isOk: true });
      }
    } catch (error) {
      res.status(400).json({ error, isOk: false, message: error });
    }
  } else {
    res.status(409).json({ message: "Invalid Method", isOk: false });
  }
};
