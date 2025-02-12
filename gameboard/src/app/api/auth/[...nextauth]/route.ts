import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Extend the User and Session types
declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    avatar?: string | null;
    badges?: string[] | null;
    age?: number | null;
    sex?: string | null;
  }

  interface Session {
    user: User;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        // Find the user by email
        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          return null; // Return null if no user is found
        }

        // Compare the provided password with the hashed password
        const isValid = await bcrypt.compare(
          credentials?.password || "",
          user.password
        );
        if (!isValid) {
          return null; // Return null if the password is invalid
        }

        // Return the user object (without the password)
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          badges: user.badges,
          age: user.age,
          sex: user.sex,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // Include user details in the JWT token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.avatar = user.avatar;
        token.badges = user.badges;
        token.age = user.age;
        token.sex = user.sex;
      }
      return token;
    },
    async session({ session, token }) {
      // Include user details in the session object
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.avatar = token.avatar as string | null | undefined;
        session.user.badges = token.badges as string[] | null | undefined;
        session.user.age = token.age as number;
        session.user.sex = token.sex as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is defined in your environment
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
