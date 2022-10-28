import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { NextApiRequest, NextApiResponse } from "next";

export const authOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      // issuer was domain before
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  /* secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" }, */
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  NextAuth(req, res, authOptions);
