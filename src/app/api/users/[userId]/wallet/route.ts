import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId;
    const address = body.address;
    const humanReadable = body.humanReadable;
    if (!userId || !address || !humanReadable) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const wallet = await prisma.wallet.upsert({
      where: { userId },
      update: { address, humanReadable },
      create: { userId, address, humanReadable },
    });
    return NextResponse.json(wallet);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
