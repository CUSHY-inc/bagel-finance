import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { VoteWithRoundAndChoiceWithDetails } from "@/types/prisma";
import { Point, Round } from "@prisma/client";

export type CurrentRoundInfo = {
  vote: VoteWithRoundAndChoiceWithDetails;
  nextRound: Round;
  point: Point;
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
      include: {
        round: true,
        choice: { include: { choiceTokens: { include: { token: true } } } },
      },
    });
    const nextRound = await prisma.round.findFirst({
      where: { startDate: { gte: now } },
      orderBy: { startDate: "asc" },
    });
    const point = await prisma.point.findUnique({ where: { userId } });
    return new Response(JSONBig.stringify({ vote, nextRound, point }), {
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
