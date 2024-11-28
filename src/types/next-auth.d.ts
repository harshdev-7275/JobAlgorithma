import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    user: {
      id: string;
      name: string;
    };
  }
}