import JSONBig from "json-bigint";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId;
    const roundId = body.roundId;
    const isChecked = body.isChecked;
    if (!userId || !roundId) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const vote = await prisma.vote.update({
      where: { userId_roundId: { userId, roundId } },
      data: { isChecked },
    });
    return new Response(JSONBig.stringify(vote), {
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
