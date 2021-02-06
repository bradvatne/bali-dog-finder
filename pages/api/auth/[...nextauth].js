import NextAuth from "next-auth";
import Providers from "next-auth/providers";

//Oauth2 options
const options = {
  // Currently only set up for Google
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_OAUTH,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      state: false
    }),
  ],
  //Stores values to database automatically
  database: process.env.MONGO_URI,
  callbacks: {
    //Set id so it can be accessed from the session
    session: async (session, user) => {
      session.id = user.id;
      return Promise.resolve(session);
    },
  },
};

export default async (req, res) => {
  await NextAuth(req, res, options);
};
