import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchCoinGecko } from "@/lib/coinGeckoApi";

type CreateNextRound = {
  title: string;
  durationMs: number;
  choices: {
    title: string;
    description: string;
    image: string;
    choiceTokens: { tokenId: string; proportion: number }[];
  }[];
};

export async function POST(req: NextRequest) {
  try {
    const body: CreateNextRound = await req.json();
    const lastRound = await prisma.round.findMany({
      orderBy: { startDate: "desc" },
      take: 2,
    });
    if (!lastRound[0]) {
      return NextResponse.json(
        { error: "Insert first round manually." },
        { status: 500 }
      );
    }
    if (new Date(lastRound[1].startDate) > new Date()) {
      return NextResponse.json({});
    }
    const startDate = new Date(lastRound[0].endDate);
    const endDate = new Date(startDate.getTime() + body.durationMs);
    const res = await prisma.$transaction(async (prisma) => {
      const round = await prisma.round.create({
        data: {
          title: body.title,
          startDate,
          endDate,
        },
      });
      await Promise.all(
        body.choices.map(async (choice, idx) => {
          const newChoice = await prisma.choice.create({
            data: {
              roundId: round.id,
              idx: idx + 1,
              title: choice.title,
              description: choice.description,
              image: choice.image,
            },
          });
          await Promise.all(
            choice.choiceTokens.map(async (choiceToken) => {
              let token = await prisma.token.findUnique({
                where: { id: choiceToken.tokenId },
              });
              if (!token) {
                const data = await fetchCoinGecko(
                  `/coins/${choiceToken.tokenId}`,
                  {
                    localization: false,
                    tickers: false,
                    market_data: false,
                    community_data: false,
                    developer_data: false,
                  }
                );
                token = await prisma.token.upsert({
                  where: { id: choiceToken.tokenId },
                  update: {
                    name: data.name,
                    symbol: data.symbol,
                    webSlug: data.web_slug,
                    image: data.image.thumb,
                  },
                  create: {
                    id: choiceToken.tokenId,
                    name: data.name,
                    symbol: data.symbol,
                    webSlug: data.web_slug,
                    image: data.image.thumb,
                  },
                });
              }
              await prisma.choiceToken.create({
                data: {
                  choiceId: newChoice.id,
                  tokenId: choiceToken.tokenId,
                  proportion: choiceToken.proportion,
                },
              });
            })
          );
        })
      );
      return round;
    });
    return NextResponse.json(res);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
