import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface bodyType {
  user_name: string;
  email: string;
  password: string;
  image: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_name, email, password, image }: bodyType = req.body;

  if (req.method === "POST") {
    try {
      const createUser = await prisma.user.create({
        data: {
          email,
          image,
          user_name,
          password: +password,
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
