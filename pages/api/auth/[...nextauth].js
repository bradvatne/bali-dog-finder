import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_OAUTH,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      state: false
    }),
  ],
  database: process.env.MONGO_URI,
  callbacks: {
    session: async (session, user) => {
      session.id = user.id;
      return Promise.resolve(session);
    },
    redirect: async (url, _) => {
      if (url === '/auth/signin') {
        return Promise.resolve('/auth/signin')
      }
      return Promise.resolve('/')
    },
  },
};

export default async (req, res) => {
  await NextAuth(req, res, options);
};
