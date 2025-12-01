import { auth } from "@/lib/auth"; // 👈 seu cliente do Better Auth
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { name, slug } = await req.json();

    // headers() é necessário para que o Better Auth acesse os cookies de sessão
    const result = await auth.api.createOrganization({
      body: {
        name,
        slug,
      },
      headers: await headers(),
    });

    return Response.json(result, { status: 201 });
  } catch (error) {
    console.error("Better Auth createOrganization error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
