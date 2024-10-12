import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import ResendProvider from "next-auth/providers/resend";
import { Resend } from "resend";

import { env } from "@/env.mjs";
import getErrorMessage from "@/lib/get-error-message";
import MagicLinkEmail from "@/components/email-templates/send-magic-link";
import { db } from "@/drizzle";

const resend = new Resend(env.RESEND_API_KEY);

export const authConfig = {
  providers: [
    ResendProvider({
      from: "no-reply@amanfoo.com.gh",
      sendVerificationRequest: async ({ identifier, url }) => {
        try {
          await resend.emails.send({
            from: `Amanfoɔ <${env.EMAIL_FROM || "info@amanfoo.com.gh"}>`,
            to: identifier,
            subject: "Your secured (magic) link for signing in - Amanfoɔ",
            react: MagicLinkEmail({ magicLink: url }),
          });
        } catch (err) {
          throw new Error(getErrorMessage(err, "Email could not be sent."));
        }
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id ?? "";
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.image = token.picture;
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.email, token.email || ""),
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.picture = dbUser.image;
        token.role = dbUser.role;
      } else if (user) {
        token.id = user?.id ?? "";
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.role = user.role;
      }

      return token;
    },

    async signIn({ user: currentUser }) {
      const userExists = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.email, currentUser.email || ""),
      });

      if (userExists) {
        return true;
      } else {
        return false;
      }
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
