import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import connectDB from "./db";
import UserModel from "@/models/User";

export const AuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
          }
          const user = await UserModel.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.password) {
            throw new Error(
              "This account uses social login. Please sign in with a OAuth provider",
            );
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user?._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log("DETAILS: ", {
      //   user: user,
      //   account: account,
      //   profile: profile,
      // });
      if (account?.provider === "google" || account?.provider === "azure-ad") {
        try {
          await connectDB();
          const email =
            user.email ||
            (profile as any)?.email ||
            (profile as any)?.preferred_username;

          let avatarURL = null;
          if (account.provider === "azure-ad") {
            if (account.access_token) {
              const photoRes = await fetch(
                "https://graph.microsoft.com/v1.0/me/photo/$value",
                {
                  headers: { Authorization: `Bearer ${account.access_token}` },
                },
              );

              if (photoRes.ok) {
                const buffer = await photoRes.arrayBuffer();
                const base64 = Buffer.from(buffer).toString("base64");
                const mimeType =
                  photoRes.headers.get("content-type") || "image/jpeg";
                avatarURL = `data:${mimeType};base64,${base64}`;
                // Or upload this buffer to S3/Cloudinary and store the URL instead
              }
            }
          } else {
            avatarURL = user.image;
          }
          const existing = await UserModel.findOne({ email: user.email });
          if (!existing) {
            const newUser = new UserModel({
              name: user.name || profile?.name || user.email?.split("@")[0],
              email: email,
              avatar: avatarURL,
            });
            await newUser.save();
          }
        } catch (error) {
          console.error("OAuth user creation error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      // console.log("Token in Auth:",token)
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      // console.log("session in Auth:",session)
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/error",
  },
};
