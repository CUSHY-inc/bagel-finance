import JSONBig from "json-bigint";
import { prisma } from "@/lib/prisma";
import { User } from "@telegram-apps/sdk-react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const tgUser: User = await request.json();
    const res = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          id: tgUser.id.toString(),
          username: tgUser.username,
          firstName: tgUser.firstName,
          lastName: tgUser.lastName,
          photoUrl: tgUser.photoUrl,
          languageCode: tgUser.languageCode,
          isPremium: tgUser.isPremium,
          isBot: tgUser.isBot,
          allowsWriteToPm: tgUser.allowsWriteToPm,
        },
      });
      const login = await prisma.login.create({
        data: { userId: tgUser.id.toString() },
      });
      const point = await prisma.point.create({
        data: { userId: tgUser.id.toString() },
      });
      return { user, login, point };
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
