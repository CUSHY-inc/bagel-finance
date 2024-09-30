import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();
    const round = await prisma.round.findFirst({
      where: { startDate: { lt: now }, endDate: { gt: now } },
      include: {
        choices: { include: { choiceTokens: { include: { token: true } } } },
      },
    });
    return NextResponse.json(round);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
