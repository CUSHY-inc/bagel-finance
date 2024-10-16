"use server";

import { prisma } from "@/lib/prisma";
import { postTelegramApi } from "@/lib/telegramApi";
import { User } from "@telegram-apps/sdk-react";

export async function initUser(tgUser: User) {
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
  return res;
}

export async function sendFirstMessage(userId: string) {
  await postTelegramApi("/sendPhoto", {
    chat_id: userId,
    photo:
      "https://bagel-finance.s3.ap-northeast-1.amazonaws.com/images/icons/bagel-finance-welcome-message.png",
    caption:
      "🥯 Pick your choice, earn $BAGEL, and get airdrop rewards!\n😸 Your cat will love having more $BAGEL.\n🎁 Play now to get airdrop rewards!",
    reply_markup:
      '{"inline_keyboard":[[{"text":"Play for Airdrop 🥯","url":"https://t.me/bagel_fi_bot/app"}]]}',
  });
  await prisma.login.update({
    where: { userId },
    data: { sentWelcomeMsg: true },
  });
}
