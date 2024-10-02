import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { VoteWithRoundAndChoice } from "@/types/prisma";
import { Round } from "@prisma/client";

export type CurrentRoundInfo = {
  vote: VoteWithRoundAndChoice;
  nextRound: Round;
};

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
        round: { startDate: { lte: now }, endDate: { gt: now } },
      },
      include: { round: true, choice: true },
    });
    const nextRound = await prisma.round.findFirst({
      where: { startDate: { gte: now } },
      orderBy: { startDate: "asc" },
    });
    return new Response(JSONBig.stringify({ vote, nextRound }), {
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
