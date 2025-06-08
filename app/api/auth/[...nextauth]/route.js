import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/User";

import connectDB from "@/db/connectDb";

if(process.env.GITHUB_SECRET === undefined || process.env.GITHUB_SECRET === null || process.env.GITHUB_SECRET === '' ){

  console.log('here is the problem env not found ');
  
}
const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // ...add more providers here
  ],
  callbacks: {

    // it is used to authenticate user 
    async signIn({ user, account, profile, email, credentials }) {
 

      if (account.provider == "github") {

        await connectDB()
 


        // check if user already exist in the db
        const currentUser = await User.findOne({ email: user.email });

        if (!currentUser) {
          // create a new user data document


          const newUser = new User({
            email: user.email,

            username: user.email.split("@")[0],
            profilePic: user.image,
          });



          await newUser.save();
        
          console.log('new data created ', newUser);
          
          
        }

        
        return true; // must return true to allow sign-in
      }
      // else if (account.provider == "google") {

      //   // user.name.replace(' ','-');
      //   await connectDB()



      //   // check if user already exist in the db
      //   const currentUser = await User.findOne({ email: user.email });

      //   if (!currentUser) {
      //     // create a new user data document


      //     const newUser = new User({
      //       email: user.email,

      //       username: user.email.split("@")[0],
      //     });



      //     await newUser.save();
      //     return true; // must return true to allow sign-in
      //   }

      // }
    },

    async session({ session, token, user }) {
      const dbUser = await User.findOne({ email: session.user.email })

      session.user.name = dbUser.username;
      if (dbUser.profilePic)
      {
        session.user.image = dbUser.profilePic;
      }




      return session
    },
  },
});

export { authOptions as GET, authOptions as POST };