import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { choiceId: string } }
) {
  try {
    const choiceId = Number(params.choiceId);
    if (isNaN(choiceId)) {
      return NextResponse.json(
        { error: `The choice ID must be a number` },
        { status: 400 }
      );
    }
    const choice = await prisma.choice.findUnique({
      where: { id: choiceId },
      include: { choiceTokens: { include: { token: true } } },
    });
    return NextResponse.json(choice);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
