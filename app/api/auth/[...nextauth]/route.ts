import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (profile) {
        const namespace = "https://next-app.com/roles"; // custom claim namespace
        token.roles = (profile as any)[namespace] || [];
      }
      return token;
    },
    async session({ session, token }) {
      session.user.roles = token.roles;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
