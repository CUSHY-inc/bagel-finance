"use server";

import { COIN, prisma } from "@/lib/prisma";
import { postTelegramApi } from "@/lib/telegramApi";

export async function getExchangeLink({
  userId,
  stars,
  coin,
  amount,
  toAddress,
}: {
  userId: string;
  stars: number;
  coin: COIN;
  amount: number;
  toAddress: string;
}) {
  const exchange = await prisma.exchange.create({
    data: { userId, stars, coin, amount, toAddress },
  });
  const data = await postTelegramApi("/createInvoiceLink", {
    title: `${amount} ${coin}`,
    description: `Exchange Telegram Stars to ${coin}`,
    payload: exchange.id,
    provider_token: "",
    currency: "XTR",
    prices: JSON.stringify([{ label: `${amount} ${coin}`, amount: stars }]),
  });
  return data.result;
}
