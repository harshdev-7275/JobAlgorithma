import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" }, // Match `username` field
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials); 
      
        if (!credentials?.username || !credentials?.password) {
          console.error("Missing username or password");
          throw new Error("Username and password are required");
        }
      
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });
      
        if (!user) {
          console.error("User not found");
          
          throw new Error("Invalid username or password");

        }
      
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          console.error("Invalid password");
          throw new Error("Invalid username or password");
        }
        return { id: user.id, name: user.name }; // Return user data
      }
      
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
