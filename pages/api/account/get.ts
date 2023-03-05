import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: any = req.query;

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: +id,
        },
        include: {
          posts: {
            include: {
              post_reactions: {
                include: {
                  post: true,
                  user: true,
                },
              },
              comments: {
                include: {
                  user: true,
                  post: true,
                },
              },
              user: true,
            },
          },
          following: true,
          followedBy: true,
        },
      });

      res.status(200).json({ isOk: true, data: user });
    } catch (error) {
      res.status(400).json({ isOk: false, message: error });
    }
  } else {
    res.status(409).json({ isOk: false, message: "Invalid Method" });
  }
};
