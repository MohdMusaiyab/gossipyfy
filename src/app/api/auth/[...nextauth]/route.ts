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
          return user;
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
        session.user.username = token.username;
        session.user.isPremium = token.isPremium;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user id to token if user exists
        token.username = user?.username;
        token.isPremium = user?.isPremium;
      }
      return token;
    },
    //For Google Auth Add in Future
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        // Check if the user already exists in the database
        const existingUser = await prisma.user.findFirst({
          where: { email: profile.email },
        });

        if (!existingUser) {
          // Create a random password for the Google user
          const randomPassword = Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(randomPassword, 10);

          // Create a new user in the database
          const newUser = await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.name || `user_${Math.random().toString(36).slice(2, 8)}`, // Fallback if profile.name is missing
              isPremium: false,
              password: hashedPassword,
            },
          });

          // Attach the new user's info to the session
          user.id = newUser.id;
          user.username = newUser.username;
          user.isPremium = newUser.isPremium;
        } else {
          // Attach the existing user's info to the session
          user.id = existingUser.id;
          user.username = existingUser.username;
          user.isPremium = existingUser.isPremium;
        }
      }
      return true; // Allow sign-in
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
