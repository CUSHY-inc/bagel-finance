"use server";

import { prisma } from "@/lib/prisma";

export async function firstLogin({
  userId,
  bagel,
}: {
  userId: string;
  bagel: number;
}) {
  const res = await prisma.$transaction(async (prisma) => {
    const login = await prisma.login.update({
      where: { userId },
      data: { bonusDay: 1 },
    });
    const point = await prisma.point.update({
      where: { userId },
      data: { bagel },
    });
    return { login, point };
  });
  return res;
}
