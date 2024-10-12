import { fetchCoinGecko } from "@/lib/coinGecko";
import { dateToTimestamp } from "@/lib/common";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const date = new Date(new Date().getTime() - 2.5 * 60 * 1000);
    const rounds = await prisma.round.findMany({
      where: { endDate: { lt: date }, resultStatus: "NONE" },
      include: { choices: { include: { choiceTokens: true } } },
    });
    const response = [];
    for (const round of rounds) {
      const allVotes = await prisma.vote.count({
        where: { roundId: round.id },
      });
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
          continue;
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
      if (results.length === 0) {
        continue;
      }
      const max = results.reduce(
        (max, result) => (result.result > max.result ? result : max),
        results[0]
      );
      max.isWinner = true;
      const res = await prisma.$transaction(async (prisma) => {
        const updated = [];
        for (const result of results) {
          const choice = await prisma.choice.update({
            where: { id: result.id },
            data: {
              result: result.result,
              isWinner: result.isWinner,
              voteRate: result.voteRate,
            },
          });
          updated.push(choice);
        }
        await prisma.round.update({
          where: { id: round.id },
          data: { resultStatus: "CALCULATED" },
        });
        return updated;
      });
      response.push(res);
    }
    return NextResponse.json(response);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
