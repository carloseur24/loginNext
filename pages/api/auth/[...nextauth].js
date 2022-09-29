import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url }) {
      if (url.includes("/")) return "/login"
      if (url.includes("/login")) return "/"
      return url
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signIn(message) {
      await fetch(`http://localhost:3000/api/accountCreated`).then((res) =>
        res.json("successfully")
      )
    },
    async signOut(message) {
      await fetch(`http://localhost:3000/api/accountCreated`).then((res) =>
        res.json("successfully")
      )
    },
  },
})
