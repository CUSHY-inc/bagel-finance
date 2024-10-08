import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchCoinGecko } from "@/lib/coinGecko";

type CreateRound = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  choices: {
    idx: number;
    title: string;
    description: string;
    image: string;
    choiceTokens: { tokenId: string; proportion: number }[];
  }[];
};

export async function POST(req: NextRequest) {
  try {
    const body: CreateRound = await req.json();
    const roundId = body.id;
    const roundTitle = body.title;
    const startDate = body.startDate;
    const endDate = body.endDate;
    const choices = body.choices;
    const res = await prisma.round.create({
      data: {
        id: roundId,
        title: roundTitle,
        startDate,
        endDate,
        choices: {
          create: await Promise.all(
            choices.map(async (choice) => {
              const choiceTokens = await Promise.all(
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
                      update: {},
                      create: {
                        id: choiceToken.tokenId,
                        name: data.name,
                        symbol: data.symbol,
                        webSlug: data.web_slug,
                        image: data.image.thumb,
                      },
                    });
                  }
                  return {
                    tokenId: choiceToken.tokenId,
                    proportion: choiceToken.proportion,
                  };
                })
              );
    
              return {
                id: `${roundId}-${choice.idx}`,
                idx: choice.idx,
                title: choice.title,
                description: choice.description,
                image: choice.image,
                choiceTokens: {
                  create: choiceTokens,
                },
              };
            })
          ),
        },
      },
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
