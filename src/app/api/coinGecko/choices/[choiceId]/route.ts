import { fetchCoinGecko } from "@/lib/coinGeckoApi";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export type ChoiceChangePercentage = {
  changePercentage1h: number;
  changePercentage24h: number;
  changePercentage7d: number;
  changePercentage30d: number;
};

export async function GET(
  _: NextRequest,
  { params }: { params: { choiceId: string } }
) {
  try {
    const choice = await prisma.choice.findUnique({
      where: { id: params.choiceId },
      include: { choiceTokens: { include: { token: true } } },
    });
    if (!choice) {
      return NextResponse.json(
        { error: `The choice with ID ${params.choiceId} was not found` },
        { status: 404 }
      );
    }
    const data = await fetchCoinGecko("/coins/markets", {
      vs_currency: "usd",
      ids: choice.choiceTokens.map((choiceToken) => choiceToken.token.id),
      price_change_percentage: ["1h", "24h", "7d", "30d"],
    });
    let changePercentage1h = 0;
    let changePercentage24h = 0;
    let changePercentage7d = 0;
    let changePercentage30d = 0;
    for (const choiceToken of choice.choiceTokens) {
      const coinData = data.find(
        (d: { id: string }) => d.id === choiceToken.token.id
      );
      if (!coinData) {
        throw Error("Internal server error");
      }
      changePercentage1h +=
        (coinData.price_change_percentage_1h_in_currency *
          choiceToken.proportion) /
        100;
      changePercentage24h +=
        (coinData.price_change_percentage_24h_in_currency *
          choiceToken.proportion) /
        100;
      changePercentage7d +=
        (coinData.price_change_percentage_7d_in_currency *
          choiceToken.proportion) /
        100;
      changePercentage30d +=
        (coinData.price_change_percentage_30d_in_currency *
          choiceToken.proportion) /
        100;
    }
    return NextResponse.json({
      changePercentage1h,
      changePercentage24h,
      changePercentage7d,
      changePercentage30d,
    });
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
