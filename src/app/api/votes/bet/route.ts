import JSONBig from "json-bigint";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId;
    const roundId = body.roundId;
    const choiceId = Number(body.choiceId);
    const bet = Number(body.bet);
    if (!userId || !roundId || isNaN(choiceId) || isNaN(bet)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const point = await prisma.point.findUnique({ where: { userId } });
    if (!point?.bagel || point.bagel < BigInt(bet)) {
      return NextResponse.json(
        { error: "Invalid bet amount" },
        { status: 400 }
      );
    }
    const res = await prisma.$transaction(async (prisma) => {
      const vote = await prisma.vote.create({
        data: { userId, roundId, choiceId, bet: BigInt(bet) },
      });
      const updatedPoint = await prisma.point.update({
        where: { userId },
        data: { bagel: point.bagel - BigInt(bet) },
      });
      return { vote, point: updatedPoint };
    });
    return new Response(JSONBig.stringify(res), {
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
