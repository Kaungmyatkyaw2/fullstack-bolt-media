import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { follow_id } = req.body;
  const { id }: any = req.query;

  if (req.method === "PATCH") {
    try {
      const followed = await prisma.user.update({
        data: {
          following: {
            disconnect: {
              id: +follow_id,
            },
          },
        },
        where: {
          id: +id,
        },
      });

      if (followed) {
        const following = await prisma.user.update({
          where: {
            id: +follow_id,
          },
          data: {
            followedBy: {
              disconnect: {
                id: +id,
              },
            },
          },
        });

        if (following) {
          res.status(200).json({ data: followed, isOk: true });
        }
      }
    } catch (error) {
      res.status(400).json({ error, isOk: false, message: error });
    }
  } else {
    res.status(409).json({ message: "Invalid Method", isOk: false });
  }
};
