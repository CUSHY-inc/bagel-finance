import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const date = new Date(new Date().getTime() - 2.5 * 60 * 1000);
    const rounds = await prisma.round.findMany({
      where: { endDate: { lt: date }, resultStatus: "CALCULATED" },
      include: { choices: { include: { choiceTokens: true } } },
    });
    const response = [];
    for (const round of rounds) {
      const choice = await prisma.choice.findFirst({
        where: { isWinner: true, roundId: round.id },
      });
      if (!choice) {
        continue;
      }
      const pointSum = await prisma.vote.aggregate({
        where: { roundId: round.id },
        _sum: { bet: true },
      });
      const correctPointSum = await prisma.vote.aggregate({
        where: { roundId: round.id, choiceId: choice.id },
        _sum: { bet: true },
      });
      const votes = await prisma.vote.findMany({
        where: { roundId: round.id },
      });
      const res = await prisma.$transaction(async (prisma) => {
        const updated = [];
        for (const vote of votes) {
          if (vote.isCorrect !== null && vote.payout !== null) {
            continue;
          }
          const isCorrect = vote.choiceId === choice.id;
          const payout = isCorrect
            ? (vote.bet * BigInt(pointSum._sum.bet ?? 0)) /
              BigInt(correctPointSum._sum.bet ?? 0)
            : 0;
          const updatedVote = await prisma.vote.update({
            where: { id: vote.id },
            data: { isCorrect, payout },
          });
          let updatedPoint = null;
          if (payout > 0) {
            updatedPoint = await prisma.point.update({
              where: { userId: vote.userId },
              data: { bagel: { increment: payout } },
            });
          }
          updated.push({ vote: updatedVote, point: updatedPoint });
        }
        await prisma.round.update({
          where: { id: round.id },
          data: { resultStatus: "PAID_OUT" },
        });
        return updated;
      });
      response.push(res);
    }
    return new Response(JSONBig.stringify(response), {
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
