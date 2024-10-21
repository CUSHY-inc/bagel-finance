"use server";

import { prisma } from "@/lib/prisma";
import { postTelegramApi } from "@/lib/telegramApi";
import { BagelPack } from "../page";

export async function getInvoiceLink({
  userId,
  pack,
  quantity,
}: {
  userId: string;
  pack: BagelPack;
  quantity: number;
}) {
  const invoice = await prisma.invoice.create({
    data: { userId, packId: pack.id, quantity: quantity },
  });
  const data = await postTelegramApi("/createInvoiceLink", {
    title: `${quantity} ${pack.title}`,
    description: pack.description,
    payload: invoice.id,
    provider_token: "",
    currency: "XTR",
    prices: JSON.stringify([
      { label: `${quantity} ${pack.title}`, amount: pack.stars * quantity },
    ]),
  });
  return data.result;
}
