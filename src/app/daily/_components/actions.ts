"use server";

import { prisma } from "@/lib/prisma";

export async function dailyLogin({
  userId,
  bagel,
  bonusDay,
}: {
  userId: string;
  bagel: number;
  bonusDay: number;
}) {
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
  return res;
}
