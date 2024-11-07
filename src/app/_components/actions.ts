"use server";

import { prisma } from "@/lib/prisma";
import { postTelegramApi } from "@/lib/telegramApi";
import { User } from "@telegram-apps/sdk-react";

export async function initUser(tgUser: User, inviteCode?: string) {
  await prisma.$transaction(async (prisma) => {
    await prisma.user.create({
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
    await prisma.login.create({
      data: { userId: tgUser.id.toString() },
    });
    await prisma.point.create({
      data: { userId: tgUser.id.toString() },
    });
    if (inviteCode) {
      const invitePoint = tgUser.isPremium ? 20000 : 2000;
      const invite = await prisma.invite.findFirst({
        where: { inviteCode },
      });
      if (!invite) {
        return;
      }
      await prisma.fren.create({
        data: {
          userId: invite.userId,
          frenId: tgUser.id.toString(),
          bagel: invitePoint,
        },
      });
      await prisma.point.update({
        where: { userId: invite.userId },
        data: { bagel: { increment: invitePoint } },
      });
    }
  });
}

export async function updateUser(tgUser: User) {
  const user = await prisma.user.update({
    where: { id: tgUser.id.toString() },
    data: {
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
  return user;
}

export async function sendFirstMessage(userId: string) {
  await postTelegramApi("/sendPhoto", {
    chat_id: userId,
    photo:
      "https://bagel-finance.s3.ap-northeast-1.amazonaws.com/images/icons/bagel-finance-welcome-message.png",
    caption:
      "🥯 Pick your choice, earn $BAGEL, and get airdrop rewards!\n😸 Your cat will love having more $BAGEL.\n🎁 Play now to get airdrop rewards!",
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "🥯 Game",
            web_app: { url: `${process.env.WEB_URL}/` },
          },
          {
            text: "⭐️ Exchange",
            web_app: { url: `${process.env.WEB_URL}/exchange` },
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
      is_persistent: true,
    }),
  });
  await prisma.login.update({
    where: { userId },
    data: { sentWelcomeMsg: true },
  });
}
