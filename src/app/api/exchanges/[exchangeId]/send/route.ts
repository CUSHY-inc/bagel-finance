import { transferToken } from "@/app/api/telegram/webhook/transferToken";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _: NextRequest,
  { params }: { params: { exchangeId: string } }
) {
  try {
    let exchange = await prisma.exchange.findFirst({
      where: { id: params.exchangeId, status: "PAID" },
    });
    if (exchange) {
      exchange = await transferToken(exchange);
    }
    return NextResponse.json(exchange);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(e, { status: 500 });
  }
}
