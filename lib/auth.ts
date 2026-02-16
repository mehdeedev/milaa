import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getMongoDb } from "@/lib/db/mongo-client";
import { admin, anonymous } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: mongodbAdapter(await getMongoDb()),
  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    admin(),
    anonymous(),
    nextCookies()
  ],
});
