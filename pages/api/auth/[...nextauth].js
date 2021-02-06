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
      console.log('THIS IS THE URL', url)
      if (url === '/auth/signin/') {
        console.log("RETURNING URL: https://balidogfinder.com/auth/signin/")
        return ('https://balidogfinder.com/auth/signin/')
      }
    },
  },
};

export default async (req, res) => {
  await NextAuth(req, res, options);
};
