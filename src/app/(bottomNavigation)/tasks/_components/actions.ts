"use server";

import { prisma } from "@/lib/prisma";
import { UserTask } from "@prisma/client";

export async function completeTask(userTask: UserTask) {
  await prisma.userTask.update({
    where: { id: userTask.id },
    data: { status: "COMPLETED" },
  });
}

export async function claimTask(userTask: UserTask, bagel: number) {
  await prisma.point.update({
    where: { userId: userTask.userId },
    data: { bagel: { increment: bagel } },
  });
  await prisma.userTask.update({
    where: { id: userTask.id },
    data: { status: "CLAIMED" },
  });
}
