import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const exchanges = await prisma.exchange.findMany({
      where: { userId, status: { not: "DRAFT" } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(exchanges);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(e, { status: 500 });
  }
}
