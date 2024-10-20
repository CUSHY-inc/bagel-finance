import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { packId: string } }
) {
  try {
    const pack = await prisma.pack.findUnique({
      where: { id: params.packId },
    });
    if (!pack) {
      return NextResponse.json(
        { error: `The pack with ID ${params.packId} was not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(pack);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
