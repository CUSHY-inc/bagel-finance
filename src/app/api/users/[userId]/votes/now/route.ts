import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const now = new Date();
    const currentRound = await prisma.round.findFirst({
      where: { startDate: { lte: now }, endDate: { gt: now } },
      include: {
        votes: {
          where: { userId: params.userId },
          include: {
            choice: { include: { choiceTokens: { include: { token: true } } } },
            round: true,
          },
        },
      },
    });
    const nextRound = await prisma.round.findFirst({
      where: { startDate: { gt: now } },
      orderBy: { startDate: "asc" },
      include: {
        votes: {
          where: { userId: params.userId },
          include: {
            choice: { include: { choiceTokens: { include: { token: true } } } },
            round: true,
          },
        },
      },
    });
    const point = await prisma.point.findUnique({
      where: { userId: params.userId },
    });
    return new Response(JSONBig.stringify({ currentRound, nextRound, point }), {
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
