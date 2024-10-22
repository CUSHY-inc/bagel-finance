import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const count = await prisma.fren.count({ where: { userId } });
    const frens = await prisma.fren.findMany({
      where: { userId },
      include: { fren: true },
    });
    return new Response(JSONBig.stringify({ count, frens }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
