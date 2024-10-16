"use server";

import { prisma } from "@/lib/prisma";

export async function checkResult({
  userId,
  roundId,
  isChecked,
}: {
  userId: string;
  roundId: string;
  isChecked: boolean;
}) {
  const vote = await prisma.vote.update({
    where: { userId_roundId: { userId, roundId } },
    data: { isChecked },
  });
  return vote;
}
