import NextAuth, {DefaultSession} from "next-auth"

declare module "next-auth" {
    
  interface User{
    bio?: string;
  }

  interface Session {
    user: {
      id: string;
      bio?: string;
    } & DefaultSession["user"]
  }
}