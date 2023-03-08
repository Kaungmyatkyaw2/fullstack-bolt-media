import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      //   @ts-ignore
      async authorize(credentials: Data) {
        const isUserExist = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            followedBy: true,
            following: true,
          },
        });

        if (!isUserExist) throw new Error("User Doesn't Exist");

        const isPasswordValid = +credentials.password === isUserExist.password;

        if (!isPasswordValid) throw new Error("Wrong Password");

        return isUserExist;
      },
    }),
  ],
  secret: "hkdhfaklfdk33i4u31idnf23@#@#23kI",
  callbacks: {
    async session({ session, user }: any) {
      const check = await prisma.user.findUnique({
        // @ts-ignore
        where: { email: session.user.email },
        include: {
          followedBy: true,
          following: true,
        },
      });
      session.user = {
        name: check?.user_name,
        email: check?.email,
        id: check?.id,
        followedBy: check?.followedBy,
        following: check?.following,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
