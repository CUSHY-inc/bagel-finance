import { prisma } from "@/lib/prisma";
import { User } from "@telegram-apps/sdk-react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return NextResponse.json(user);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const tgUser: User = await request.json();
    const user = await prisma.$transaction(async (prisma) => {
      return await prisma.user.upsert({
        where: { id: tgUser.id.toString() },
        update: {
          username: tgUser.username,
          firstName: tgUser.firstName,
          lastName: tgUser.lastName,
          photoUrl: tgUser.photoUrl,
          languageCode: tgUser.languageCode,
          isPremium: tgUser.isPremium,
          isBot: tgUser.isBot,
          allowsWriteToPm: tgUser.allowsWriteToPm,
        },
        create: {
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
    });
    return NextResponse.json(user);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
