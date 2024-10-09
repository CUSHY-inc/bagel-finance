import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { choiceId: string } }
) {
  try {
    const choice = await prisma.choice.findUnique({
      where: { id: params.choiceId },
      include: { choiceTokens: { include: { token: true } }, round: true },
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
