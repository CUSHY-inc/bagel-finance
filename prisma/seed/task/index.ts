import { prisma } from "..";

export const task = () => {
  const promise = prisma.task.createMany({
    data: [
      {
        id: 1,
        title: "Join Bagel Finance Channel",
        bagel: 2000,
        url: "https://t.me/bagel_finance",
      },
      {
        id: 2,
        title: "Follow Bagel Finance on X",
        bagel: 2000,
        url: "https://x.com/bagel_fi_ton",
      },
    ],
  });
  return promise;
};
