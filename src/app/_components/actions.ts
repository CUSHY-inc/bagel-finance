"use server";

import { prisma } from "@/lib/prisma";
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
