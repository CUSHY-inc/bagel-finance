import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { roundId: string } }
) {
  try {
    const round = await prisma.round.findUnique({
      where: { id: params.roundId },
      include: {
        choices: { include: { choiceTokens: { include: { token: true } } } },
      },
    });
    return NextResponse.json(round);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { roundId: string } }
) {
  try {
    await prisma.round.delete({ where: { id: params.roundId } });
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(e, { status: 500 });
  }
}
