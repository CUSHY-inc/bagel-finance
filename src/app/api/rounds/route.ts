import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeChoices = searchParams.get("includeChoices") === "true";
    const ltDate = searchParams.get("ltDate");
    const userId = searchParams.get("userId");
    const rounds = await prisma.round.findMany({
      where: { endDate: { lt: ltDate ? new Date(ltDate) : undefined } },
      orderBy: { startDate: "desc" },
      include: {
        votes: { where: { userId: userId ?? undefined } },
        choices: includeChoices,
      },
    });
    return new Response(JSONBig.stringify(rounds), {
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
