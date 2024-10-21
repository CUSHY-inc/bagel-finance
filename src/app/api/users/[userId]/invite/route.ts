import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Prisma } from "@prisma/client";

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    let invite = await prisma.invite.findUnique({
      where: { userId },
    });
    if (!invite) {
      let unique = false;
      while (!unique) {
        const nanoId = nanoid(8);
        try {
          invite = await prisma.invite.create({
            data: { userId, inviteCode: nanoId },
          });
          unique = true;
        } catch (e) {
          if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === "P2002"
          ) {
            throw e;
          }
        }
      }
    }
    return NextResponse.json(invite);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
