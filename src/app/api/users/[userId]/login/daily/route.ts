import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId;
    const bagel = body.bagel;
    const bonusDay = body.bonusDay;
    if (!userId || !bagel || !bonusDay) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const res = await prisma.$transaction(async (prisma) => {
      const login = await prisma.login.update({
        where: { userId },
        data: { bonusDay, lastBonusDate: new Date() },
      });
      const point = await prisma.point.update({
        where: { userId },
        data: { bagel: { increment: bagel } },
      });
      return { login, point };
    });
    return new Response(JSONBig.stringify(res), {
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
