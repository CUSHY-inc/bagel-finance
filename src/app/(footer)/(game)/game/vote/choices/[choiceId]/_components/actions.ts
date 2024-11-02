"use server";

import { prisma } from "@/lib/prisma";

export async function bet({
  userId,
  roundId,
  choiceId,
  bet,
}: {
  userId: string;
  roundId: string;
  choiceId: string;
  bet: number;
}) {
  const point = await prisma.point.findUnique({ where: { userId } });
  if (!point?.bagel || point.bagel < BigInt(bet)) {
    throw new Error("Invalid bet amount");
  }
  const res = await prisma.$transaction(async (prisma) => {
    const vote = await prisma.vote.create({
      data: { userId, roundId, choiceId, bet: BigInt(bet) },
    });
    const updatedPoint = await prisma.point.update({
      where: { userId },
      data: { bagel: point.bagel - BigInt(bet) },
    });
    return { vote, point: updatedPoint };
  });
  return res;
}
