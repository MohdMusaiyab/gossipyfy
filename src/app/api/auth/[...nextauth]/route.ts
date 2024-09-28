import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Ensure credentials exist
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) {
            throw new Error("No user found");
          }

          //Check if the password is correct
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid password.");
          }
          return user; // Return the user if the password is correct
          
        } catch (error) {
          console.error("Error during authorization:", error);
          return null; // Handle errors during the fetch
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        //@ts-ignore
        session.user.id = token.sub; // Assign user id from token to session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user id to token if user exists
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
