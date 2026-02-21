'use server';
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db/mongoose";
import { headers } from "next/headers";

export async function getActiveAuthorListService() {
  connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(session?.user?.role !== 'admin'){
    throw new Error("Not Authenticated");
  }

  debugger
  //   const categories = await .find().select("title slug").lean();
  //   return categories.map((category) => ({
  //     ...category,
  //     _id: category._id.toString(),
  //   }));
}
