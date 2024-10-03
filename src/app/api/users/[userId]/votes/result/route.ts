import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const now = new Date();
    const vote = await prisma.vote.findFirst({
      where: {
        userId,
        round: { endDate: { lt: now } },
        isChecked: false,
        isCorrect: { not: null },
        payout: { not: null },
      },
      include: {
        round: true,
        choice: { include: { choiceTokens: { include: { token: true } } } },
      },
      orderBy: { round: { startDate: "asc" } },
    });
    return new Response(JSONBig.stringify(vote), {
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
