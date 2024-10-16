"use server";

import { prisma } from "@/lib/prisma";

export async function upsertWallet({
  userId,
  address,
}: {
  userId: string;
  address: string;
}) {
  const wallet = await prisma.wallet.upsert({
    where: { userId },
    update: { address },
    create: { userId, address },
  });
  return wallet;
}
