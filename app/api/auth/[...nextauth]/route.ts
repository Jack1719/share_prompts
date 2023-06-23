import { connectToDatabase } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({session, token, user}) {
      if (!session.user) {
        return session;
      }
      const sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser) {
        // Instead of trying to modify session.user directly, we create a new object
        return {
          ...session,
          user: {
            ...session.user,
            id: sessionUser._id.toString()
          }
        };
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();
        if (profile) {
          const userExists = await User.findOne({ email: profile.email });
          
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name!.replace(/\s/g, "").toLowerCase(),
              image: profile.image,
            });
          }
          return true;
        }
        return false;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST};
