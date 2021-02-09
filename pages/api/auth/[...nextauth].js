import { ObjectID } from "mongodb";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
//Oauth2 options
const options = {
  //Enable json web token for credentials login (currently only for guests)
  session: {
    jwt: true,
  },
  //Providers options, currently supporting Google and Facebook, and a Guest login feature
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_OAUTH,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      state: false,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_APPID,
      clientSecret: process.env.FACEBOOK_SECRET,
      state: false,
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      id: "credentials",
      async authorize(credentials) {
        // Credentials login currently only for guest users
        return {
          _id: "d9812eiubd",
          id: "akjsbdkjasd",
          name: "Guest",
          email: "Guest",
        };
      },
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
