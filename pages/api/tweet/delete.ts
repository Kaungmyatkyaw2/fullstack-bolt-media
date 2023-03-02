import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: any = req.query;



  if (req.method === "DELETE") {
    try {
      const delTweet = await prisma.posts.delete({
        where: {
          id: +id,
        },
      });

      if (delTweet) {
        res.status(200).json({ data: delTweet, isOk: true });
      }
    } catch (error) {
      res.status(400).json({ error, isOk: false, message: error });
    }
  } else {
    res.status(409).json({ message: "Invalid Method", isOk: false });
  }
};
