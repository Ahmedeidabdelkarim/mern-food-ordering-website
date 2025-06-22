import NextAuth, { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mongoose from 'mongoose';
import  User  from '@/app/models/user';
import UserInfo from "@/app/models/UserInfo";
import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            return null;
          }

          const passwordOk = await bcrypt.compare(credentials.password, user.password);

          if (!passwordOk) {
            return null;
          }

          return user;
        } catch (error) {
          console.log('Error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };