import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { choiceId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || undefined;
    const choice = await prisma.choice.findUnique({
      where: { id: params.choiceId },
      include: {
        choiceTokens: { include: { token: true } },
        round: true,
        votes: userId ? { where: { userId } } : false,
      },
    });
    return new Response(JSONBig.stringify(choice), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
