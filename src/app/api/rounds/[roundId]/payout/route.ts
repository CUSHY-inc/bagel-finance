import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _: NextRequest,
  { params }: { params: { roundId: string } }
) {
  try {
    const choice = await prisma.choice.findFirst({
      where: { isWinner: true, roundId: params.roundId },
    });
    if (!choice) {
      return NextResponse.json(
        { error: `The result hasn't been calculated` },
        { status: 500 }
      );
    }
    const pointSum = await prisma.vote.aggregate({
      where: { roundId: params.roundId },
      _sum: { bet: true },
    });
    const correctPointSum = await prisma.vote.aggregate({
      where: { roundId: params.roundId },
      _sum: { bet: true },
    });
    const votes = await prisma.vote.findMany({
      where: { roundId: params.roundId },
    });
    if (votes[0] && votes[0].isCorrect !== null && votes[0].payout !== null) {
      return NextResponse.json({
        message: `This round has been paid out`,
      });
    }
    await prisma.$transaction(async (prisma) => {
      for (const vote of votes) {
        const isCorrect = vote.choiceId === choice.id;
        const payout = isCorrect
          ? (vote.bet * BigInt(pointSum._sum.bet ?? 0)) /
            BigInt(correctPointSum._sum.bet ?? 0)
          : 0;
        await prisma.vote.update({
          where: { id: vote.id },
          data: { isCorrect, payout },
        });
        if (payout > 0) {
          await prisma.point.update({
            where: { userId: vote.userId },
            data: { bagel: { increment: payout } },
          });
        }
      }
    });
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
