import { fetchCoinGecko } from "@/lib/coinGecko";
import { dateToTimestamp } from "@/lib/common";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _: NextRequest,
  { params }: { params: { roundId: string } }
) {
  try {
    const round = await prisma.round.findUnique({
      where: { id: params.roundId },
      include: { choices: { include: { choiceTokens: true } } },
    });
    const allVotes = await prisma.vote.count({
      where: { roundId: params.roundId },
    });
    if (!round) {
      return NextResponse.json(
        { error: `The round with ID ${params.roundId} was not found` },
        { status: 404 }
      );
    }
    const results: {
      id: string;
      result: number;
      isWinner: boolean;
      voteRate: number;
    }[] = [];
    for (const choice of round.choices) {
      if (
        choice.isWinner !== null &&
        choice.result !== null &&
        choice.voteRate !== null
      ) {
        return NextResponse.json({
          message: `This round has been calculated`,
        });
      }
      let result = 0;
      for (const choiceToken of choice.choiceTokens) {
        const data = await fetchCoinGecko(
          `/coins/${choiceToken.tokenId}/market_chart/range`,
          {
            vs_currency: "usd",
            from: dateToTimestamp(new Date(round.startDate)) - 2.5 * 60,
            to: dateToTimestamp(new Date(round.endDate)) + 2.5 * 60,
          }
        );
        const ratio = data.prices.at(-1)[1] / data.prices[0][1] - 1;
        result += ratio * choiceToken.proportion;
      }
      const voteCount = await prisma.vote.count({
        where: { choiceId: choice.id },
      });
      results.push({
        id: choice.id,
        result,
        isWinner: false,
        voteRate: allVotes === 0 ? 0 : (voteCount / allVotes) * 100,
      });
    }
    const max = results.reduce(
      (max, result) => (result.result > max.result ? result : max),
      results[0]
    );
    max.isWinner = true;
    await prisma.$transaction(async (prisma) => {
      for (const result of results) {
        await prisma.choice.update({
          where: { id: result.id },
          data: {
            result: result.result,
            isWinner: result.isWinner,
            voteRate: result.voteRate,
          },
        });
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
