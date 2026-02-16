import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await auth.api.signUpEmail({
    body: {
        name: "John Doe", // required
        email: "john.doe@example.com", // required
        password: "password1234", // required
        image: "https://example.com/image.png",
        callbackURL: "https://example.com/callback",
    },
      headers: await headers()
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
// export async function GET(request: Request) {
//   try {
//     await auth.api.setRole({
//       body: {
//         userId: "69844cc3dcfebee002c1dee0", // user email address
//         role: 'admin'
//       },
//       headers: await headers()
//     });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({ error: "An error occurred" }, { status: 500 });
//   }
// }
