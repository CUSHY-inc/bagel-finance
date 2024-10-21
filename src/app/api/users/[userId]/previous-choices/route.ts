import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const rounds = await prisma.round.findMany({
      where: {
        endDate: { lt: new Date(new Date().getTime() - 5 * 60 * 1000) },
      },
      orderBy: { startDate: "desc" },
      include: {
        votes: { where: { userId } },
        choices: true,
      },
    });
    return new Response(JSONBig.stringify(rounds), {
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
